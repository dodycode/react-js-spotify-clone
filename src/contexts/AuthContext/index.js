import React, {useState} from 'react';

import {post} from '../../adapters/xhr';

import config from '../../config';

const AuthContext = React.createContext(null);

export default function AuthProvider({children}){
    // global state
    const [token, setToken] = useState(sessionStorage.getItem('spotify-oauth-token') || null);

    // actions
    let getTokenAPI = async (code, callback) => {
        let isLoading = true;

        //make sure this API not run twice
        if(!token){
            await post({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${Buffer.from(config?.api?.clientId + ':' +config?.api?.clientSecret).toString('base64')}`
                },
                url: config?.api?.authUrl,
                data: `grant_type=authorization_code&code=${code}&redirect_uri=${window.location.protocol}//${window.location.host}/callback/`
            }).then(res => {
                if(res?.data?.access_token){
                    setToken(res.data.access_token);
                }
            }).catch((err) => {
                throw err;
            });
        }

        //and then we store to session storage too
        sessionStorage.setItem('spotify-oauth-token', token);
        isLoading = false;

        if(!isLoading){
            callback(); //run callback after set token
        }
    }

    const contextValue = {token, getTokenAPI};

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
    return React.useContext(AuthContext);
}