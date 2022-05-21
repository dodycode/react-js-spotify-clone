import React, {useState} from 'react';

import { getAuthToken as getTokenAPIAdapter } from '../../adapters/getAuthToken';

const AuthContext = React.createContext(null);

export default function AuthProvider({children}){
    const [token, setToken] = useState(sessionStorage.getItem('spotify-oauth-token') || null);

    let getTokenAPI = async (callback) => {
        return getTokenAPIAdapter().then(res => {
            if(res?.data?.access_token){
                setToken(res.data.access_token);
                sessionStorage.setItem('spotify-oauth-token', token);
                callback(); //run callback after set token
            }
        });
    }

    let contextValue = {token, getTokenAPI};

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
    return React.useContext(AuthContext);
}