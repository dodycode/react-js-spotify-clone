import axios from "axios";

import config from "../../config";

function AxiosInstance(token = null, isAuth = false) {
    if(!isAuth && token){
        return axios.create({
            baseURL: config?.api?.baseUrl,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    }else{
        // dont use base url for auth
        return axios.create({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(config?.api?.clientId + ':' +config?.api?.clientSecret).toString('base64')}`
            }
        });
    }
}

export async function get(params) {
    const axios = AxiosInstance(params?.token);

    return await axios.get(params?.url);
}

export async function post(params) {
    const axios = AxiosInstance(params?.token);

    return await axios.post(params?.url, params?.data);
}

export async function postAuth(code) {
    let isAuth = true;
    const axios = AxiosInstance(null, isAuth);

    return await axios.post(config?.api?.authUrl, `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/callback/`);
}