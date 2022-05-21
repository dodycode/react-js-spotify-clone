import React, {useState} from 'react';

import { getAuthToken as getTokenAPIAdapter } from '../../adapters/getAuthToken';

const AuthContext = React.createContext(null);

export default function AuthProvider({children}){
    const [token, setToken] = useState(sessionStorage.getItem('spotify-oauth-token') || null);

    let getTokenAPI = async (callback) => {
        let isLoading = true;

        //make sure this API not run twice
        if(!token){
            await getTokenAPIAdapter().then(res => {
                if(res?.data?.access_token){
                    setToken(res.data.access_token);
                }
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