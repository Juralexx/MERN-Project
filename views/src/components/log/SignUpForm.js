import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        const terms = document.getElementById("terms");

        const pseudoError = document.querySelector(".pseudo.error");
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");
        const passwordConfirmError = document.querySelector(".password-confirm.error");
        const termsError = document.querySelector(".terms.error");

        pseudoError.innerHTML = ""
        emailError.innerHTML = ""
        passwordError.innerHTML = ""
        passwordConfirmError.innerHTML = "";
        termsError.innerHTML = "";

        if (password !== confirmPassword || !terms.checked) {
            if (password !== confirmPassword) {
                passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas"
            }
            if (!terms.checked) {
                termsError.innerHTML = "Veuillez valider les conditions générales"
            }
        }
        
        else {
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
                    console.log(res);
                    if (res.data.errors) {
                        pseudoError.innerHTML = res.data.errors.pseudo;
                        emailError.innerHTML = res.data.errors.email;
                        passwordError.innerHTML = res.data.errors.password;
                    } else {
                        setSubmitted(true)
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <> { submitted ? ( 
                <> 
                    <p className="success">Votre compte a bien été créé ! <br /> Veuillez vous connecter</p>
                    <SignInForm/>
                </> 
            ) : (
                <form action="" onSubmit={handleRegister} id="sign-up-form">
                    <label htmlFor="pseudo">Pseudo</label>
                    <input
                        type="text"
                        name="pseudo"
                        id="pseudo"
                        onChange={(e) => setPseudo(e.target.value)}
                        value={pseudo}
                    />
                    <div className="pseudo error"></div>

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <div className="email error"></div>

                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <div className="password error"></div>

                    <label htmlFor="password-confirm">Confirmer mot de passe</label>
                    <input
                        type="password"
                        name="password-confirm"
                        id="password-confirm"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                    />
                    <div className="password-confirm error"></div>

                    <div className="terms-container">
                        <input type="checkbox" id="terms" />
                        <label htmlFor="terms">J'accepte les <a href="/" target="_blank" rel="noopener noreferrer">conditions générales</a></label>
                    </div>
                    <div className="terms error"></div>

                    <button className="btn btn-primary" id="submitRegister" disabled type="submit">S'inscrire</button>
                </form>
            )}
        </>
    );
};

export default SignUpForm;