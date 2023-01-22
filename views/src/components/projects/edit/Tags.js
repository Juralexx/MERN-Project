import React from 'react'
import { ErrorCard } from '../../tools/global/ErrorCard'
import { ClassicInput } from '../../tools/global/Inputs'
import Icon from '../../tools/icons/Icon'
import { addClass } from '../../Utils'

const Tags = ({ tags, setDatas, error, setError }) => {

    const addTag = (event, element) => {
        if (event.key === 'Enter') {
            if (element.length >= 3) {
                if (tags.length < 12) {
                    let cleanTag = element.replace(/[&#,+()$~%^.|_@°=§µ£¤'"`:*?!;<>[\]{}/\\\\]/g, " ")
                    cleanTag = cleanTag.replace(/ +/g, " ")
                    cleanTag = cleanTag.trim()
                    cleanTag = cleanTag.replace(/ /g, "-")
                    if (cleanTag.length >= 3) {
                        if (!tags.some(tag => tag === cleanTag)) {
                            setDatas(data => ({ ...data, tags: [...data.tags, cleanTag] }))
                            event.target.value = ""
                        } else setError({ element: "tags", error: "Vous avez déjà ajouté ce tag" })
                    } else setError({ element: "tags", error: "Les tags doivent être composés d'au moins 3 caractères" })
                } else setError({ element: "tags", error: "Vous ne pouvez pas ajouter plus de 12 tags" })
            } else setError({ element: "tags", error: "Les tags doivent être composés d'au moins 3 caractères" })
        } else return
    }

    const removeTag = (element) => setDatas(data => ({ ...data, tags: tags.filter(tag => tag !== element) }))

    return (

        <div className="row">
            <div className="col-12 col-lg-6">
                <h3>Tags et référencement</h3>
                <p>
                    Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                    Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.
                </p>
            </div>
            <div className="col-12 col-lg-6">
                <div className="title full">Tags</div>
                {tags.length > 0 &&
                    <div className="project-tags !pt-0">
                        {tags.map((element, key) => {
                            return (
                                <div className="tag" key={key}>
                                    <span>#</span> {element}
                                    <Icon name="Cross" onClick={() => removeTag(element)} />
                                </div>
                            )
                        })}
                    </div>
                }
                <ClassicInput
                    className={`full ${addClass(error.element === "tags", 'err')}`}
                    type="text"
                    placeholder="Ajouter des tags"
                    onKeyPress={e => addTag(e, e.target.value)}
                />
                <div className="field_infos full">{tags.length} / 12</div>
                <ErrorCard
                    display={error.element === "tags"}
                    text={error.error}
                    clean={() => setError({ element: "", error: "" })}
                />
            </div>
        </div>
    )
}

export default Tags