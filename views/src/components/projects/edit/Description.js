import React from 'react'
import { ErrorCard } from '../../tools/global/ErrorCard'
import { Textarea } from '../../tools/global/Inputs'
import { addClass } from '../../Utils'

const Description = ({ description, setDatas, error, setError }) => {
    return (
        <div className="row">
            <div className="col-12 col-lg-6">
                <h3>Courte description du projet</h3>
                <p>
                    Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                    Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.
                </p>
            </div>
            <div className="col-12 col-lg-6">
                <div className="title full">Courte description du projet <span>Champ requis</span></div>
                <Textarea
                    className={`w-full ${addClass(error.element === "description", "err")}`}
                    type="text"
                    placeholder="Courte description du projet"
                    onChange={(e) => setDatas(data => ({ ...data, description: (e.target.value).substring(0, 300) }))}
                    value={description}
                />
                <div className="field_infos full">{description.length} / 300</div>
                <ErrorCard
                    display={error.element === "description"}
                    text={error.error}
                    clean={() => setError({ element: "", error: "" })}
                />
            </div>
        </div>
    )
}

export default Description