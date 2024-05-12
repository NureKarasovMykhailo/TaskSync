import {$authHost} from "./index";

export const fetchComplexities = async (limit, page) => {
    const { data } = await $authHost.get(`api/complexity`, {
        params: {
            limit,
            page
        }
    });
    return data;
}