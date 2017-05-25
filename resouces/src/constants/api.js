if (__DEV__) {
	window.config && (window.config = {
		context: '/api',
        currentUser: 'larry.zhao'
	});
}

const getApi = (url) => `${window.config.context}/admin/${url}`;

export const CODE_SUCCESS = 200;

export const CODE_NOT_LOGIN = 401;

export const MAX_CONTENTS_LENGTH = 1000;

export const UN_PUBLISHED = 1;
export const PUBLISHED = 11;
export const HAVE_ACCEPTED = 12;

//翻译用户
export const TRANSLATED_USER_ROLE = 1;

// 社区用户
export const COMMUNITY_USER_ROLE = 2;



export const TASK_LIST = getApi('task/list');
export const TASKS_PUBLISH = getApi('task/publish');
export const TASKS_UNPUBLISHED = getApi('task/unpublish');

export const APPROVAL_LIST = getApi('approving/list');
export const APPROVAL_ACCEPTED = getApi('translate/pass');
export const APPROVAL_REJECTED = getApi('translate/unpass');
export const ARTICLE_VIEW = getApi('translate/view');


export const COMMUNITY_APPROVAL_LIST = getApi('community/list');
export const COMMUNITY_APPROVAL_ACCEPTED = getApi('community/pass');
export const COMMUNITY_APPROVAL_REJECTED = getApi('community/unpass');
export const COMMUNITY_ARTICLE_VIEW = getApi('community/view');
export const COMMUNITY_ARTICLE_CATEGORY = getApi('category/list');
export const COMMUNITY_ARTICLE_CATEGORY_APPLIED = getApi('community/category');

export const USERS_LIST = getApi('userLog/list');
export const USER_PASSWORD_UPDATED = getApi('user/updatePwd');






