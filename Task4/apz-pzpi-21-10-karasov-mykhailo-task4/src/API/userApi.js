import {$authHost} from "./index";

export const updateProfile = async (formData) => {
    const { data } = await $authHost.patch('api/public-user/', formData);

    return data;
}

export const subscribeRequest = async () => {
    const { data } = await $authHost.post('api/public-user/subscribe');

    return data;
}