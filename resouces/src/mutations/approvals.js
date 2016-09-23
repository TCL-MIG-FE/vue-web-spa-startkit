import {APPROVAL_List, APPROVAL_ACCEPTED, APPROVAL_REJECTED, ARTICLE_VIEW} from "../constants/api";

const state = {
    approvalsList: {
        items: [],
        pageSize: 10,
        pageNo: 1,
        totalCount: 0
    },
    
    translatedArticle: ''
};
const mutations = {
    
    [APPROVAL_List](state, {payload}){
        state.approvalsList = payload;
    },
    
    [APPROVAL_ACCEPTED](state, {meta:{processId}}){
        const items = state.approvalsList.items;
        state.approvalsList.items = items.filter(item => item.processId !== processId);
    },
    
    [APPROVAL_REJECTED](state, {meta:{processId}}){
        const items = state.approvalsList.items;
        state.approvalsList.items = items.filter(item => item.processId !== processId);
    },
    
    
    [ARTICLE_VIEW](state, {payload}){
        state.translatedArticle = payload;
    },
    
};

export default{
    state,
    mutations
}
