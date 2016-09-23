import {USERS_LIST, USER_PASSWORD_UPDATED} from "../constants/api";
import Api, {createAction} from "../utils/api";
export default {
    
    getUsers: createAction(USERS_LIST, Api.getUsers),
    
    updateUserPwd:createAction(USER_PASSWORD_UPDATED, Api.updateUserPwd),
    
    
}
