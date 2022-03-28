import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateState } from "../../../../actions/project.action";
import { useClickOutside } from "../../../tools/functions/useClickOutside";
import { Button, SmallToolsBtn, TextButton } from "../../../tools/components/Button";
import { FaPen } from 'react-icons/fa'
import { DropdownInput } from "../../../tools/components/Inputs";
import { stateToString } from "../../../tools/functions/function";

const State = ({ project }) => {
    const [state, setState] = useState(project.state)
    const [form, setForm] = useState(false)
    const [display, setDisplay] = useState(false)
    const wrapperRef = useRef()
    useClickOutside(wrapperRef, setDisplay, false)
    const dispatch = useDispatch()

    const handleState = () => {
        dispatch(updateState(project._id, state))
        setForm(false)
    }

    return (
        <div className="dashboard-about-content-item">
            <div className="label">État</div>
            {!form ? (
                <div className="content">
                    <div className="title">{stateToString(project.state)}</div>
                    <SmallToolsBtn onClick={() => setForm(true)}><FaPen /></SmallToolsBtn>
                </div>
            ) : (
                <div className="content-form">
                    <DropdownInput useRef={wrapperRef} readOnly placeholder="Filtrer" value={stateToString(state)} open={display} onClick={() => setDisplay(!display)}>
                        {state === "worked on" &&
                            <>
                                <div value="in progress" onClick={() => { setState("in progress"); setDisplay(false) }}>En cours</div>
                                <div value="done" onClick={() => { setState("done"); setDisplay(false) }}>Terminé</div>
                            </>
                        }
                        {state === "in progress" &&
                            <>
                                <div value="worked on" onClick={() => { setState("worked on"); setDisplay(false) }}>En préparation</div>
                                <div value="done" onClick={() => { setState("done"); setDisplay(false) }}>Terminé</div>
                            </>
                        }
                        {state === "done" &&
                            <>
                                <div value="worked on" onClick={() => { setState("worked on"); setDisplay(false) }}>En préparation</div>
                                <div value="in progress" onClick={() => { setState("in progress"); setDisplay(false) }}>En cours</div>
                            </>
                        }
                    </DropdownInput>
                    <div className="btn-container">
                        <TextButton text="Annuler" className="mx-2" onClick={() => setForm(false)} />
                        <Button text="Valider" disabled={state === project.state} onClick={handleState} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default State;