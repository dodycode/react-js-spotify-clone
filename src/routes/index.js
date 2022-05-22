import React from 'react';

import CoreLayout from '../common/layouts/CoreLayout';

import {
  Navigate,
  Routes as ReactRouterWrapper,
  Route,
} from "react-router-dom";

import credentials from '../config';
import AuthProvider, { useAuthContext } from '../contexts/AuthContext';

// pages
import Discover from './Discover';
import Auth from './Auth';
import CredentialsInvalid from './CredentialsInvalid';

//route auth middleware
function RequireAuth({children}) {
  let authContext = useAuthContext();

  if(!credentials.api.clientId || !credentials.api.clientSecret){
    return <Navigate to="/credentials-invalid" replace/>
  }

  if(!authContext.token){
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${credentials?.api.clientId}&response_type=code&scope=streaming%20user-modify-playback-state%20user-read-playback-state%20user-read-currently-playing%20app-remote-control%20user-read-email%20user-read-private%20user-library-read&redirect_uri=${window.location.protocol}//${window.location.host}/callback/`;
  }

  return children;
}

export default function Routes() {
  return (
    <AuthProvider>
      <CoreLayout>
        <ReactRouterWrapper>
          <Route path="/credentials-invalid" element={<CredentialsInvalid />} />
          <Route path="/callback" element={<Auth />} />
          <Route path="/" element={
            <RequireAuth>
              <Discover />
            </RequireAuth>
          }></Route>
        </ReactRouterWrapper>
      </CoreLayout>
    </AuthProvider>
  )
}
