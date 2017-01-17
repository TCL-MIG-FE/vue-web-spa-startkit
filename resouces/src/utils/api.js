import "es6-promise";
import "whatwg-fetch";
import {Message} from "element-ui";
import qs from "querystring";
import isEmpty from "lodash.isempty";
import * as API from "../constants/api";

const METHODS = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
};

const request = (url, params, method = METHODS.GET, jsonType = false) => {
    var options = {
        headers: {
            'Content-Type': jsonType ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded',
            'Accept': 'text/javascript,*/*'
        },
        method: method,
        credentials: 'include'
    };
    if (method !== METHODS.GET && !isEmpty(params)) {
        options.body = jsonType ? JSON.stringify(params) : qs.stringify(params)
    } else if (method === METHODS.GET && !isEmpty(params)) {
        const newParams = ( ~url.lastIndexOf('?') ? '&' : '?' ) + qs.stringify(params);
        url += newParams;

    }
    return fetch(url, options).then(checkRespStatus);
};

const post = (url, params) => request(url, params, METHODS.POST, true);

// check resp status
const checkRespStatus = (respPromise) => {
    if (respPromise.status === 403) {
        // 后台session过期。passport会返回invalidSession，同时status为403
        window.location.reload();
        return;
    }
    return respPromise.json().then(resp => {
        return new Promise((resolve, reject) => {
            if (resp && resp.code == API.CODE_SUCCESS) {
                resolve(resp.data);
            } else if (resp && resp.code == API.CODE_NOT_LOGIN) {
                // 页面超时，重新刷新页面
                window.location.reload();
            } else {
                resp.msg && Message({message: resp.msg, type: 'warning', showClose: true});
                reject(resp);
            }
        });
    });
};


export const createAction = (type, payloadCreator, metaCreator) => {
    const identity = (...args) => args[0];
    const isFunc = (fn) => typeof(fn) === 'function';
    const isPromise = obj => typeof(obj) === 'object' && isFunc(obj.then);
    const finalPayloadCreator = isFunc(payloadCreator) ? payloadCreator : identity;
    
    return ({commit, dispatch}, ...args) => {
        const payload = finalPayloadCreator(...args);
        const action = {type, payload};
        
        if (isFunc(metaCreator)) {
            action.meta = metaCreator(...args);
        }
        
        if (isPromise(payload)) {
            return payload.then(result => {
                commit(type, Object.assign(action, {payload: result}));
                return result;
            }).catch(error => {
                commit(type, Object.assign(action, {error: true, msg: error.msg}));
                return error;
            });
        }
        
        return commit(type, Object.assign(action, {payload}));
    };
};


export default {
    
    // 获取所用的任务列表
    getTasks: params => request(API.TASK_LIST, params),
    
    publishTasks: params => post(API.TASKS_PUBLISH, params),
    
    unPublishTasks: params => post(API.TASKS_UNPUBLISHED, params),
    
    
    // 获取所有的翻译内容审核列表
    getApprovalList: params => request(API.APPROVAL_LIST, params),
    
    acceptApproval: params => post(API.APPROVAL_ACCEPTED, params),
    
    rejectApproval: params => post(API.APPROVAL_REJECTED, params),
    
    // 获取翻译的详情
    getTranslatedArticle: processId => request(API.ARTICLE_VIEW, {processId}),
    
    
    // 获取社区内容审核列表
    getCommunityApprovalList: params => request(API.COMMUNITY_APPROVAL_LIST, params),
    
    acceptCommunityApproval: params => post(API.COMMUNITY_APPROVAL_ACCEPTED, params),
    
    rejectCommunityApproval: params => post(API.COMMUNITY_APPROVAL_REJECTED, params),
    
    // 获取指定社区文章的详情
    getCommunityArticle: processId => request(API.COMMUNITY_ARTICLE_VIEW, {processId}),
    
    // 获取文章分类
    getCommunityArticleCategory: params => request(API.COMMUNITY_ARTICLE_CATEGORY, params),
    
    // 给文章设置分类
    applyCategoryToCommunityArticle: params => post(API.COMMUNITY_ARTICLE_CATEGORY_APPLIED, params),
    
    
    getUsers: params => request(API.USERS_LIST, params),
    
    updateUserPwd: params =>post(API.USER_PASSWORD_UPDATED, params)
};

