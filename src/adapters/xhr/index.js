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

export function get(url) {
    const axios = returnAxiosInstance();

    return axios.get(url);
}

export function post(url, requestData) {
    const axios = returnAxiosInstance();

    return axios.post(url, requestData);
}

export function postAuth() {
    const axios = returnAxiosInstance(true);

    return axios.post(config.api.authUrl, 'grant_type=client_credentials');
}