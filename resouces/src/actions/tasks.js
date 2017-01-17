import {TASK_LIST, TASKS_PUBLISH, TASKS_UNPUBLISHED} from "../constants/api";
import Api, {createAction} from "../utils/api";

const metaCreator = ({processIds, reserveRecord}) =>({processIds: processIds.split(','), reserveRecord});

export default {
    
    getTasks: createAction(TASK_LIST, Api.getTasks),
    
    publishTasks: createAction(TASKS_PUBLISH, Api.publishTasks, metaCreator),
    
    unPublishTasks: createAction(TASKS_UNPUBLISHED, Api.unPublishTasks, metaCreator),
    
}
