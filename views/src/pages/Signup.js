import React from 'react';
import SignUpForm from '../components/log/SignUpForm';

const Register = () => {
  return (
    <div className="container">
      <div className="header-register">
        <a href="/">
          <img src="/img/logo.png" alt="" />
        </a>
      </div>
      <div className="container">
        <div className="register-form">
          <div class="register-form-header">
            <h1>S'inscrire</h1>
          </div>
          <div class="register-form-body">
            <SignUpForm />
          </div>
          <p className="register-callout">
           Déjà un compte ? <a href="/login">Me connecter</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

