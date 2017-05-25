import * as C from "../constants/api";

const state = {
    usersList: {
        items: [],
        pageSize: 10,
        pageNo: 1,
        totalCount: 0
    },
};
const mutations = {

    [C.USERS_LIST](state, {payload}){
        state.usersList = payload || 'anonymous';
    },

    [C.USER_PASSWORD_UPDATED](state){
    },

};

export default{
    state,
    mutations
}
