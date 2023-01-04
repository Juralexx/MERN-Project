import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";
import { Button } from '../tools/global/Button'
import { DynamicInput, CheckBox } from '../tools/global/Inputs';
import { ErrorCard } from "../tools/global/Error";
import { isEmailValid, onlyLettersNumbersAndDashes } from "../Utils";
import { useClickOutside } from "../tools/hooks/useClickOutside";
import { IoCloseCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { BsCheckLg } from 'react-icons/bs'

const SignUpForm = () => {
    const [submitted, setSubmitted] = useState(false)
    const [pseudo, setPseudo] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordShown, setPasswordShown] = useState(false)
    const [display, setDisplay] = useState(false)
    const passwordRef = useRef()
    useClickOutside(passwordRef, setDisplay, false)
    const [terms, setTerms] = useState(false)
    const [error, setError] = useState("")
    const [isErr, setErr] = useState(null)
    const errorRef = useRef()

    const handleRegister = async () => {
        if (!onlyLettersNumbersAndDashes(pseudo) || pseudo.length < 4 || pseudo.length > 20) {
            setErr("pseudo")
            setError("Votre pseudo ne peut contenir que des lettres, chiffre, tirets (-) et underscore (_) et faire entre 4 et 20 caractères")
        } else {
            if (!isEmailValid(email)) {
                setErr("email")
                setError("Veuillez saisir une adresse email valide")
            } else {
                if (!secured) {
                    setErr("password")
                    setError("Votre mot de passe ne respecte pas les conditions requises")
                } else {
                    if (password !== confirmPassword) {
                        setErr("confirmed-password")
                        setError("Les mots de passe ne correspondent pas")
                    } else {
                        if (!terms) {
                            setErr("terms")
                            setError("Veuillez valider les conditions générales")
                        } else {
                            const data = { pseudo: pseudo, password: password, email: email }
                            await axios
                                .post(`${process.env.REACT_APP_API_URL}api/user/register`, data)
                                .then(res => {
                                    if (res.data.errors) {
                                        if (res.data.errors.pseudo) {
                                            setErr("pseudo")
                                            setError(res.data.errors.pseudo)
                                        } else {
                                            if (res.data.errors.email) {
                                                setErr("email")
                                                setError(res.data.errors.email)
                                            } else {
                                                if (res.data.errors.password) {
                                                    setErr("password")
                                                    setError(res.data.errors.password)
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

    const [secured, setSecured] = useState(false)
    const [valid, setValid] = useState([])
    const [strength, setStrength] = useState(0)
    const [isLength, setLength] = useState(false)
    const [isUppercase, setUppercase] = useState(false)
    const [isLowercase, setLowercase] = useState(false)
    const [isNumeric, setNumeric] = useState(false)
    const [isChars, setChars] = useState(false)

    useEffect(() => {
        if (/[a-z]/.test(password)) { setLowercase(true) } else setLowercase(false)
        if (/[A-Z]/.test(password)) { setUppercase(true) } else setUppercase(false)
        if (/[0-9]/.test(password)) { setNumeric(true) } else setNumeric(false)
        if (/[!@#$%^&*]/.test(password)) { setChars(true) } else setChars(false)
        if (password.length >= 8 && password.length <= 20) { setLength(true) } else setLength(false)

        if (isLength && isUppercase && isLowercase && isNumeric && isChars) {
            setSecured(true)
            setDisplay(false)
        } else setSecured(false)
    }, [password, isLength, isUppercase, isLowercase, isNumeric, isChars])

    useEffect(() => {
        if (onlyLettersNumbersAndDashes(pseudo) && pseudo.length >= 4 && pseudo.length <= 20) {
            setValid((arr) => [...arr, "pseudo"])
        } else setValid((arr) => arr.filter(element => element !== "pseudo"))
        if (isEmailValid(email)) {
            setValid((arr) => [...arr, "email"])
        } else setValid((arr) => arr.filter(element => element !== "email"))
        if (secured) {
            setValid((arr) => [...arr, "password"])
        } else setValid((arr) => arr.filter(element => element !== "password"))
        if (password !== "" && password === confirmPassword) {
            setValid((arr) => [...arr, "confirmed-password"])
        } else setValid((arr) => arr.filter(element => element !== "confirmed-password"))
    }, [pseudo, email, secured, password, confirmPassword])

    useEffect(() => {
        let count = []
        let chars = password.toString().match(/[!@#$%^&*]/g)
        let lowercase = password.match(/[a-z]/g)
        let uppercase = password.match(/[A-Z]/g)
        let numeric = password.match(/[0-9]/g)

        if ((chars || []).length >= 2)
            count = [...count, "chars"]
        else count = count.filter(e => e !== "chars")
        if ((lowercase || []).length >= 3) {
            count = [...count, "lowercase"]
        } else count = count.filter(e => e !== "lowercase")
        if ((uppercase || []).length >= 2) {
            count = [...count, "uppercase"]
        } else count = count.filter(e => e !== "uppercase")
        if ((numeric || []).length >= 3) {
            count = [...count, "numeric"]
        } else count = count.filter(e => e !== "numeric")
        if (password.length >= 12) {
            count = [...count, "length"]
        } else count = count.filter(e => e !== "length")

        setStrength(count.length)
    }, [password])

    const addPasswordStrength = () => {
        if (strength <= 2) return "weak"
        else if (strength === 3) return "medium"
        else if (strength >= 4) return "strong"
    }

    const addPasswordStrengthText = () => {
        if (strength <= 2) return "Faible"
        else if (strength === 3) return "Moyen"
        else if (strength >= 4) return "Fort"
    }

    const addErrorClass = (name) => { if (isErr === name) { return "err" } else { return "" } }
    const validateParameter = (value) => { if (value) { return "is-valid" } else { return "not-valid" } }
    const addSuccessClass = (value) => { if (valid.includes(value)) return "succes" }
    const returnSVG = (value) => { if (value) { return <IoCheckmarkCircleOutline /> } else return <IoCloseCircleOutline /> }

    return (
        !submitted ? (
            <>
                <div className="relative mb-4">
                    <DynamicInput type="text" text="Pseudo" placeholder=" " className={`${addErrorClass("pseudo")} ${addSuccessClass("pseudo")}`} onClick={() => setErr(null)} onChange={(e) => setPseudo(e.target.value)} value={pseudo} />
                    {valid.includes("pseudo") && <BsCheckLg className="validated" />}
                    {isErr === "pseudo" && <ErrorCard useRef={errorRef} display={isErr === "pseudo"} text={error} className="min-w-full" clean={() => setErr("")} />}
                </div>

                <div className="relative mb-4">
                    <DynamicInput type="email" text="Email" placeholder=" " className={`${addErrorClass("email")} ${addSuccessClass("email")}`} onChange={(e) => setEmail(e.target.value)} value={email} />
                    {valid.includes("email") && <BsCheckLg className="validated" />}
                    {isErr === "email" && <ErrorCard useRef={errorRef} display={isErr === "email"} text={error} className="min-w-full" clean={() => setErr("")} />}
                </div>

                <div className="relative mb-4" ref={passwordRef}>
                    <DynamicInput type={passwordShown ? "text" : "password"} text="Mot de passe" className={`${addErrorClass("password")} ${addSuccessClass("password")}`} placeholder=" " onClick={() => setDisplay(!display)} onChange={(e) => setPassword(e.target.value)} value={password} endIcon={passwordShown ? <AiFillEyeInvisible /> : <AiFillEye />} endIconClick={() => setPasswordShown(!passwordShown)} />
                    {valid.includes("password") && <BsCheckLg className="validated" />}
                    {isErr === "password" && <ErrorCard useRef={errorRef} display={isErr === "password"} text={error} className="min-w-full" clean={() => setErr("")} />}
                    {display &&
                        <div className="password-checker">
                            <div className="password-strength">
                                <div className={`strength-item ${addPasswordStrength()}`}></div>
                                <div className={`strength-item ${addPasswordStrength()}`}></div>
                                <div className={`strength-item ${addPasswordStrength()}`}></div>
                                <div className={`strength ${addPasswordStrength()}`}>{addPasswordStrengthText()}</div>
                            </div>
                            <div className="checker-header">Votre mot de passe doit inclure : </div>
                            <div className={`checker ${validateParameter(isLength)}`}>{returnSVG(isLength)} <p>8 à 20 caractères</p></div>
                            <div className={`checker ${validateParameter(isUppercase)}`}>{returnSVG(isUppercase)} <p>Au moins une lettre majuscule</p></div>
                            <div className={`checker ${validateParameter(isLowercase)}`}>{returnSVG(isLowercase)} <p>Au moins une lettre minuscule</p></div>
                            <div className={`checker ${validateParameter(isNumeric)}`}>{returnSVG(isNumeric)} <p>Au moins un chiffre</p></div>
                            <div className={`checker ${validateParameter(isChars)}`}>{returnSVG(isChars)} <p>Au moins un des caractère spéciaux suivant : !@#$%^&*</p></div>
                        </div>
                    }
                </div>

                <div className="relative mb-4">
                    <DynamicInput type="password" text="Confirmation mot de passe" className={`${addErrorClass("confirmed-password")} ${addSuccessClass("confirmed-password")}`} placeholder=" " onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                    {valid.includes("confirmed-password") && <BsCheckLg className="validated" />}
                    {isErr === "confirmed-password" && <ErrorCard useRef={errorRef} display={isErr === "confirmed-password"} text={error} className="min-w-full" clean={() => setErr("")} />}
                </div>

                <div className="flex items-center mb-6 mt-6">
                    <CheckBox checked={terms} onChange={() => setTerms(!terms)} />
                    <label htmlFor="terms" className="ml-2">J'accepte les <a href="/" target="_blank" rel="noopener noreferrer">conditions générales</a></label>
                </div>
                {isErr === "terms" && <ErrorCard useRef={errorRef} display={isErr === "terms"} text={error} className="min-w-full" clean={() => setErr("")} />}

                <Button
                    className="w-full"
                    onClick={handleRegister}
                    disabled={!onlyLettersNumbersAndDashes(pseudo) || pseudo.length <= 3 || pseudo.length >= 20 || !isEmailValid(email) || !secured || password !== confirmPassword || !terms}
                >
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