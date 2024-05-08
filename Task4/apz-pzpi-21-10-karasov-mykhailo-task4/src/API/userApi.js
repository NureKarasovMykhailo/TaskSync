import {$authHost} from "./index";

export const updateProfile = async (formData) => {
    const { data } = await $authHost.patch('api/public-user/', formData);

    return data;
}

export const subscribeRequest = async () => {
    const { data } = await $authHost.post('api/public-user/subscribe');

    return data;
}

export const fetchUserByToken = async () => {
    const { data } = await $authHost.get(`api/public-user/`);

    return data;
}

export const addUserEducation = async (formData) => {
    const { data } = await $authHost.put(`api/public-user/add-education`, formData);
    return data;
}

export const deleteUserEducation = async (formData) => {
    const { data } = await $authHost.put(`api/public-user/delete-education`, formData);
    return data;
}