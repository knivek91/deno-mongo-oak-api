import Vue from "vue";
import Vuelidate from "vuelidate";
import { Component } from "vue-property-decorator";
import InfiniteLoading from "vue-infinite-loading";

import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import App from "./App.vue";

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(InfiniteLoading, {});

// allow `validations` hook for `Vuelidate`
Component.registerHooks(["validations"]);

new Vue({
    router,
    store,
    //@ts-ignore
    vuetify,
    render: h => h(App)
}).$mount("#app");
