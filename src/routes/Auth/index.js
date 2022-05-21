import React, {useEffect} from 'react';

import {useNavigate, useSearchParams} from "react-router-dom";

import { useAuthContext } from '../../contexts/AuthContext'

export default function Auth() {
    let navigate = useNavigate();
    let authContext = useAuthContext();
    const [searchParams] = useSearchParams();
    
    useEffect(() => {
        if(searchParams.get('code')){
            authContext?.getTokenAPI(
                searchParams.get('code'), 
                () => {
                    navigate('/', {replace: true});
                }
            ).catch(err => {
                console.error(err);
                window.alert("Authentication failed, please check your client id and secret again!")
            });
        }
    }, [authContext, searchParams, navigate]);

    return (
        <></>
    )
}