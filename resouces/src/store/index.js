import Vue from "vue";
import Vuex from "vuex";
import actions from "../actions";
import mutations from "../mutations";

Vue.use(Vuex);

Vue.config.devtools = __DEV__;

Vue.config.errorHandler = function (err, vm) {
    
    vm.$store.dispatch("hidePageLoading");
    console.error(err.message);
    vm.$message(({message: '很抱歉，貌似出现错误了，请刷新页面重新尝试 :-)', type: 'error', showClose:true}));
};

export default new Vuex.Store({
    actions,
    mutations,
    modules: mutations,
    strict: !__DEV__,
})
