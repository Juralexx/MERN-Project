import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { deleteBio } from "../../../../../actions/user.action.delete";
// import Swal from "sweetalert2";
import { updateTitle, updateTitleURL } from "../../../../actions/project.action";
import { removeAccents } from "../../../Utils";

const Title = ({props, id}) => {
    const [title, setTitle] = useState("")
    const [updateTitleForm, setUpdateTitleForm] = useState(false)
    const [value, setValue] = React.useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
        const titleURL = url
        
        dispatch(updateTitle(id, title))
        dispatch(updateTitleURL(id, titleURL))
        setUpdateTitleForm(false)
        navigate(`/project/${titleURL}`)
    }

    const handleChange = (e) => { setValue(e.target.value) }

    return (
        <div className="user-info">
            {!updateTitleForm ? (
                <>
                    <h1>{props}</h1>
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