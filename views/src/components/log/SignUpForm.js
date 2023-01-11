import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";
import { Button } from '../tools/global/Button'
import { DynamicInput, CheckBox } from '../tools/global/Inputs';
import { ErrorCard } from "../tools/global/Error";
import { isEmailValid, onlyLettersNumbersAndDashes } from "../Utils";
import { useClickOutside } from "../tools/hooks/useClickOutside";
import Icon from "../tools/icons/Icon";

const SignUpForm = () => {
    const [datas, setDatas] = useState({
        pseudo: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false
    })
    const [passwordShown, setPasswordShown] = useState(false)
    const [error, setError] = useState({ element: "", error: "" })
    const [submitted, setSubmitted] = useState(false)

    const handleRegister = async () => {
        if (!onlyLettersNumbersAndDashes(datas.pseudo) || datas.pseudo.length < 4 || datas.pseudo.length > 20) {
            setError({
                element: "pseudo",
                error: "Votre pseudo ne peut contenir que des lettres, chiffre, tirets (-) et underscore (_) et faire entre 4 et 20 caractères"
            })
        } else {
            if (!isEmailValid(datas.email)) {
                setError({
                    element: "email",
                    error: "Veuillez saisir une adresse email valide"
                })
            } else {
                if (!secured) {
                    setError({
                        element: "password",
                        error: "Votre mot de passe ne respecte pas les conditions requises"
                    })
                } else {
                    if (datas.password !== datas.confirmPassword) {
                        setError({
                            element: "confirmed-password",
                            error: "Les mots de passe ne correspondent pas"
                        })
                    } else {
                        if (!datas.terms) {
                            setError({
                                element: "terms",
                                error: "Veuillez valider les conditions générales"
                            })
                        } else {
                            const data = { pseudo: datas.pseudo, password: datas.password, email: datas.email }
                            await axios
                                .post(`${process.env.REACT_APP_API_URL}api/user/register`, data)
                                .then(res => {
                                    if (res.data.errors) {
                                        if (res.data.errors.pseudo) {
                                            setError({
                                                element: "pseudo",
                                                error: res.data.errors.pseudo
                                            })
                                        } else {
                                            if (res.data.errors.email) {
                                                setError({
                                                    element: "email",
                                                    error: res.data.errors.email
                                                })
                                            } else {
                                                if (res.data.errors.password) {
                                                    setError({
                                                        element: "password",
                                                        error: res.data.errors.password
                                                    })
                                                }
                                            }
                                        }
                                    } else setSubmitted(true)
                                }).catch((err) => console.log(err));
                        }
                    }
                }
            }
        }
    }

    const passwordRef = useRef()
    const [display, setDisplay] = useState(false)
    useClickOutside(passwordRef, () => setDisplay(false))
    const [secured, setSecured] = useState({
        state: false,
        strength: 0,
        isLength: false,
        isUppercase: false,
        isLowercase: false,
        isNumeric: false,
        isChars: false,
    })
    const [valid, setValid] = useState([])

    useEffect(() => {
        if (/[a-z]/.test(datas.password)) {
            setSecured(content => ({ ...content, isLowercase: true }))
        } else {
            setSecured(content => ({ ...content, isLowercase: false }))
        }
        if (/[A-Z]/.test(datas.password)) {
            setSecured(content => ({ ...content, isUppercase: true }))
        } else {
            setSecured(content => ({ ...content, isUppercase: false }))
        }
        if (/[0-9]/.test(datas.password)) {
            setSecured(content => ({ ...content, isNumeric: true }))
        } else {
            setSecured(content => ({ ...content, isNumeric: false }))
        }
        if (/[!@#$%^&*]/.test(datas.password)) {
            setSecured(content => ({ ...content, isChars: true }))
        } else {
            setSecured(content => ({ ...content, isChars: false }))
        }
        if (datas.password.length >= 8 && datas.password.length <= 20) {
            setSecured(content => ({ ...content, isLength: true }))
        } else {
            setSecured(content => ({ ...content, isLength: false }))
        }

        if (secured.isLength && secured.isUppercase && secured.isLowercase && secured.isNumeric && secured.isChars) {
            setSecured(content => ({ ...content, state: true }))
            setDisplay(false)
        } else {
            setSecured(content => ({ ...content, state: false }))
        }
    }, [datas.password, secured.isLength, secured.isUppercase, secured.isLowercase, secured.isNumeric, secured.isChars])

    useEffect(() => {
        if (onlyLettersNumbersAndDashes(datas.pseudo) && datas.pseudo.length >= 4 && datas.pseudo.length <= 20) {
            setValid(arr => [...arr, "pseudo"])
        } else {
            setValid(arr => arr.filter(element => element !== "pseudo"))
        }
        if (isEmailValid(datas.email)) {
            setValid(arr => [...arr, "email"])
        } else {
            setValid(arr => arr.filter(element => element !== "email"))
        }
        if (secured.state) {
            setValid(arr => [...arr, "password"])
        } else {
            setValid(arr => arr.filter(element => element !== "password"))
        }
        if (datas.password !== "" && datas.password === datas.confirmPassword) {
            setValid(arr => [...arr, "confirmed-password"])
        } else {
            setValid(arr => arr.filter(element => element !== "confirmed-password"))
        }
    }, [datas.pseudo, datas.email, secured, datas.password, datas.confirmPassword])

    useEffect(() => {
        let count = []
        let chars = datas.password.toString().match(/[!@#$%^&*]/g)
        let lowercase = datas.password.match(/[a-z]/g)
        let uppercase = datas.password.match(/[A-Z]/g)
        let numeric = datas.password.match(/[0-9]/g)

        if ((chars || []).length >= 1)
            count = [...count, "chars"]
        else count = count.filter(e => e !== "chars")
        if ((lowercase || []).length >= 3) {
            count = [...count, "lowercase"]
        } else count = count.filter(e => e !== "lowercase")
        if ((uppercase || []).length >= 1) {
            count = [...count, "uppercase"]
        } else count = count.filter(e => e !== "uppercase")
        if ((numeric || []).length >= 3) {
            count = [...count, "numeric"]
        } else count = count.filter(e => e !== "numeric")
        if (datas.password.length >= 12) {
            count = [...count, "length"]
        } else count = count.filter(e => e !== "length")

        setSecured(content => ({ ...content, strength: count.length }))
    }, [datas.password])

    const addPasswordStrength = () => {
        if (secured.strength <= 2) return "weak"
        else if (secured.strength >= 3) return "medium"
        else if (secured.strength === 5) return "strong"
    }

    const addPasswordStrengthText = () => {
        if (secured.strength <= 2) return "Faible"
        else if (secured.strength >= 3) return "Moyen"
        else if (secured.strength === 5) return "Fort"
    }

    const addErrorClass = name => { if (error.element === name) { return "err" } else { return "" } }
    const validateParameter = value => { if (value) { return "is-valid" } else { return "not-valid" } }
    const addSuccessClass = value => { if (valid.includes(value)) return "succes" }
    const returnSVG = value => { if (value) { return <Icon name="CheckCircle" /> } else return <Icon name="CrossCircle" /> }

    return (
        !submitted ? (
            <>
                <div className="relative mb-4">
                    <DynamicInput
                        type="text"
                        text="Pseudo"
                        placeholder=" "
                        className={`${addErrorClass("pseudo")} ${addSuccessClass("pseudo")}`}
                        onChange={e => setDatas(data => ({ ...data, pseudo: e.target.value }))}
                        value={datas.pseudo}
                    />
                    {valid.includes("pseudo") && <Icon name="Check" className="validated" />}
                    {error.element === "pseudo" &&
                        <ErrorCard
                            display={error.element === "pseudo"}
                            text={error.error}
                            clean={() => setError({ element: "", error: "" })}
                        />
                    }
                </div>

                <div className="relative mb-4">
                    <DynamicInput
                        type="email"
                        text="Email"
                        placeholder=" "
                        className={`${addErrorClass("email")} ${addSuccessClass("email")}`}
                        onChange={(e) => setDatas(data => ({ ...data, email: e.target.value }))}
                        value={datas.email}
                    />
                    {valid.includes("email") &&
                        <Icon name="Check" className="validated" />
                    }
                    {error.element === "email" &&
                        <ErrorCard
                            display={error.element === "email"}
                            text={error.error}
                            clean={() => setError({ element: "", error: "" })}
                        />
                    }
                </div>

                <div className="relative mb-4" ref={passwordRef}>
                    <DynamicInput
                        type={passwordShown ? "text" : "password"}
                        text="Mot de passe"
                        className={`${addErrorClass("password")} ${addSuccessClass("password")}`}
                        placeholder=" "
                        onClick={() => setDisplay(!display)}
                        onChange={(e) => setDatas(data => ({ ...data, password: e.target.value }))}
                        value={datas.password}
                        endIcon={passwordShown ? <Icon name="Hidden" /> : <Icon name="Visible" />}
                        endIconClick={() => setPasswordShown(!passwordShown)}
                    />
                    {valid.includes("password") &&
                        <Icon name="Check" className="validated" />
                    }
                    {error.element === "password" &&
                        <ErrorCard
                            display={error.element === "password"}
                            text={error.error}
                            clean={() => setError({ element: "", error: "" })} />
                    }
                    {display &&
                        <div className="password-checker">
                            <div className="password-strength">
                                <div className={`strength-item ${addPasswordStrength()}`}></div>
                                <div className={`strength-item ${addPasswordStrength()}`}></div>
                                <div className={`strength-item ${addPasswordStrength()}`}></div>
                                <div className={`strength ${addPasswordStrength()}`}>{addPasswordStrengthText()}</div>
                            </div>
                            <div className="checker-header">Votre mot de passe doit inclure : </div>
                            <div className={`checker ${validateParameter(secured.isLength)}`}>
                                {returnSVG(secured.isLength)}
                                <p>8 à 20 caractères</p>
                            </div>
                            <div className={`checker ${validateParameter(secured.isUppercase)}`}>
                                {returnSVG(secured.isUppercase)}
                                <p>Au moins une lettre majuscule</p>
                            </div>
                            <div className={`checker ${validateParameter(secured.isLowercase)}`}>
                                {returnSVG(secured.isLowercase)}
                                <p>Au moins une lettre minuscule</p>
                            </div>
                            <div className={`checker ${validateParameter(secured.isNumeric)}`}>
                                {returnSVG(secured.isNumeric)}
                                <p>Au moins un chiffre</p>
                            </div>
                            <div className={`checker ${validateParameter(secured.isChars)}`}>
                                {returnSVG(secured.isChars)}
                                <p>Au moins un des caractère spéciaux suivant : !@#$%^&*</p>
                            </div>
                        </div>
                    }
                </div>

                <div className="relative mb-4">
                    <DynamicInput
                        type="password"
                        text="Confirmation mot de passe"
                        className={`${addErrorClass("confirmed-password")} ${addSuccessClass("confirmed-password")}`}
                        placeholder=" "
                        onChange={e => setDatas(data => ({ ...data, confirmPassword: e.target.value }))}
                        value={datas.confirmPassword}
                    />
                    {valid.includes("confirmed-password") &&
                        <Icon name="Check" className="validated" />
                    }
                    {error.element === "confirmed-password" &&
                        <ErrorCard
                            display={error.element === "confirmed-password"}
                            text={error.error}
                            clean={() => setError({ element: "", error: "" })}
                        />
                    }
                </div>

                <div className="flex items-center mb-6 mt-6">
                    <CheckBox
                        checked={datas.terms}
                        onChange={() => setDatas(data => ({ ...data, terms: !datas.terms }))}
                    />
                    <label htmlFor="terms" className="ml-2">
                        J'accepte les <a href="/" target="_blank" rel="noopener noreferrer">conditions générales</a>
                    </label>
                </div>
                {error.element === "terms" &&
                    <ErrorCard
                        display={error.element === "terms"}
                        text={error.error}
                        clean={() => setError({ element: "", error: "" })}
                    />
                }

                <Button
                    className="w-full"
                    onClick={handleRegister}
                    disabled={
                        !onlyLettersNumbersAndDashes(datas.pseudo)
                        || datas.pseudo.length <= 3
                        || datas.pseudo.length >= 20
                        || !isEmailValid(datas.email)
                        || !secured.state
                        || datas.password !== datas.confirmPassword
                        || !datas.terms
                    }>
                    S'inscrire
                </Button>
            </>
        ) : (
            <>
                <p className="successfully-registered">Votre compte a bien été créé ! <br /> Veuillez vous connecter</p>
                <SignInForm />
            </>
        )
    )
}

export default SignUpForm