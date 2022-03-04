import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateTitle, updateTitleURL } from "../../../../actions/project.action";
import Loader from "../../../tools/components/Loader";
import { removeAccents } from "../../../Utils";

const Title = ({ props, id }) => {
    const projectData = useSelector((state) => state.projectReducer)
    const [title, setTitle] = useState("")
    const [updateTitleForm, setUpdateTitleForm] = useState(false)
    const [value, setValue] = useState(false)
    const [modified, setModified] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [titleUrl, setTitleUrl] = useState()
    const [isLoading, setLoading] = useState(false)

    const hideTitleUpdater = () => { setUpdateTitleForm(false) }

    const handleTitle = () => {
        const tolower = title.toLowerCase();
        const uppercase = tolower.charAt(0).toUpperCase() + tolower.slice(1);
        const deletechars = uppercase.replace(/[&#,+()$~%.'":*?!<>{}/\\\\]/g, " ");
        const deletespaces = deletechars.replace(/ +/g, " ");
        const newTitle = deletespaces.trim();
        setTitle(newTitle);

        const lowerTitle = newTitle.toLowerCase();
        const removeaccent = removeAccents(lowerTitle)
        const url = removeaccent.replace(/ /g, "-");
        setTitleUrl(url)

        dispatch(updateTitle(id, title))
        dispatch(updateTitleURL(id, url))
        setUpdateTitleForm(false)
        setModified(true)
        setLoading(true)
    }

    useEffect(() => {
        if (modified) {
            const redirection = setInterval(() => {
                navigate(`/project/${titleUrl}`)
            }, 2000)

            return () => {
                clearInterval(redirection)
                setModified(false)
                setLoading(false)
            }
        }
    }, [modified, titleUrl, navigate]);

    const handleChange = () => { setValue(true) }

    return (
        <div className="user-info">
            {!updateTitleForm ? (
                <>
                    {isLoading && <Loader />}
                    {modified ? (
                        <h1>{projectData.title}</h1>
                    ) : (
                        <h1>{props}</h1>
                    )}
                    <div className="btn-container">
                        {/* <button className="btn btn-primary" onClick={handleBioDelete}>Supprimer</button> */}
                        <button className="btn btn-primary" onClick={() => setUpdateTitleForm(!updateTitleForm)}>Modifier</button>
                    </div>
                </>
            ) : (
                <>
                    <input type="text" defaultValue={props} onInput={handleChange} onChange={(e) => setTitle(e.target.value)} />
                    <div className="btn-container">
                        <button className="btn btn-primary" onClick={hideTitleUpdater}>Annuler</button>
                        <button className="btn btn-primary" disabled={!value} onClick={handleTitle}>Enregistrer</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Title;