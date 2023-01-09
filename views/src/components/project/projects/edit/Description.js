import React from 'react'
import { ErrorCard } from '../../../tools/global/Error'
import { Textarea } from '../../../tools/global/Inputs'

const Description = ({ description, setDescription, error, setError }) => {
    const checkErr = name => { if (error.element === name) return "err" }

    return (
        <div className="row">
            <div className="col-12 col-md-6">
                <p className="title full">Courte description du projet <span>Champ requis</span></p>
                <Textarea
                    className={`w-full ${checkErr("description")}`}
                    type="text"
                    placeholder="Courte description du projet"
                    onChange={(e) => setDescription((e.target.value).substring(0, 300))}
                    value={description}
                />
                <div className="field_infos full">{description.length} / 300 caractères</div>
                {error.element === "description" &&
                    <ErrorCard
                        display={error.element === "description"}
                        text={error.error}
                        clean={() => setError({ element: "", error: "" })}
                    />
                }
            </div>
            <div className="col-12 col-md-6">
                <h3>Courte description du projet</h3>
                <p>Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                    Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.</p>
            </div>
        </div>
    )
}

export default Description