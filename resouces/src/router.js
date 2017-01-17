import Vue from "vue"
import VueRouter from "vue-router"
import Tasks from "./containers/Tasks"
import TranslatorApproval from "./containers/TranslatorApproval"
import CommunityApproval from "./containers/CommunityApproval"
import Users from "./containers/Users"
import Settings from "./containers/Settings"
Vue.use(VueRouter);

const Router = new VueRouter({
    routes: [
        {path: '/', redirect: '/tasks'},
        {path: '/tasks', component: Tasks},
        {path: '/translator/approval', component: TranslatorApproval},
        {path: '/community/approval', component: CommunityApproval},
        {path: '/userManager', component: Users},
        {path: '/settings', component: Settings},
    ]
});


export default Router;


