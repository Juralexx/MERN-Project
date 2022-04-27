import React from 'react';
import SignInForm from '../components/log/SignInForm';
import { Link } from 'react-router-dom';
import FooterLight from '../components/FooterLight';

const Login = ({ uid }) => {

    if (uid) window.location = '/'
    else return (
        <div className="sign-container">
            <div className="sign-container-inner">
                <Link to="/">
                    <img src="/img/logo.png" alt="" className="header-logo" />
                </Link>
                <div className="sign-card">
                    <div className="title">
                        <h1>Connexion</h1>
                    </div>
                    <SignInForm />
                    <div className="sign-card-bottom">
                        Par encore de compte ?
                        <Link to="/register">Créer mon compte</Link>
                    </div>
                </div>
            </div>
            <FooterLight />
        </div>
    )
}

export default Login;