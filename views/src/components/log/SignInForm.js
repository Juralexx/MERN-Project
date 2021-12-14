import React from 'react';
import axios from 'axios';

const SignInForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {

    }

    return (
        <form action="" onSubmit={ handleLogin } id="sign-in-form">
            <label htmlFor="email">Email</label><br />
            <input 
                type="text" 
                name="email" 
                id="email" 
                onChange={ (e) => setEmail(e.target.value) } 
                value={ email } 
            />
            
            <div className="email error"></div>

            <label htmlFor="password">Mot de passe</label><br />
            <input 
                type="password" 
                name="password" 
                id="password" 
                onChange={ (e) => setPassword(e.target.value) } 
                value={ password } 
            />

            <div className="password error"></div>

            <input type="Submit" value="Se connecter" />
        </form>
    );
}

export default SignInForm;