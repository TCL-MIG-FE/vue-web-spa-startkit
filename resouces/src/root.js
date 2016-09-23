
import Vue from "vue";
import store from "./store";
import router from "./router";
import {sync} from "vuex-router-sync";
import App from './App'

sync(store, router);

new Vue({
    el:'#root',
    store,
    router,
    render: h => h(App)
    
});

