import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '../tools/global/Button'
import { DynamicInput } from '../tools/global/Inputs';
import { ErrorCard } from '../tools/global/Error';
import { handleEnterKey } from '../Utils'
import Icon from '../tools/icons/Icon';

const SignInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [passwordShown, setPasswordShown] = useState(false)
    const [error, setError] = useState({ element: "", error: "" })
    const addErrorClass = (name) => { if (error.element === name) { return "err" } else { return "" } }

    const handleLogin = async () => {
        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials: true,
            data: { email, password }
        }).then(res => {
            if (res.data.errors) {
                if (res.data.errors.email) {
                    setError({ element: "email", error: res.data.errors.email })
                } else {
                    if (res.data.errors.password) {
                        setError({ element: "password", error: res.data.errors.password })
                    }
                }
            } else {
                localStorage.setItem("auth", true)
                window.location = '/'
            }
        }).catch((err) => console.log(err))
    }

    return (
        <>
            <div className="mb-4" onKeyPress={e => handleEnterKey(e, handleLogin)}>
                <DynamicInput
                    type="email"
                    text="Email"
                    placeholder=" "
                    className={`${addErrorClass("email")}`}
                    onChange={e => setEmail(e.target.value)}
                    defaultValue={email}
                />
                {error.element === "email" &&
                    <ErrorCard
                        display={error.element === "email"}
                        text={error.error}
                        clean={() => setError({ element: "", error: "" })}
                    />
                }
            </div>
            <div className="mb-4">
                <DynamicInput
                    type={passwordShown ? "text" : "password"}
                    text="Mot de passe"
                    placeholder=" "
                    className={`${addErrorClass("password")}`}
                    onChange={e => setPassword(e.target.value)}
                    defaultValue={password}
                    endIcon={passwordShown ? <Icon name="Hidden" /> : <Icon name="Visible" />}
                    endIconClick={() => setPasswordShown(!passwordShown)}
                />
                <div className="forgot-password">
                    <Link to="/">Mot de passe oublié</Link>
                </div>
                {error.element === "password" &&
                    <ErrorCard
                        display={error.element === "password"}
                        text={error.error}
                        clean={() => setError({ element: "", error: "" })}
                    />
                }
            </div>
            <Button className="mt-6 w-full" onClick={handleLogin}>Connexion</Button>
        </>
    );
}

export default SignInForm;