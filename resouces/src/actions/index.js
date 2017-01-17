import rootActions from "./root";
import tasksActions from "./tasks";
import approvalsActions from "./approvals";
import communityApprovalsActions from "./community_approvals";
import usersActions from "./users";

export default {
    ...rootActions,
    ...tasksActions,
    ...approvalsActions,
    ...communityApprovalsActions,
    ...usersActions
}
