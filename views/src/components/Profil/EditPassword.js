import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { ErrorCard } from '../tools/components/Error'
import { IconInput } from '../tools/components/Inputs'

const EditPassword = ({ user, password, setPassword, newPassword, setNewPassword, confirmedNewPassword, setConfirmedNewPassword, isErr, setErr, error, checkErr }) => {
    const [passwordShown, setPasswordShown] = useState([])

    const showPassword = (num) => {
        passwordShown.includes(num) ? (
            setPasswordShown(p => p.filter(pass => pass !== num))
        ) : (
            setPasswordShown(p => [...p, num])
        )
    }

    return (
        <div className="col-12 col-md-6 offset-md-3">
            <h3 className="txt-ter mb-5">Mot de passe</h3>
            <div className="col-12 mb-5">
                <p className="txt-ter mb-1">Ancien mot de passe</p>
                <IconInput
                    type={passwordShown.includes(1) ? "text" : "password"}
                    className={`full ${checkErr("password")}`}
                    placeholder="Ancien mot de passe..."
                    onChange={(e) => setPassword(e.target.value)}
                    defaultValue={password}
                    endIcon={passwordShown.includes(1) ? <AiFillEyeInvisible /> : <AiFillEye />}
                    endIconClick={() => showPassword(1)}
                />
                {isErr === "password" && <ErrorCard display={isErr === "password"} text={error} clean={() => setErr("")} />}
            </div>
            <div className="col-12 mb-5">
                <p className="txt-ter mb-1">Nouveau mot de passe</p>
                <IconInput
                    type={passwordShown.includes(2) ? "text" : "password"}
                    className={`full ${checkErr("password")}`}
                    placeholder="Nouveau mot de passe..."
                    onChange={(e) => setNewPassword(e.target.value)}
                    defaultValue={password}
                    endIcon={passwordShown.includes(2) ? <AiFillEyeInvisible /> : <AiFillEye />}
                    endIconClick={() => showPassword(2)}
                />
                {isErr === "new-password" && <ErrorCard display={isErr === "new-password"} text={error} clean={() => setErr("")} />}
            </div>
            <div className="col-12 mb-5">
                <p className="txt-ter mb-1">Confirmation nouveau mot de passe</p>
                <IconInput
                    type={passwordShown.includes(3) ? "text" : "password"}
                    className={`full ${checkErr("password")}`}
                    placeholder="Confirmation nouveau mot de passe..."
                    onChange={(e) => setConfirmedNewPassword(e.target.value)}
                    defaultValue={password}
                    endIcon={passwordShown.includes(3) ? <AiFillEyeInvisible /> : <AiFillEye />}
                    endIconClick={() => showPassword(3)}
                />
                {isErr === "confirmed-new-password" && <ErrorCard display={isErr === "confirmed-new-password"} text={error} clean={() => setErr("")} />}
            </div>
        </div>
    )
}

export default EditPassword