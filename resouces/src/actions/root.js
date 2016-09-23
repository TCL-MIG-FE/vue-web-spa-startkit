import {SHOW_PAGE_LOADING, HIDE_PAGE_LOADING, GET_CURRENT_USER} from "../constants/actions";
import {createAction} from "../utils/api";

export default {
    
    showPageLoading: createAction(SHOW_PAGE_LOADING),
    hidePageLoading: createAction(HIDE_PAGE_LOADING),
    getCurrentUser: createAction(GET_CURRENT_USER),
}




