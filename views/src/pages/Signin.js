import React, { useContext } from 'react';
import SignInForm from '../components/log/SignInForm';
import { UidContext } from '../components/AppContext'
import { Link } from 'react-router-dom';

const Login = () => {
    const uid = useContext(UidContext)

    if (uid) window.location = '/'
    else return (
        <div className="sign-container">
            <div className="sign-container-inner">
                <Link to="/">
                    <img src="/img/logo.png" alt="" className="header-logo" />
                </Link>
                <div className="sign-card">
                    <div className="title">
                        <h1 className="text-2xl text-gray-500 dark:text-slate-300">Connexion</h1>
                    </div>
                    <SignInForm />
                    <div className="sign-card-bottom">
                        Par encore compte ?
                        <Link to="/register">Créer mon compte</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;