import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm = () => {
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault()
        const pseudoError = document.querySelector('.pseudo.error')
        const emailError = document.querySelector('.email.error')
        const passwordError = document.querySelector('.password.error')

        axios({
            method: "post",
            url: `${ process.env.REACT_APP_API_URL }api/user/signup`,
            widthCredentials: true,
            data: {
                pseudo: pseudo,
                email: email,
                password,
            },
        })
            .then((res) => {
                if(res.data.errors) {
                    pseudoError.innerHTML = res.data.errors.pseudo
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
        <form action="" onSubmit={ handleLogin } id="signup-form">
            <label htmlFor="pseudo">Pseudo</label><br />
            <input 
                type="text" 
                name="pseudo" 
                id="pseudo" 
                value={ pseudo } 
                onChange={ (e) => setPseudo(e.target.value) } 
            />
            
                <div className="pseudo error"></div>
        
            <label htmlFor="email">Email</label><br />
            <input 
                type="text" 
                name="email" 
                id="email" 
                value={ email } 
                onChange={ (e) => setEmail(e.target.value) } 
            />
            
                <div className="email error"></div>

            <label htmlFor="password">Mot de passe</label><br />
            <input 
                type="password" 
                name="password" 
                id="password" 
                value={ password } 
                onChange={ (e) => setPassword(e.target.value) } 
            />

                <div className="password error"></div>

            <input type="Submit" value="Se connecter" />
        </form>
    );
}

export default SignUpForm;