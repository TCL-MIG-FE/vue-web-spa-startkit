import * as C from "../constants/api";

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

    [C.COMMUNITY_APPROVAL_LIST](state, {payload}){
        state.approvalsList = payload;
    },

    [C.COMMUNITY_APPROVAL_ACCEPTED](state, {meta:{processId}}){
        const items = state.approvalsList.items;
        state.approvalsList.items = items.filter(item => item.processId !== processId);
    },

    [C.COMMUNITY_APPROVAL_REJECTED](state, {meta:{processId}}){
        const items = state.approvalsList.items;
        state.approvalsList.items = items.filter(item => item.processId !== processId);
    },


    [C.COMMUNITY_ARTICLE_VIEW](state, {payload}){
        state.article = payload || {};
    },

    [C.COMMUNITY_ARTICLE_CATEGORY](state, {payload}){
        state.articleCategories = payload;
    },

    [C.COMMUNITY_ARTICLE_CATEGORY_APPLIED](state){
        // pass
    }
};

export default{
    state,
    mutations
}
