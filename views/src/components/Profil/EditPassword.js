import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { ErrorCard } from '../tools/global/Error'
import { IconInput } from '../tools/global/Inputs'

const EditPassword = ({ password, setPassword, error, setError, checkErr }) => {
    const [passwordShown, setPasswordShown] = useState([])

    const showPassword = (num) => {
        if (passwordShown.includes(num)) {
            setPasswordShown(p => p.filter(pass => pass !== num))
        } else setPasswordShown(p => [...p, num])
    }

    return (
        <div className="col-12 col-md-6 offset-md-3">
            <h3 className="txt-ter mb-5">Mot de passe</h3>
            <p className="txt-ter mb-1">Ancien mot de passe</p>
            <IconInput
                className={`full mb-6 ${checkErr("password")}`}
                type={passwordShown.includes(1) ? "text" : "password"}
                placeholder="Ancien mot de passe..."
                defaultValue={password.password}
                onChange={(e) => setPassword(datas => ({ ...datas, password: e.target.value }))}
                endIcon={passwordShown.includes(1) ? <AiFillEyeInvisible /> : <AiFillEye />}
                endIconClick={() => showPassword(1)}
            />
            {error.element === "password" &&
                <ErrorCard
                    display={error.element === "password"}
                    text={error.error}
                    clean={() => setError({ element: "", error: "" })}
                />
            }
            <p className="txt-ter mb-1">Nouveau mot de passe</p>
            <IconInput
                className={`full mb-6 ${checkErr("new-password")}`}
                type={passwordShown.includes(2) ? "text" : "password"}
                placeholder="Nouveau mot de passe..."
                defaultValue={password.newPassword}
                onChange={e => setPassword(datas => ({ ...datas, password: e.target.value }))}
                endIcon={passwordShown.includes(2) ? <AiFillEyeInvisible /> : <AiFillEye />}
                endIconClick={() => showPassword(2)}
            />
            {error.element === "new-password" &&
                <ErrorCard
                    display={error.element === "new-password"}
                    text={error.error}
                    clean={() => setError({ element: "", error: "" })}
                />
            }
            <p className="txt-ter mb-1">Confirmation nouveau mot de passe</p>
            <IconInput
                className={`full ${checkErr("confirmed-new-password")}`}
                type={passwordShown.includes(3) ? "text" : "password"}
                placeholder="Confirmation nouveau mot de passe..."
                defaultValue={password.confirmedNewPassword}
                onChange={(e) => setPassword(datas => ({ ...datas, confirmedNewPassword: e.target.value }))}
                endIcon={passwordShown.includes(3) ? <AiFillEyeInvisible /> : <AiFillEye />}
                endIconClick={() => showPassword(3)}
            />
            {error.element === "confirmed-new-password" &&
                <ErrorCard
                    display={error.element === "confirmed-new-password"}
                    text={error.error}
                    clean={() => setError({ element: "", error: "" })}
                />
            }
        </div>
    )
}

export default EditPassword