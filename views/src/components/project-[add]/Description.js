import React from 'react'
import { ErrorCard } from '../tools/global/Error'
import { ClassicInput, Textarea } from '../tools/global/Inputs'
import Icon from '../tools/icons/Icon'
import { addClass } from '../Utils'

const Description = ({ datas, setDatas, error, setError }) => {

    const addTag = (event, element) => {
        if (event.key === 'Enter') {
            if (element.length >= 3) {
                let cleanTag = element.replace(/[&#,+()$~%^.|_@°=§µ£¤'"`:*?!;<>[\]{}/\\\\]/g, " ")
                cleanTag = cleanTag.replace(/ +/g, " ")
                cleanTag = cleanTag.trim()
                cleanTag = cleanTag.replace(/ /g, "-")
                if (cleanTag.length >= 3) {
                    if (!datas.tags.some(tag => tag === cleanTag)) {
                        setDatas(data => ({ ...data, tags: [...datas.tags, cleanTag] }))
                        event.target.value = ""
                    } else {
                        setError({
                            element: "tags",
                            error: "Vous avez déjà ajouté ce tag"
                        })
                    }
                } else {
                    setError({
                        element: "tags",
                        error: "Les tags doivent être composés d'au moins 3 caractères"
                    })
                }
            } else {
                setError({
                    element: "tags",
                    error: "Les tags doivent être composés d'au moins 3 caractères"
                })
            }
        } else return
    }

    const removeTag = (element) => {
        setDatas(data => ({ ...data, tags: datas.tags.filter(tag => tag !== element) }))
    }

    return (
        <div className="add-project-card">
            <h2>Courte description et tags</h2>
            <div className="row py-4">
                <div className="col-12 col-lg-6 flex flex-col justify-center">
                    <h3>Courte description du projet</h3>
                    <p>
                        Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                        Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.
                    </p>
                </div>
                <div className="col-12 col-lg-6 flex flex-col justify-center">
                    <p className="title full">Courte description <span>Champ requis</span></p>
                    <Textarea
                        className={`w-full ${addClass(error.element === "description", 'err')}`}
                        type="text"
                        placeholder="Courte description du projet"
                        value={datas.description}
                        onChange={e => setDatas(data => ({ ...data, description: (e.target.value).substring(0, 300) }))}
                    />
                    <div className="field_infos full">{datas.description.length} / 300 caractères</div>
                    {error.element === "description" &&
                        <ErrorCard
                            display={error.element === "description"}
                            text={error.error}
                            clean={() => setError({ element: "", error: "" })}
                        />
                    }
                </div>
            </div>

            <div className="row py-4">
                <div className="col-12 col-lg-6 flex flex-col justify-center">
                    <h3>Tags et référencement</h3>
                    <p>
                        Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                        Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.
                    </p>
                </div>
                <div className="col-12 col-lg-6 flex flex-col justify-center">
                    <p className="title full">Tags</p>
                    {datas.tags.length > 0 && (
                        <div className="tags-container">
                            {datas.tags.map((element, key) => {
                                return (
                                    <div className="tag" key={key}>
                                        <span>#</span> {element}
                                        <Icon name="Cross" onClick={() => removeTag(element)} />
                                    </div>
                                )
                            })}
                        </div>
                    )}
                    <ClassicInput
                        className={`full ${addClass(error.element === "tags", 'err')}`}
                        type="text"
                        placeholder="Ajouter des tags"
                        onKeyPress={e => addTag(e, e.target.value)}
                    />
                    <div className="field_infos full">{datas.tags.length} / 12</div>
                    {error.element === "tags" &&
                        <ErrorCard
                            display={error.element === "tags"}
                            text={error.error}
                            clean={() => setError({ element: "", error: "" })}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default Description