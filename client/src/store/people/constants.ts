import { curry } from "ramda";

import { createModuleConstant } from "../utils";

const appendName = curry(createModuleConstant)("PEOPLE_LIST");

export const mutations = {
    SET_PEOPLE_LIST: appendName("SET_PEOPLE_LIST"),
    SET_CURRENT_PAGE: appendName("SET_CURRENT_PAGE"),
    SET_CURRENT_PERSON: appendName("SET_CURRENT_PERSON"),
    RESTART_CURRENT_PAGE: appendName("RESTART_CURRENT_PAGE")
};

export const actions = {
    INIT_DATA: appendName("INIT_DATA"),
    INFINITE_HANDLER: appendName("INFINITE_HANDLER"),
    GET_PERSON_DETAIL: appendName("GET_PERSON_DETAIL"),
    RESTART_CURRENT_PAGE: appendName("RESTART_CURRENT_PAGE")
};
