import React from 'react';
import SignInForm from '../components/log/SignInForm';
import { Link } from 'react-router-dom';
import FooterLight from '../components/FooterLight';
import { TextButton } from '../components/tools/global/Button';

const Login = ({ uid }) => {

    if (uid) window.location = '/'
    else return (
        <div className="sign-container">
            <div className="sign-container-inner">
                <div className="sign-card">
                    <Link to="/">
                        <img src="/img/logo.png" alt="" className="header-logo" />
                    </Link>
                    <h1>Connexion</h1>
                    <SignInForm />
                    <div className="sign-card-bottom">
                        Par encore de compte ?
                        <TextButton className="ml-2"><Link to="/register">Inscription</Link></TextButton>
                    </div>
                </div>
            </div>
            <FooterLight />
        </div>
    )
}

export default Login;