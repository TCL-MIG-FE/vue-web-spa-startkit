import Vue from "vue"
import VueRouter from "vue-router"
import Tasks from "./containers/Tasks"
import Approval from "./containers/Approval"
import Users from "./containers/Users"
import Settings from "./containers/Settings"
Vue.use(VueRouter);

const Router = new VueRouter({
    routes: [
        {path: '/', redirect: '/tasks'},
        {path: '/tasks', component: Tasks},
        {path: '/approval', component: Approval},
        {path: '/userManager', component: Users},
        {path: '/settings', component: Settings},
    ]
});


export default Router;


