import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEnd } from "../../../../actions/project.action";
import { dateParser } from "../../../Utils";
import { RoundedButton, Button } from "../../../tools/components/Button";
import { FaPen } from 'react-icons/fa'
import { BasicInput } from "../../../tools/components/Inputs";

const End = ({project}) => {
    const projectData = useSelector((state) => state.projectReducer)
    const [end, setEnd] = useState(project.end)
    const [updateEndForm, setUpdateEndForm] = useState(false)
    const [value, setValue] = useState(false);
    const [modified, setModified] = useState(false)
    const dispatch = useDispatch()

    const hideEndUpdater = () => { setUpdateEndForm(false) }

    const handleEnd = () => {
        dispatch(updateEnd(project._id, end))
        setUpdateEndForm(false)
        setModified(true)
    }

    const handleChange = (e) => { setValue(true) }

    return (
        <div className="flex items-center justify-between w-full py-5 px-7 border-b border-slate-500 dark:border-slate-100">
            {!updateEndForm ? (
                <>
                    {modified ? ( <p>{dateParser(projectData.state)}</p> ) : ( <p>{dateParser(project.end)}</p> )}
                    <RoundedButton icon={<FaPen className="w-3 h-3" />} color="background_primary" hoverColor="background_primary_x_light" onClick={() => setUpdateEndForm(!updateEndForm)}>Modifier</RoundedButton>

                </>
            ) : (
                <>
                    <BasicInput type="date" value={end} onInput={handleChange} onChange={(e) => setEnd(e.target.value)} />
                    <div className="flex">
                        <Button text="Annuler" onClick={hideEndUpdater}>Annuler</Button>
                        <Button text="Valider" disabled={!value} onClick={handleEnd}>Enregistrer</Button>
                    </div>
                </>
            )}
        </div>
    )
}

export default End;