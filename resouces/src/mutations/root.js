import {SHOW_PAGE_LOADING, HIDE_PAGE_LOADING, GET_CURRENT_USER} from "../constants/actions";

const state = {
    pageLoading: false,
    currentUser: 'anonymous'
    
};
const mutations = {
    
    [SHOW_PAGE_LOADING](state){
        state.pageLoading = true;
    },
    
    [HIDE_PAGE_LOADING](state){
        state.pageLoading = false;
    },
    
    [GET_CURRENT_USER](state){
        var user = window.config && window.config.currentUser;
        user && ( state.currentUser = user);
    }
    
};

export default{
    state,
    mutations
}
