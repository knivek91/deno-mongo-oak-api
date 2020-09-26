import actions from "./actions";
import mutations from "./mutations";

export * from "./types";
export * from "./constants";
export const PeopleListModule = {
    state: {
        list: [],
        current: null,
        currentPage: 2
    },
    actions,
    mutations,
    getters: {}
};
