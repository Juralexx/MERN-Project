import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEnd } from "../../../../actions/project.action";
import { dateParser } from "../../../Utils";

const End = ({props, id}) => {
    const projectData = useSelector((state) => state.projectReducer)
    const [end, setEnd] = useState(props)
    const [updateEndForm, setUpdateEndForm] = useState(false)
    const [value, setValue] = useState(false);
    const [modified, setModified] = useState(false)
    const dispatch = useDispatch()

    const hideEndUpdater = () => { setUpdateEndForm(false) }

    const handleEnd = () => {
        dispatch(updateEnd(id, end))
        setUpdateEndForm(false)
        setModified(true)
    }

    const handleChange = (e) => { setValue(true) }

    return (
        <div className="user-info">
            {!updateEndForm ? (
                <>
                    {modified ? ( <p>{dateParser(projectData.state)}</p> ) : ( <p>{dateParser(props)}</p> )}
                    <div className="btn-container">
                        {/* <button className="btn btn-primary" onClick={handleBioDelete}>Supprimer</button> */}
                        <button className="btn btn-primary" onClick={() => setUpdateEndForm(!updateEndForm)}>Modifier</button>
                    </div>
                </>
            ) : (
                <>
                    <input type="date" name="end" id="end" onInput={handleChange} onChange={(e) => setEnd(e.target.value)} defaultValue={end} placeholder={props}/>
                    <div className="btn-container">
                        <button className="btn btn-primary" onClick={hideEndUpdater}>Annuler</button>
                        <button className="btn btn-primary" disabled={!value} onClick={handleEnd}>Enregistrer</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default End;