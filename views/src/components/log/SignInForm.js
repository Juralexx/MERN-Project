import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '../tools/components/Button'
import { Input } from '../tools/components/Inputs';

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
                if (res.data.errors) {
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
        <>
            <div className="mb-4">
                <Input
                    type="email"
                    name="email"
                    id="email"
                    text="Email"
                    fullwidth
                    onChange={(e) => setEmail(e.target.value)}
                    defaultValue={email}
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
                    defaultValue={password}
                />

                <div className="password error text-red-500 px-3"></div>
            </div>
            <Button text="Se connecter" onClick={handleLogin} />
        </>
    );
}

export default SignInForm;