import {$authHost} from "./index";

export const createCompany = async (formData) => {
    const { data } = await $authHost.post(`api/public-company`, formData);
    return data;
}