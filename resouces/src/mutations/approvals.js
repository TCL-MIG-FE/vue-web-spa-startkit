import * as C from "../constants/api";

const state = {
    approvalsList: {
        items: [],
        pageSize: 10,
        pageNo: 1,
        totalCount: 0
    },

    translatedArticle: {}
};
const mutations = {

    [C.APPROVAL_LIST](state, {payload}){
        state.approvalsList = payload;
    },

    [C.APPROVAL_ACCEPTED](state, {meta:{processId}}){
        const items = state.approvalsList.items;
        state.approvalsList.items = items.filter(item => item.processId !== processId);
    },

    [C.APPROVAL_REJECTED](state, {meta:{processId}}){
        const items = state.approvalsList.items;
        state.approvalsList.items = items.filter(item => item.processId !== processId);
    },


    [C.ARTICLE_VIEW](state, {payload}){
        state.translatedArticle = payload || {} ;
    },

};

export default{
    state,
    mutations
}
