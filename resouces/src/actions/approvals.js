import * as C from "../constants/api";
import Api, {createAction} from "../utils/api";

const metaCreator = ({processId}) =>({processId});

export default {

    getApprovalList: createAction(C.APPROVAL_LIST, Api.getApprovalList),

    acceptApproval: createAction(C.APPROVAL_ACCEPTED, Api.acceptApproval, metaCreator),

    rejectApproval: createAction(C.APPROVAL_REJECTED, Api.rejectApproval, metaCreator),

    getTranslatedArticle: createAction(C.ARTICLE_VIEW, Api.getTranslatedArticle),


}
