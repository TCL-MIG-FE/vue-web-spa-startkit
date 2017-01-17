import {
    COMMUNITY_APPROVAL_LIST,
    COMMUNITY_APPROVAL_ACCEPTED,
    COMMUNITY_APPROVAL_REJECTED,
    COMMUNITY_ARTICLE_VIEW,
    COMMUNITY_ARTICLE_CATEGORY,
    COMMUNITY_ARTICLE_CATEGORY_APPLIED,
} from "../constants/api";

const state = {
    approvalsList: {
        items: [],
        pageSize: 10,
        pageNo: 1,
        totalCount: 0
    },
    
    article: {},
    
    articleCategories:[],
};
const mutations = {
    
    [COMMUNITY_APPROVAL_LIST](state, {payload}){
        state.approvalsList = payload;
    },
    
    [COMMUNITY_APPROVAL_ACCEPTED](state, {meta:{processId}}){
        const items = state.approvalsList.items;
        state.approvalsList.items = items.filter(item => item.processId !== processId);
    },
    
    [COMMUNITY_APPROVAL_REJECTED](state, {meta:{processId}}){
        const items = state.approvalsList.items;
        state.approvalsList.items = items.filter(item => item.processId !== processId);
    },
    
    
    [COMMUNITY_ARTICLE_VIEW](state, {payload}){
        state.article = payload || {};
    },
    
    [COMMUNITY_ARTICLE_CATEGORY](state, {payload}){
        state.articleCategories = payload;
    },
    
    [COMMUNITY_ARTICLE_CATEGORY_APPLIED](state){
        // pass
    }
};

export default{
    state,
    mutations
}
