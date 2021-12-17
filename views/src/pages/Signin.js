import React, { useContext } from 'react';
import SignInForm from '../components/log/SignInForm';
import { UidContext } from '../components/AppContext'

const Login = () => {
  const uid = useContext(UidContext)

  if(uid) {
    window.location = '/'
  } else return (
    <div className="signin-page">
      <div className="signin-container">
        <SignInForm />
      </div>
    </div>
  );
}

export default Login;