import React, { useContext } from 'react';
import SignInForm from '../components/log/SignInForm';
import { UidContext } from '../components/AppContext'
import { NavLink } from 'react-router-dom';

const Login = () => {
    const uid = useContext(UidContext)

    if (uid) {
        window.location = '/'
    }
    else return (
        <div className="h-[100vh] w-full dark:bg-gradient-to-r from-background_primary to-background_primary_light">
            <div className="flex flex-col items-center justify-center mx-auto h-[100vh] pb-[100px] max-w-[500px]">
                <NavLink to="/">
                    <img src="/img/logo.png" className="w-[120px] h-auto mx-auto mb-4" />
                </NavLink>
                <div className="p-6 shadow-custom dark:shadow-lg rounded-xl">
                    <div className="mb-5 text-center">
                        <h1 className="text-2xl text-gray-500 dark:text-slate-300">Connexion</h1>
                    </div>
                    <SignInForm />
                    <p className="text-center text-gray-500 dark:text-slate-300 px-5 py-3 border bg-primary/20 rounded-lg mt-4">
                        Par encore compte ?
                        <NavLink to="/register" className="text-primary ml-1 font-semibold">Créer mon compte</NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;