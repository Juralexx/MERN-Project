import React from 'react'
import { DropdownInput } from '../../../tools/global/Inputs'
import { stateToString } from '../../functions'

const State = ({ state, setState }) => {
    return (
        <div className="row">
            <div className="col-12 col-md-6">
                <p className="title full">État <span>Champ requis</span></p>
                <DropdownInput
                    className="full"
                    type="text"
                    readOnly
                    value={stateToString(state)}
                    onChange={() => { }}
                >
                    {state === "worked on" &&
                        <>
                            <div value="in progress" onClick={() => setState("in progress")}>En cours</div>
                            <div value="done" onClick={() => setState("done")}>Terminé</div>
                        </>
                    }
                    {state === "in progress" &&
                        <>
                            <div value="worked on" onClick={() => setState("worked on")}>En préparation</div>
                            <div value="done" onClick={() => setState("done")}>Terminé</div>
                        </>
                    }
                    {state === "done" &&
                        <>
                            <div value="worked on" onClick={() => setState("worked on")}>En préparation</div>
                            <div value="in progress" onClick={() => setState("in progress")}>En cours</div>
                        </>
                    }
                </DropdownInput>
            </div>
            <div className="col-12 col-md-6">
                <h3>État du projet</h3>
                <p>La catégorie et la sous-catégorie principales permettent à vos contributeurs de trouver votre projet.</p>
            </div>
        </div>
    )
}

export default State