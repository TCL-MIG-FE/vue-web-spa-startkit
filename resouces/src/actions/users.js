import * as C from "../constants/api";
import Api, {createAction} from "../utils/api";
export default {

    getUsers: createAction(C.USERS_LIST, Api.getUsers),

    updateUserPwd:createAction(C.USER_PASSWORD_UPDATED, Api.updateUserPwd),


}
