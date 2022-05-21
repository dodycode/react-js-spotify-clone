import React from 'react';

import {
  Navigate,
  useLocation,
  Routes as ReactRouterWrapper,
  Route,
} from "react-router-dom";

import credentials from '../config';
import AuthProvider, { useAuthContext } from '../contexts/AuthContext';

// pages
import Discover from './Discover';
import Auth from './Auth';
import CredentialsInvalid from './CredentialsInvalid';

function RequireAuth({children}) {
  let authContext = useAuthContext();
  let currLocation = useLocation();

  if(!credentials.api.clientId || !credentials.api.clientSecret){
    return <Navigate to="/credentials-invalid" replace/>
  }

  if(!authContext.token){
    return <Navigate to="/auto-login" state={{from: currLocation}} replace />
  }

  return children;
}

export default function Routes() {
  return (
    <AuthProvider>
      <ReactRouterWrapper>
        <Route path="/auto-login" element={<Auth />} />
        <Route path="/credentials-invalid" element={<CredentialsInvalid />} />
        <Route path="/" element={
          <RequireAuth>
            <Discover />
          </RequireAuth>
        }></Route>
      </ReactRouterWrapper>
    </AuthProvider>
  )
}
