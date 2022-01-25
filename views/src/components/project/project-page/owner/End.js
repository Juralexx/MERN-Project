import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateEnd } from "../../../../actions/project.action";
import { dateParser } from "../../../Utils";

const End = ({props, id}) => {
    const [end, setEnd] = useState(props)
    const [updateEndForm, setUpdateEndForm] = useState(false)
    const [value, setValue] = React.useState("");
    const dispatch = useDispatch()

    const hideEndUpdater = () => { setUpdateEndForm(false) }

    const handleEnd = () => {
        dispatch(updateEnd(id, end))
        setUpdateEndForm(false)
    }

    const handleChange = (e) => { setValue(e.target.value) }

    return (
        <div className="user-info">
            {!updateEndForm ? (
                <>
                    <p>{dateParser(props)}</p>
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