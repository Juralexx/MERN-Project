import React, { useRef } from 'react'
import { IoClose } from 'react-icons/io5'
import { ErrorCard } from '../../tools/global/Error'
import { ClassicInput, Textarea } from '../../tools/global/Inputs'

const Description = ({ description, setDescription, tags, setTags, error, setError, isErr, setErr }) => {
    const errorRef = useRef()
    const checkErr = (name) => { if (isErr === name) { return "err" } else return "" }

    const addTag = (event, element) => {
        if (event.key === 'Enter') {
            if (element.length >= 3) {
                let cleanTag = element.replace(/[&#,+()$~%^.|_@°=§µ£¤'"`:*?!;<>[\]{}/\\\\]/g, " ")
                cleanTag = cleanTag.replace(/ +/g, " ")
                cleanTag = cleanTag.trim()
                cleanTag = cleanTag.replace(/ /g, "-")
                if (cleanTag.length >= 3) {
                    if (!tags.some(tag => tag === cleanTag)) {
                        setTags(arr => [...arr, cleanTag])
                        event.target.value = ""
                    } else {
                        setErr("tags")
                        setError("Vous avez déjà ajouté ce tag")
                    }
                } else {
                    setErr("tags")
                    setError("Les tags doivent être composés d'au moins 3 caractères")
                }
            } else {
                setErr("tags")
                setError("Les tags doivent être composés d'au moins 3 caractères")
            }
        } else return
    }

    const removeTag = (element) => {
        setTags(tags.filter(tag => tag !== element))
    }

    return (
        <div className="add-project-card">
            <h2>Courte description et tags</h2>
            <div className="flex-card">
                <div className="card-left">
                    <div className="content-form">
                        <p className="title full">Courte description <span>Champ requis</span></p>
                        <Textarea className={`full ${checkErr("description")}`} type="text" placeholder="Courte description du projet" onChange={e => setDescription((e.target.value).substring(0, 300))} value={description} />
                        <div className="field_infos full">{description.length} / 300 caractères</div>
                        {isErr === "description" && <ErrorCard useRef={errorRef} display={isErr === "description"} text={error} clean={() => setErr("")} />}
                    </div>
                </div>
                <div className="card-right">
                    <h3>Courte description du projet</h3>
                    <p>Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                        Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.</p>
                </div>
            </div>

            <div className="flex-card">
                <div className="card-left">
                    <div className="content-form">
                        <p className="title full">Tags</p>
                        {tags.length > 0 && (
                            <div className="tags-container">
                                {tags.map((element, key) => {
                                    return (
                                        <div className="tag" key={key}>
                                            <span>#</span> {element}
                                            <IoClose onClick={() => removeTag(element)} />
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                        <ClassicInput className={`full ${checkErr("tags")}`} type="text" placeholder="Ajouter des tags" onKeyPress={e => addTag(e, e.target.value)} />
                        <div className="field_infos full">{tags.length} / 12</div>
                        {isErr === "tags" && <ErrorCard useRef={errorRef} display={isErr === "tags"} text={error} clean={() => setErr("")} />}
                    </div>
                </div>
                <div className="card-right">
                    <h3>Tags et référencement</h3>
                    <p>Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                        Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.</p>
                </div>
            </div>
        </div>
    )
}

export default Description