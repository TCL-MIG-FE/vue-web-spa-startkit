import * as C from "../constants/api";
import Api, {createAction} from "../utils/api";

const metaCreator = ({processId}) =>({processId});

export default {

    getCommunityApprovalList: createAction(C.COMMUNITY_APPROVAL_LIST, Api.getCommunityApprovalList),

    acceptCommunityApproval: createAction(C.COMMUNITY_APPROVAL_ACCEPTED, Api.acceptCommunityApproval, metaCreator),

    rejectCommunityApproval: createAction(C.COMMUNITY_APPROVAL_REJECTED, Api.rejectCommunityApproval, metaCreator),

    getCommunityArticle: createAction(C.COMMUNITY_ARTICLE_VIEW, Api.getCommunityArticle),

    getCommunityArticleCategory: createAction(C.COMMUNITY_ARTICLE_CATEGORY, Api.getCommunityArticleCategory),

    applyCategoryToArticle: createAction(C.COMMUNITY_ARTICLE_CATEGORY_APPLIED,Api.applyCategoryToCommunityArticle)

}
