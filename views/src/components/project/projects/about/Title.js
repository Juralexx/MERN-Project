import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateTitle, updateTitleURL } from "../../../../actions/project.action";
import { SmallToolsBtn, Button, TextButton } from "../../../tools/components/Button";
import { removeAccents } from "../../../Utils";
import { FaPen } from 'react-icons/fa'
import { ClassicInput } from "../../../tools/components/Inputs";
import { ErrorCard } from "../../../tools/components/Error";

const Title = ({ project }) => {
    const [title, setTitle] = useState(project.title)
    const [form, setForm] = useState(false)
    const [error, setError] = useState("")
    const [isErr, setErr] = useState(false)
    const errorRef = useRef()
    const dispatch = useDispatch()

    const handleTitle = () => {
        if (title.length < 10 || title.length > 80) {
            setErr(true)
            return setError("Le titre de votre projet doit faire entre 10 et 80 charactères...")
        } else if (title === project.title) {
            setErr(true)
            return setError("Le titre de votre projet n'a pas changé...")
        } else {
            let newTitle = title.toLowerCase();
            newTitle = newTitle.charAt(0).toUpperCase() + newTitle.slice(1);
            newTitle = newTitle.replace(/[&#,+()$~%.'":*?!<>{}/\\\\]/g, " ")
            newTitle = newTitle.replace(/ +/g, " ")
            newTitle = newTitle.trim()
            setTitle(newTitle)

            let url = newTitle.toLowerCase();
            url = removeAccents(url)
            url = url.replace(/ /g, "-")

            dispatch(updateTitle(project._id, newTitle))
            dispatch(updateTitleURL(project._id, url))
            setForm(false)
            setErr(false)
        }
    }

    return (
        <div className="dashboard-about-content-item">
            <div className="label">Titre</div>
            {!form ? (
                <div className="content">
                    <div className="title">{project.title}</div>
                    <SmallToolsBtn onClick={() => setForm(true)}><FaPen /></SmallToolsBtn>
                </div>
            ) : (
                <>
                    <div className="content-form">
                        <ClassicInput className="title-input" type="text" defaultValue={project.title} onChange={(e) => setTitle(e.target.value)} />
                        <div className="btn-container">
                            <TextButton text="Annuler" className="mx-2" onClick={() => { setForm(false); setErr(false) }} />
                            <Button text="Valider" disabled={title === project.title} onClick={handleTitle} />
                        </div>
                    </div>
                    <ErrorCard useRef={errorRef} show={isErr} text={error} />
                </>
            )}
        </div>
    )
}

export default Title;