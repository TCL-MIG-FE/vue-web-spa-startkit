import {TASK_LIST, TASKS_PUBLISH} from "../constants/api";
import Api, {createAction} from "../utils/api";

const metaCreator = ({processIds}) =>({taskIds: processIds.split(',')});

export default {
    
    getTasks: createAction(TASK_LIST, Api.getTasks),
    
    publishTasks: createAction(TASKS_PUBLISH, Api.publishTasks, metaCreator),
    
    unPublishTasks: createAction(TASKS_PUBLISH, Api.unPublishTasks, metaCreator),
    
}
