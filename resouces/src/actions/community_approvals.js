import {
    COMMUNITY_APPROVAL_LIST,
    COMMUNITY_APPROVAL_ACCEPTED,
    COMMUNITY_APPROVAL_REJECTED,
    COMMUNITY_ARTICLE_VIEW,
    COMMUNITY_ARTICLE_CATEGORY,
    COMMUNITY_ARTICLE_CATEGORY_APPLIED,
} from "../constants/api";
import Api, {createAction} from "../utils/api";

const metaCreator = ({processId}) =>({processId});

export default {
    
    getCommunityApprovalList: createAction(COMMUNITY_APPROVAL_LIST, Api.getCommunityApprovalList),
    
    acceptCommunityApproval: createAction(COMMUNITY_APPROVAL_ACCEPTED, Api.acceptCommunityApproval, metaCreator),
    
    rejectCommunityApproval: createAction(COMMUNITY_APPROVAL_REJECTED, Api.rejectCommunityApproval, metaCreator),
    
    getCommunityArticle: createAction(COMMUNITY_ARTICLE_VIEW, Api.getCommunityArticle),
    
    getCommunityArticleCategory: createAction(COMMUNITY_ARTICLE_CATEGORY, Api.getCommunityArticleCategory),
    
    applyCategoryToArticle: createAction(COMMUNITY_ARTICLE_CATEGORY_APPLIED,Api.applyCategoryToCommunityArticle)
    
}
