import {$authHost} from "./index";

export const fetchEducations = async () => {
    const { data } = await $authHost.get(`api/education/`);
    return data;
}