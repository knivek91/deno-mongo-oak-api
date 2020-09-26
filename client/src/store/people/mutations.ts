import Vue from "vue";
import { MutationTree } from "vuex";

import { mutations } from "./constants";
import { IState, TPeople } from "./types";

const setPeopleList = (state: IState, characters: TPeople[]) => {
    Vue.set(state, "list", characters);
    if (state.currentPage < 10)
        Vue.set(state, "currentPage", state.currentPage + 1);
};

const setCurrentPerson = (state: IState, current: TPeople) => {
    Vue.set(state, "current", current);
};

const restartCurrentPage = (state: IState) => {
    Vue.set(state, "currentPage", 2);
};

const tree: MutationTree<IState> = {
    [mutations.SET_PEOPLE_LIST]: setPeopleList,
    [mutations.SET_CURRENT_PERSON]: setCurrentPerson,
    [mutations.RESTART_CURRENT_PAGE]: restartCurrentPage
};

export default tree;
