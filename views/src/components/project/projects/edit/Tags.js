import React, { useRef } from 'react'
import { IoClose } from 'react-icons/io5'
import { ErrorCard } from '../../../tools/components/Error'
import { ClassicInput } from '../../../tools/components/Inputs'

const Tags = ({ tags, setTags, error, setError, isErr, setErr }) => {
    const errorRef = useRef()
    const checkErr = (name) => { if (isErr === name) { return "err" } else return "" }

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
                    setError("Vous ne pouvez pas ajouter plus de 12 tags")
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
        <div className="content-form">
            <p className="title full">Tags</p>
            {tags.length > 0 && (
                <div className="tags-container">
                    {tags.map((element, key) => {
                        return (
                            <div className="tags" key={key}>
                                <p>{"#" + element}</p>
                                <IoClose onClick={() => removeTag(element)} />
                            </div>
                        )
                    })}
                </div>
            )}
            <ClassicInput className={`full ${checkErr("tags")}`} type="text" placeholder="Ajouter des tags" onKeyPress={e => addTag(e, e.target.value)} />
            <div className="field-infos full">{tags.length} / 12</div>
            {isErr === "tags" && <ErrorCard useRef={errorRef} display={isErr === "tags"} text={error} clean={() => setErr("")} />}
        </div>
    )
}

export default Tags