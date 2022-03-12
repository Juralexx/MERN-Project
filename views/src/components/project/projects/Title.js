import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTitle, updateTitleURL } from "../../../actions/project.action";
import { RoundedButton, Button } from "../../tools/components/Button";
import { removeAccents } from "../../Utils";
import { FaPen } from 'react-icons/fa'
import { BasicInput } from "../../tools/components/Inputs";

const Title = ({ project }) => {
    const projectData = useSelector((state) => state.projectReducer)
    const [title, setTitle] = useState("")
    const [openForm, setOpenForm] = useState(false)
    const [value, setValue] = useState(false)
    const [modified, setModified] = useState(false)
    const dispatch = useDispatch()

    const hideTitleUpdater = () => { setOpenForm(false) }
    const handleChange = () => { setValue(true) }

    const handleTitle = () => {
        const tolower = title.toLowerCase();
        const uppercase = tolower.charAt(0).toUpperCase() + tolower.slice(1);
        const deletechars = uppercase.replace(/[&#,+()$~%.'":*?!<>{}/\\\\]/g, " ")
        const deletespaces = deletechars.replace(/ +/g, " ")
        const newTitle = deletespaces.trim()
        setTitle(newTitle)

        const lowerTitle = newTitle.toLowerCase();
        const removeaccent = removeAccents(lowerTitle)
        const url = removeaccent.replace(/ /g, "-")

        dispatch(updateTitle(project._id, title))
        dispatch(updateTitleURL(project._id, url))
        setOpenForm(false)
        setModified(true)
    }

    return (
        <div className="flex items-center justify-between w-full py-5 px-7 border-b border-slate-500 dark:border-slate-100">
            {!openForm ? (
                <>
                    {modified ? (
                        <p className="text-xs">{projectData.title}</p>
                    ) : (
                        <p className="text-sm">{project.title}</p>
                    )}
                    <RoundedButton icon={<FaPen className="w-3 h-3" />} color="background_primary" hoverColor="background_primary_x_light" onClick={() => setOpenForm(!openForm)}>Modifier</RoundedButton>
                </>
            ) : (
                <>
                    <BasicInput type="text" defaultValue={project.title} onInput={handleChange} onChange={(e) => setTitle(e.target.value)} />
                    <div className="flex">
                        <Button text="Annuler" onClick={hideTitleUpdater}>Annuler</Button>
                        <Button text="Valider" disabled={!value} onClick={handleTitle}>Enregistrer</Button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Title;