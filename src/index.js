import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './styles/_main.scss';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
