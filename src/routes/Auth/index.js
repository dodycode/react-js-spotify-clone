import React, {useState, useEffect} from 'react';

import { getAuthToken } from '../../adapters/getAuthToken';

export default function Auth() {
    const [token, setToken] = useState(sessionStorage.getItem('spotify-oauth-token') || '');

    useEffect(() => {
        let isMounted = true;
        if(!token){
            getAuthToken().then(res => {
            if(isMounted){
                if(res.data.access_token){
                    setToken(res.data.access_token);
                    sessionStorage.setItem('spotify-oauth-token', res.data.access_token);
                    window.location.reload();
                }
            }
            }).catch(err => {
                window.alert('Authentication failed. Please make sure credentials is valid');
                console.error(err);
            }); 
        }
    }, [token]);

    return (
        <>
        </>
    );
}