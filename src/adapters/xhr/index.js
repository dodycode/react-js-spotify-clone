import axios from "axios";

function AxiosInstance(params) {
    return axios.create({
        baseURL: params?.baseUrl,
        headers: params?.headers
    });
}

export async function get(params) {
    const axios = AxiosInstance(params);

    return await axios.get(params?.url);
}

export async function post(params) {
    const axios = AxiosInstance(params);

    return await axios.post(params?.url, params?.data);
}

export async function put(params) {
    const axios = AxiosInstance(params);

    return await axios.put(params?.url, params?.data);
}