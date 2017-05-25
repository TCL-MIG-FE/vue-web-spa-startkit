import * as C from "../constants/api";
import Api, {createAction} from "../utils/api";

const metaCreator = ({processIds, reserveRecord}) =>({processIds: processIds.split(','), reserveRecord});

export default {

    getTasks: createAction(C.TASK_LIST, Api.getTasks),

    publishTasks: createAction(C.TASKS_PUBLISH, Api.publishTasks, metaCreator),

    unPublishTasks: createAction(C.TASKS_UNPUBLISHED, Api.unPublishTasks, metaCreator),

}
