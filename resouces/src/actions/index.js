import rootActions from "./root";
import tasksActions from "./tasks";
import approvalsActions from "./approvals";
import usersActions from "./users";

export default {
    ...rootActions,
    ...tasksActions,
    ...approvalsActions,
    ...usersActions
}
