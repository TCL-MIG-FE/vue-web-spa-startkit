import * as C from "../constants/api";

const state = {
    tasksList: {
        items: [],
        pageSize: 10,
        pageNo: 1,
        totalCount: 0
    }
};
const mutations = {

    [C.TASK_LIST](state, {payload}){
        state.tasksList = payload;
        state.tasksList.pageNo = payload.pageNo;
    },

    [C.TASKS_PUBLISH](state, {meta:{processIds, reserveRecord}}){
        const items = state.tasksList.items;
        if( reserveRecord ){
            state.tasksList.items = items.map( item =>{
                processIds.forEach( processId =>{
                    processId == item.processId && ( item.status = C.PUBLISHED);
                });
                return item;
            })
        }else{
            state.tasksList.items = items.filter(item => {
                return !processIds.some(processId => processId == item.processId);
            })
        }

    },

    [C.TASKS_UNPUBLISHED](state, {meta:{processIds, reserveRecord}}){
        const items = state.tasksList.items;
        if( reserveRecord ){
            state.tasksList.items = items.map( item =>{
                processIds.forEach( processId =>{
                    processId == item.processId && ( item.status = C.UN_PUBLISHED);
                });
                return item;
            })
        }else{
            state.tasksList.items = items.filter(item => {
                return !processIds.some(processId => processId == item.processId);
            })
        }
    }
};

export default{
    state,
    mutations
}
