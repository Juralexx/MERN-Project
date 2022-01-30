import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../../../../actions/project.action";

const State = ({ props, id }) => {
    const projectData = useSelector((state) => state.projectReducer)
    const [state, setState] = useState(props)
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

    const handleClickOutside = (e) => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(e.target)) {
            setDisplaySelection(false);
        }
    }; useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="user-info">
            {!updateStateForm ? (
                <>
                    {modified ? ( <p>{projectData.state}</p> ) : ( <p>{props}</p> )}
                    <div className="btn-container">
                        <button className="btn btn-primary" onClick={() => setUpdateStateForm(!updateStateForm)}>Modifier</button>
                    </div>
                </>
            ) : (
                <>
                    <div ref={wrapperRef}>
                        <input readOnly type="text" name="state" id="state" onClick={() => setDisplaySelection(!displaySelection)} onInput={(e) => setState(e.target.value)} value={state} placeholder={props} />
                        {displaySelection && (
                            <div className="state-selection">
                                {projectData.state === "En préparation" && (
                                    <>
                                        <option value="En cours" onClick={openState}>En cours</option>
                                        <option value="Terminé" onClick={openState}>Terminé</option>
                                    </>
                                )}
                                {projectData.state === "En cours" && (
                                    <>
                                        <option value="En préparation" onClick={openState}>En préparation</option>
                                        <option value="Terminé" onClick={openState}>Terminé</option>
                                    </>
                                )}
                                {projectData.state === "Terminé" && (
                                    <>
                                        <option value="En préparation" onClick={openState}>En préparation</option>
                                        <option value="En cours" onClick={openState}>En cours</option>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="btn-container">
                        <button className="btn btn-primary" onClick={hideStateUpdater}>Annuler</button>
                        <button className="btn btn-primary" disabled={!value} onClick={handleState}>Enregistrer</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default State;