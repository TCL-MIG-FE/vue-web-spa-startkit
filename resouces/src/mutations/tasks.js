import {TASK_LIST, TASKS_PUBLISH, TASKS_UNPUBLISH} from "../constants/api";

const state = {
    tasksList: {
        items: [],
        pageSize: 10,
        pageNo: 1,
        totalCount: 0
    }
};
const mutations = {
    
    [TASK_LIST](state, {payload}){
        state.tasksList = payload;
        state.tasksList.pageNo = payload.pageNo;
    },
    
    [TASKS_PUBLISH](state, action){
        const taskIds = action.meta.taskIds;
        const items = state.tasksList.items;
        state.tasksList.items = items.filter(item => {
            return !taskIds.some(taskId => taskId == item.processId);
        })
    },
    
    [TASKS_UNPUBLISH](state, action){
        debugger;
        const taskIds = action.meta.taskIds;
        const items = state.tasksList.items;
        state.tasksList.items = items.filter(item => {
            return !taskIds.some(taskId => taskId == item.processId);
        })
    }
};

export default{
    state,
    mutations
}
