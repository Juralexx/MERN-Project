import React, { useState } from 'react'
import { ErrorCard } from '../tools/global/ErrorCard'
import { IconInput } from '../tools/global/Inputs'
import Icon from '../tools/icons/Icon'
import { addClass } from '../Utils'

const EditPassword = ({ password, setPassword, error, setError }) => {
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
                className={`full mb-6 ${addClass(error.element === "password", 'err')}`}
                type={passwordShown.includes(1) ? "text" : "password"}
                placeholder="Ancien mot de passe..."
                value={password.password}
                onChange={(e) => setPassword(datas => ({ ...datas, password: e.target.value }))}
                endIcon={passwordShown.includes(1) ? <Icon name="Hidden" /> : <Icon name="Visible" />}
                endIconClick={() => showPassword(1)}
            />
            <ErrorCard
                display={error.element === "password"}
                text={error.error}
                clean={() => setError({ element: "", error: "" })}
            />

            <p className="txt-ter mb-1">Nouveau mot de passe</p>
            <IconInput
                className={`full mb-6 ${addClass(error.element === "new-password", 'err')}`}
                type={passwordShown.includes(2) ? "text" : "password"}
                placeholder="Nouveau mot de passe..."
                value={password.newPassword}
                onChange={e => setPassword(datas => ({ ...datas, password: e.target.value }))}
                endIcon={passwordShown.includes(2) ? <Icon name="Hidden" /> : <Icon name="Visible" />}
                endIconClick={() => showPassword(2)}
            />
            <ErrorCard
                display={error.element === "new-password"}
                text={error.error}
                clean={() => setError({ element: "", error: "" })}
            />

            <p className="txt-ter mb-1">Confirmation nouveau mot de passe</p>
            <IconInput
                className={`full ${addClass(error.element === "confirmed-new-password", 'err')}`}
                type={passwordShown.includes(3) ? "text" : "password"}
                placeholder="Confirmation nouveau mot de passe..."
                value={password.confirmedNewPassword}
                onChange={(e) => setPassword(datas => ({ ...datas, confirmedNewPassword: e.target.value }))}
                endIcon={passwordShown.includes(3) ? <Icon name="Hidden" /> : <Icon name="Visible" />}
                endIconClick={() => showPassword(3)}
            />
            <ErrorCard
                display={error.element === "confirmed-new-password"}
                text={error.error}
                clean={() => setError({ element: "", error: "" })}
            />
        </div>
    )
}

export default EditPassword