import React, { useRef, useState } from 'react'
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'
import { EndIconButton, StartIconButton } from '../../tools/components/Button'
import { ErrorCard } from '../../tools/components/Error'
import { Textarea } from '../../tools/components/Inputs'

const Description = ({ description, setDescription, error, setError, isErr, setErr, onNext, onBack }) => {
    const errorRef = useRef()
    const checkErr = (name) => { if (isErr === name) return "err" }

    return (
        <div className="add-project-card">
            <h2>Une courte description est le meilleur moyen de vous faire repérer !</h2>
            <div className="flex-card">
                <div className="card-left">
                    <div className="content-form">
                        <p className="title full">Courte description <span>Champ requis</span></p>
                        <Textarea className={`full ${checkErr("description")}`} type="text" placeholder="Courte description du projet" onChange={(e) => setDescription((e.target.value).substring(0, 300))} value={description} />
                        <div className="field-infos full">{description.length} / 300 caractères</div>
                        {isErr === "description" && <ErrorCard useRef={errorRef} display={(isErr === "description").toString()} text={error} />}
                    </div>
                </div>
                <div className="card-right">
                    <h3>Courte description du projet</h3>
                    <p>Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                        Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.</p>
                </div>
            </div>
            <div className="btn-container">
                <StartIconButton text="Retour" className="previous-btn" icon={<IoMdArrowRoundBack />} onClick={onBack} />
                <EndIconButton text="Suivant" className="next-btn right" disabled={description.length < 10 || description.length > 300} icon={<IoMdArrowRoundForward />} onClick={onNext} />
            </div>
        </div>
    )
}

export default Description