import {$authHost} from "./index";

export const fetchActivity = async (
    limit = 8,
    page = 1
) => {
    const { data } = await $authHost.get(`api/activity`, {
        limit,
        page
    });

    return data;
}

export const createActivity = async (formData) => {
    const { data } = await $authHost.post(`api/activity`, formData);
    return data;
}