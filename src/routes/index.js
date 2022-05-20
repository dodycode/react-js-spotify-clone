import React, {useState,useEffect} from 'react';
import Discover from './Discover';
import Auth from './Auth';
import CredentialsInvalid from './CredentialsInvalid';

import credentials from '../config';

export default function Routes() {
  const [isLogin, setIsLogin] = useState(false);
  const token = sessionStorage.getItem('spotify-oauth-token') || null;

  useEffect(() => {
    if(token){
      setIsLogin(true);
    }
  }, [token]);

  if(!credentials.api.clientId || !credentials.api.clientSecret){
    return <CredentialsInvalid />
  }

  if(!isLogin){
    return <Auth />
  }

  // Here you'd return an array of routes
  return <Discover />;
}
