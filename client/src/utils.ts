import { compose, head, isEmpty, isNil, prop, tail } from "ramda";

const keys = ["data", "results"];

export const sleep = async (ms: number) =>
    await new Promise(resolve => setTimeout(resolve, ms));

export const getValueOrDefault = (v: any, defa: any) =>
    isNil(v) || isEmpty(v) ? defa : v;

export const getLastFromArray = compose(head, tail);

export const getDeepValuesFromObject = () => null;

export const getAxiosResults: Function =
    //@ts-ignore
    compose(
        prop(getValueOrDefault(getLastFromArray(keys), "")),
        //@ts-ignore
        prop(getValueOrDefault(head(keys), ""))
    );

export const getAxiosResult: Function = compose(prop("data"));
