import React from 'react';
import SignUpForm from '../components/log/SignUpForm';
import { Link } from 'react-router-dom';
import FooterLight from '../components/FooterLight';
import { TextButton } from '../components/tools/global/Button';

const Register = ({ uid }) => {

    if (uid) window.location = '/'
    else return (
        <div className="sign-container">
            <div className="sign-container-inner">
                <div className="sign-card">
                    <Link to="/">
                        <img src="/img/logo.png" alt="" className="header-logo" />
                    </Link>
                    <h1>Inscription</h1>
                    <SignUpForm />
                    <div className="sign-card-bottom">
                        Déjà un compte ?
                        <TextButton className="ml-2"><Link to="/login">Connexion</Link></TextButton>
                    </div>
                </div>
            </div>
            <FooterLight />
        </div>
    );
}

export default Register;

