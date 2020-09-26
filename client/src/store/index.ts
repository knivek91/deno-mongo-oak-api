import Vue from "vue";
import Vuex from "vuex";

import { PeopleListModule } from "./people";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: { people: PeopleListModule }
});
