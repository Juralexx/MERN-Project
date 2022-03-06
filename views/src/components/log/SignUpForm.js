import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";
import { Button } from '../tools/components/Button'
import { Input } from '../tools/components/Inputs';

const SignUpForm = () => {
    const [submitted, setSubmitted] = useState(false)
    const [pseudo, setPseudo] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleRegister = async (e) => {
        e.preventDefault()
        const terms = document.getElementById("terms")

        const pseudoError = document.querySelector(".pseudo.error")
        const emailError = document.querySelector(".email.error")
        const passwordError = document.querySelector(".password.error")
        const passwordConfirmError = document.querySelector(".password-confirm.error")
        const termsError = document.querySelector(".terms.error")

        pseudoError.innerHTML = ""
        emailError.innerHTML = ""
        passwordError.innerHTML = ""
        passwordConfirmError.innerHTML = ""
        termsError.innerHTML = ""

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
        <> {submitted ? (
            <>
                <p className="success">Votre compte a bien été créé ! <br /> Veuillez vous connecter</p>
                <SignInForm />
            </>
        ) : (
            <>
                <div className="mb-4">
                    <Input
                        type="text"
                        name="pseudo"
                        id="pseudo"
                        text="Pseudo"
                        fullwidth
                        onChange={(e) => setPseudo(e.target.value)}
                        value={pseudo}
                    />
                    <div className="pseudo error text-red-500 px-3"></div>
                </div>

                <div className="mb-4">
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        text="Email"
                        fullwidth
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <div className="email error text-red-500 px-3"></div>
                </div>

                <div className="mb-4">
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        text="Mot de passe"
                        fullwidth
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <div className="password error text-red-500 px-3"></div>
                </div>

                <div className="mb-4">
                    <Input
                        type="password"
                        name="password-confirm"
                        id="password-confirm"
                        text="Confirmation mot de passe"
                        fullwidth
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                    />
                    <div className="password-confirm error text-red-500 px-3"></div>
                </div>

                <div class="flex items-start mb-6">
                    <div class="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                    </div>
                    <div class="ml-3 text-sm">
                        <label htmlFor="terms" className="font-medium text-gray-900 dark:text-gray-300">J'accepte les <a href="/" target="_blank" rel="noopener noreferrer">conditions générales</a></label>
                    </div>
                </div>
                <div className="terms error"></div>

                <Button text="S'inscrire" onClick={handleRegister} >S'inscrire</Button>
            </>
        )}
        </>
    );
};

export default SignUpForm;