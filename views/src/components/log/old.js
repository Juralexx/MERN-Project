import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm = () => {
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault()
        const terms = document.getElementById('terms')
        const pseudo = document.getElementById('pseudo')
        const password = document.getElementById('password')
        const confirmPassword = document.getElementById('password-confirm')
        const email = document.getElementById('email')
        
        const pseudoError = document.querySelector('.pseudo.error')
        const emailError = document.querySelector('.email.error')
        const passwordError = document.querySelector('.password.error')
        const confirmPasswordError = document.querySelector('.password-confirm.error')
        const termsError = document.querySelector('.terms.error')

        pseudoError.innerHTML = ""
        emailError.innerHTML = ""
        passwordError.innerHTML = ""
        confirmPasswordError.innerHTML = ""
        termsError.innerHTML = ""

        if (pseudo.value==="" || email.value==="" || password.value==="" || password !== confirmPassword || !terms.checked) {
            if (pseudo.value === "") {
                pseudoError.innerHTML = "Veuillez choisir un pseudo"
            }
            else if (email.value === "") {
                emailError.innerHTML = "Veuillez renseigner votre adresse email"
            }
            else if (password.value === "") {
                passwordError.innerHTML = "Veuillez renseigner votre mot de passe"
            }
            else if (password !== confirmPassword) {
                confirmPasswordError.innerHTML = "Les mots de passe ne correspondent pas"
            }
            else if (!terms.checked) {
                termsError.innerHTML = "Veuillez valider les conditions générales"
            }
        } else { 
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/user/register`,
                data: {
                    pseudo,
                    email,
                    password,
                },
            })
            .then((res) => {
                console.log(res)
                if(res.data.errors) {
                    pseudoError.innerHTML = res.data.errors.pseudo
                    emailError.innerHTML = res.data.errors.email
                    passwordError.innerHTML = res.data.errors.password
                } else {
                    window.location = '/login'
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    return (
        <form action="" onSubmit={ handleRegister } id="signup-form">
            <label htmlFor="pseudo">Pseudo</label><br />
            <input 
                type="text" 
                name="pseudo" 
                id="pseudo" 
                defaultValue={ pseudo } 
                onChange={ (e) => setPseudo(e.target.value) } 
            />
            
                <div className="pseudo error"></div>
        
            <label htmlFor="email">Email</label><br />
            <input 
                type="text" 
                name="email" 
                id="email" 
                defaultValue={ email } 
                onChange={ (e) => setEmail(e.target.value) } 
            />
            
            <div className="email error"></div>

            <label htmlFor="password">Mot de passe</label><br />
            <input 
                type="password" 
                name="password" 
                id="password" 
                defaultValue={ password } 
                onChange={ (e) => setPassword(e.target.value) } 
            />

            <div className="password error"></div>

            <label htmlFor="password-confirm">Mot de passe</label><br />
            <input 
                type="password" 
                name="password" 
                id="password-confirm" 
                defaultValue={ confirmPassword } 
                onChange={ (e) => setConfirmPassword(e.target.value) } 
            />

            <div className="password-confirm error"></div>

            <input type="checkbox" id="terms" />
            <label htmlFor="terms">J'accepte les <a href="/" target="_blank" rel="noopener noreferrer">conditions générales</a></label><br />

            <div className="terms error"></div>

            <button type="submit">S'inscrire</button>

            <p>Vous avez déjà un compte ? <a href="/login">Me connecter</a></p>
        </form>
    );
}

export default SignUpForm;