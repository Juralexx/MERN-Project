import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../../../../actions/project.action";
import { useClickOutside } from "../../../tools/functions/useClickOutside";
import { RoundedButton, Button } from "../../../tools/components/Button";
import { FaPen } from 'react-icons/fa'
import { BasicInput } from "../../../tools/components/Inputs";

const State = ({ project, id }) => {
    const projectData = useSelector((state) => state.projectReducer)
    const [state, setState] = useState(project.state)
    const [updateStateForm, setUpdateStateForm] = useState(false)
    const [value, setValue] = useState(false)
    const dispatch = useDispatch()
    const wrapperRef = useRef()
    const [displaySelection, setDisplaySelection] = useState(false)
    const [modified, setModified] = useState(false)

    const hideStateUpdater = () => { setUpdateStateForm(false) }

    const handleState = () => {
        dispatch(updateState(id, state))
        setUpdateStateForm(false)
        setModified(true)
    }

    const openState = (e) => {
        setValue(true)
        setState(e.target.value)
        setDisplaySelection(false)
    }

    useClickOutside(wrapperRef, setDisplaySelection, false)

    return (
        <div className="flex items-center justify-between w-full py-5 px-7 border-b border-slate-500 dark:border-b-slate-300/30">
            {!updateStateForm ? (
                <>
                    {modified ? (<p>{projectData.state}</p>) : (<p>{project.state}</p>)}
                    <RoundedButton icon={<FaPen className="w-3 h-3" />} color="background_primary" hoverColor="background_primary_x_light" onClick={() => setUpdateStateForm(!updateStateForm)}>Modifier</RoundedButton>

                </>
            ) : (
                <>
                    <div ref={wrapperRef}>
                        <BasicInput readOnly type="text" value={state} onClick={() => setDisplaySelection(!displaySelection)} onInput={(e) => setState(e.target.value)} />
                        {displaySelection && (
                            <div className="state-selection">
                                {state === "En préparation" && (
                                    <>
                                        <option value="En cours" onClick={openState}>En cours</option>
                                        <option value="Terminé" onClick={openState}>Terminé</option>
                                    </>
                                )}
                                {state === "En cours" && (
                                    <>
                                        <option value="En préparation" onClick={openState}>En préparation</option>
                                        <option value="Terminé" onClick={openState}>Terminé</option>
                                    </>
                                )}
                                {state === "Terminé" && (
                                    <>
                                        <option value="En préparation" onClick={openState}>En préparation</option>
                                        <option value="En cours" onClick={openState}>En cours</option>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="flex">
                        <Button text="Annuler" onClick={hideStateUpdater}>Annuler</Button>
                        <Button text="Valider" disabled={!value} onClick={handleState}>Enregistrer</Button>
                    </div>
                </>
            )}
        </div>
    )
}

export default State;