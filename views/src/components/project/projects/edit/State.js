import React, { useRef, useState } from 'react'
import { stateToString } from '../../../home/functions'
import { DropdownInput } from '../../../tools/components/Inputs'
import { useClickOutside } from '../../../tools/functions/useClickOutside'

const State = ({ state, setState }) => {
    const [display, setDisplay] = useState(false)
    const wrapperRef = useRef()
    useClickOutside(wrapperRef, setDisplay, false)

    return (
        <>
            <div className="content-form">
                <p className="title full">État <span>Champ requis</span></p>
                <DropdownInput className="full" useRef={wrapperRef} readOnly value={stateToString(state)} open={display} onClick={() => setDisplay(!display)}>
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
            </div>
        </>
    )
}

export default State