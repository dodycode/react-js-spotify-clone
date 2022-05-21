import axios from "axios";

import config from "../../config";

function returnAxiosInstance(isAuth = false) {

    if(!isAuth){
        return axios.create({
            baseURL: config.api.baseUrl,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('spotify-oauth-token')}`
            }
        });
    }else{
        // dont use base url for auth
        return axios.create({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(config.api.clientId + ':' +config.api.clientSecret).toString('base64')}`
            }
        });
    }
}

export async function get(url) {
    const axios = returnAxiosInstance();

    return await axios.get(url);
}

export async function post(url, requestData) {
    const axios = returnAxiosInstance();

    return await axios.post(url, requestData);
}

export async function postAuth() {
    const axios = returnAxiosInstance(true);

    return await axios.post(config.api.authUrl, 'grant_type=client_credentials');
}