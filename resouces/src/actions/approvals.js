import {APPROVAL_LIST, APPROVAL_ACCEPTED, APPROVAL_REJECTED, ARTICLE_VIEW} from "../constants/api";
import Api, {createAction} from "../utils/api";

const metaCreator = ({processId}) =>({processId});

export default {
    
    getApprovalList: createAction(APPROVAL_LIST, Api.getApprovalList),
    
    acceptApproval: createAction(APPROVAL_ACCEPTED, Api.acceptApproval, metaCreator),
    
    rejectApproval: createAction(APPROVAL_REJECTED, Api.rejectApproval, metaCreator),
    
    getTranslatedArticle: createAction(ARTICLE_VIEW, Api.getTranslatedArticle),
    
    
}
