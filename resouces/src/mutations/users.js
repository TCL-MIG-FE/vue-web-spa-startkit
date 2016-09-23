import {USERS_LIST, USER_PASSWORD_UPDATED} from "../constants/api";

const state = {
    usersList: {
        items: [],
        pageSize: 10,
        pageNo: 1,
        totalCount: 0
    },
};
const mutations = {
    
    [USERS_LIST](state, {payload}){
        state.usersList = payload || 'anonymous';
    },
    
    [USER_PASSWORD_UPDATED](state){
    },
    
};

export default{
    state,
    mutations
}
