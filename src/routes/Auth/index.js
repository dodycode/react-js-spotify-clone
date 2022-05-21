import React, {useEffect} from 'react';

import {
    useNavigate,
    useLocation
  } from "react-router-dom";

import { useAuthContext } from '../../contexts/AuthContext'

export default function Auth() {
    let navigate = useNavigate();
    let location = useLocation();
    let authContext = useAuthContext();

    //get intended page that pass to state in router location
    let from = location.state?.from?.pathname || '/';

    useEffect(() => {
        //set callback to navigate to intended page after get token
        authContext.getTokenAPI(() => {
            navigate(from, {replace: true});
        });
    },[authContext, from, navigate]);

    return (
        <></>
    )
}