import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateEnd } from "../../../../actions/project.action";
import { dateParser } from "../../../Utils";
import { Button, SmallToolsBtn, TextButton } from "../../../tools/components/Button";
import { DatePicker } from "../../../tools/components/Inputs";
import { FaPen } from 'react-icons/fa'

const End = ({ project }) => {
    const [end, setEnd] = useState(project.end)
    const [form, setForm] = useState(false)
    const dispatch = useDispatch()

    const handleEnd = () => {
        dispatch(updateEnd(project._id, end))
        setForm(false)
    }

    return (
        <div className="dashboard-about-content-item">
            <div className="label">Date de fin potentielle</div>
            {!form ? (
                <div className="content">
                    <div className="title">{dateParser(project.end)}</div>
                    <SmallToolsBtn onClick={() => setForm(true)}><FaPen /></SmallToolsBtn>
                </div>
            ) : (
                <div className="content-form">
                    <DatePicker className="mt-2 title-input" placeholder="JJ/MM/AAAA" value={end} selected={end} onSelect={setEnd} />
                    <div className="btn-container">
                        <TextButton text="Annuler" className="mx-2" onClick={() => setForm(false)} />
                        <Button text="Valider" disabled={end === project.end} onClick={handleEnd} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default End;