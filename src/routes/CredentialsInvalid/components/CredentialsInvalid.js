import React from 'react';
import '../styles/_credentialsInvalid.scss';

export default function CredentialsInvalid() {
    return (
        <div className="jumbotron">
            <h1 className="jumbotron__title">Oops! Sorry, Credentials Invalid!</h1>
            <p className="jumbotron__paragraph">Please make sure you have included all credentials needed in .env file. You can copy the config format from the .env.example!</p>
            <p className="jumbotron__paragraph">After you set up, please restart the server</p>
        </div>
    )
}