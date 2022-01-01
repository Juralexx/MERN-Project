import React, { useState } from 'react';
import axios from 'axios';

const SignInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault()
        const emailError = document.querySelector('.email.error')
        const passwordError = document.querySelector('.password.error')

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials: true,
            data: {
                email,
                password,
            },
        })
        .then((res) => {
            console.log(res)
            if(res.data.errors) {
                emailError.innerHTML = res.data.errors.email
                passwordError.innerHTML = res.data.errors.password
            } else {
                window.location = '/'
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <form action="" onSubmit={ handleLogin } id="signin-form">
            <label htmlFor="email">Email</label>
            <input 
                type="email" 
                name="email" 
                id="email" 
                onChange={ (e) => setEmail(e.target.value) } 
                defaultValue={email} 
            />
            
            <div className="email error"></div>

            <label htmlFor="password">Mot de passe</label>
            <input 
                type="password" 
                name="password" 
                id="password"  
                onChange={ (e) => setPassword(e.target.value) } 
                defaultValue={password}
            />

            <div className="password error"></div>

            <button className="btn btn-primary" id="submitLogin" disabled type="submit">Se connecter</button>
        </form>
    );
}

export default SignInForm;