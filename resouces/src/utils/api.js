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
            'Content-Type': jsonType ? 'application/json' : 'application/x-www-form-urlencoded'
        },
        method: method,
        credentials: 'include'
    };
    if (method !== METHODS.GET && !isEmpty(params)) {
        options.body = jsonType ? JSON.stringify(params) : qs.stringify(params)
    } else if (method === METHODS.GET && !isEmpty(params)) {
        url += ('?' + qs.stringify(params));
    }
    return fetch(url, options).then(checkRespStatus);
};

const post = (url, params) => request(url, params, METHODS.POST, true);

// check resp status
const checkRespStatus = (respPromise) => {
    if (respPromise.status !== 200) {
        return Promise.reject('Server error occurred');
    }
    return respPromise.json().then(resp => {
        return new Promise((resolve, reject) => {
            if (resp && resp.code == API.CODE_SUCCESS) {
                resolve(resp.data);
            } else if (typeof(resp) === 'string' && resp.indexOf('InvalidSession') > -1) {
                window.location.reload();
            } else {
                resp.msg && Message({message: resp.msg, type: 'warning', showClose:true});
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
                commit(type, Object.assign(action, {payload: result}))
            }).catch(error => {
                commit(type, Object.assign(action, {error: true, msg: error.msg}));
            });
        }
        
        return commit(type, Object.assign(action, {payload}));
    };
};


export default {
    
    // 获取所用的任务列表
    getTasks: params => request(API.TASK_LIST, params),
    
    publishTasks: params => post(API.TASKS_PUBLISH, params),
    
    unPublishTasks: params => post(API.TASKS_UNPUBLISH, params),
    
    
    // 获取所有的翻译内容审核列表
    getApprovalList: params => request(API.APPROVAL_List, params),
    
    acceptApproval: params => post(API.APPROVAL_ACCEPTED, params),
    
    rejectApproval: params => post(API.APPROVAL_REJECTED, params),
    
    // 获取翻译的详情
    getTranslatedArticle: processId => request(API.ARTICLE_VIEW, {processId}),
    
    
    getUsers: params => request(API.USERS_LIST, params),
    
    updateUserPwd: params =>post(API.USER_PASSWORD_UPDATED, params)
};

