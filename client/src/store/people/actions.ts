import { ActionTree, ActionContext } from "vuex";
import { concat, flatten, head } from "ramda";
import Axios from "axios";

import { actions, mutations } from "./constants";
import { IState } from "./types";
import { getAxiosResult, getAxiosResults, getLastFromArray } from "@/utils";
import { peopleAPI } from "@/config/api";

const initData = async ({ commit, state }: ActionContext<IState, any>) => {
    const { currentPage } = state;
    const results = flatten(
        await Axios.all([
            Axios.get(peopleAPI),
            Axios.get(`${peopleAPI}?page=${currentPage}`)
        ])
    );
    const firstCall = head(results) || ({} as any);
    const secondCall = getLastFromArray(results) || ({} as any);
    commit(
        mutations.SET_PEOPLE_LIST,
        concat(getAxiosResults(firstCall), getAxiosResults(secondCall))
    );
};

const infiniteHandler = async (
    { commit, state }: ActionContext<IState, any>,
    $scroll: any
) => {
    const { currentPage, list } = state;
    if (currentPage === 10) {
        $scroll.complete();
        return;
    }
    const response = await Axios.get(`${peopleAPI}?page=${currentPage}`);
    commit(mutations.SET_PEOPLE_LIST, concat(list, getAxiosResults(response)));
    $scroll.loaded();
};

const getPersonDetail = async (
    { commit }: ActionContext<IState, any>,
    url: string
) => commit(mutations.SET_CURRENT_PERSON, getAxiosResult(await Axios.get(url)));

const restartCurrenPage = ({ commit }: ActionContext<IState, any>) => {
    commit(mutations.RESTART_CURRENT_PAGE);
};

//@ts-ignore
const tree: ActionTree<IState, any> = {
    [actions.INIT_DATA]: initData,
    [actions.INFINITE_HANDLER]: infiniteHandler,
    [actions.GET_PERSON_DETAIL]: getPersonDetail,
    [actions.RESTART_CURRENT_PAGE]: restartCurrenPage
};

export default tree;
