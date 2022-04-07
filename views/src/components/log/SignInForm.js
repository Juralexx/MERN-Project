import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '../tools/components/Button'
import { DynamicInput } from '../tools/components/Inputs';
import { ErrorCard } from '../tools/components/Error';
import { handleEnterKey } from '../Utils'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const SignInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [passwordShown, setPasswordShown] = useState(false)
    const [error, setError] = useState("")
    const [isErr, setErr] = useState(null)
    const errorRef = useRef()
    const addErrorClass = (name) => { if (isErr === name) { return "err" } else { return "" } }

    const handleLogin = async () => {
        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials: true,
            data: { email, password }
        }).then(res => {
            if (res.data.errors) {
                if (res.data.errors.email) {
                    setErr("email")
                    setError(res.data.errors.email)
                } else {
                    if (res.data.errors.password) {
                        setErr("password")
                        setError(res.data.errors.password)
                    }
                }
            } else window.location = '/'
        }).catch((err) => console.log(err))
    }

    return (
        <>
            <div className="mb-4" onKeyPress={(e) => handleEnterKey(e, handleLogin)}>
                <DynamicInput
                    type="email"
                    text="Email"
                    placeholder=" "
                    className={`${addErrorClass("email")}`}
                    onChange={(e) => setEmail(e.target.value)}
                    defaultValue={email}
                />
                {isErr === "email" && <ErrorCard useRef={errorRef} display={isErr === "email"} text={error} className="min-w-full" clean={() => setErr("")} />}
            </div>
            <div className="mb-4">
                <DynamicInput
                    type={passwordShown ? "text" : "password"}
                    text="Mot de passe"
                    placeholder=" "
                    className={`${addErrorClass("password")}`}
                    onChange={(e) => setPassword(e.target.value)}
                    defaultValue={password}
                    endIcon={passwordShown ? <AiFillEyeInvisible /> : <AiFillEye />} endIconClick={() => setPasswordShown(!passwordShown)}
                />
                <div className="forgot-password"><Link to="/">Mot de passe oublié</Link></div>
                {isErr === "password" && <ErrorCard useRef={errorRef} display={isErr === "password"} text={error} className="min-w-full" clean={() => setErr("")} />}
            </div>
            <Button text="Connexion" className="mt-6 w-full" onClick={handleLogin} />
        </>
    );
}

export default SignInForm;