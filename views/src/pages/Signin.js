import React, { useContext } from 'react';
import SignInForm from '../components/log/SignInForm';
import { UidContext } from '../components/AppContext'

const Login = () => {
  const uid = useContext(UidContext)

  if (uid) {
    window.location = '/'
  }
  else return (
    <div className="container">
      <div className="header-login">
        <a href="/">
          <img src="/img/logo.png" alt="" />
        </a>
      </div>
      <div className="container">
        <div className="auth-form">
          <div className="auth-form-header">
            <h1>Se connecter</h1>
          </div>
          <div className="auth-form-body">
            <SignInForm />
          </div>
          <p className="login-callout">
            Par encore compte ? <a href="/register">Créer mon compte</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;