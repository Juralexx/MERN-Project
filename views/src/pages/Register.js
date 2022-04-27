import React from 'react';
import SignUpForm from '../components/log/SignUpForm';
import { Link } from 'react-router-dom';
import FooterLight from '../components/FooterLight';

const Register = ({ uid }) => {
    
    if (uid) window.location = '/'
    else return (
        <div className="sign-container">
            <div className="sign-container-inner">
                <Link to="/">
                    <img src="/img/logo.png" alt="" className="header-logo" />
                </Link>
                <div className="sign-card">
                    <div className="title"><h1>Inscription</h1></div>
                    <SignUpForm />
                    <div className="sign-card-bottom">
                        Déjà un compte ?
                        <Link to="/login">Connexion</Link>
                    </div>
                </div>
            </div>
            <FooterLight />
        </div>
    );
}

export default Register;

