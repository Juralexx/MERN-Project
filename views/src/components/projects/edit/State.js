import React from 'react'
import { DropdownInput } from '../../tools/global/Inputs'
import { stateToString } from '../functions'

const State = ({ state, setDatas }) => {
    return (
        <div className="row">
            <div className="col-12 col-lg-6">
                <h3>État du projet</h3>
                <p>La catégorie et la sous-catégorie principales permettent à vos contributeurs de trouver votre projet.</p>
            </div>
            <div className="col-12 col-lg-6">
                <div className="title full">État <span>Champ requis</span></div>
                <DropdownInput
                    className="full"
                    type="text"
                    readOnly
                    value={stateToString(state)}
                    onChange={() => { }}
                >
                    {state === "worked on" &&
                        <>
                            <div
                                onClick={() => setDatas(data => ({ ...data, state: "in progress" }))}
                            >
                                En cours
                            </div>
                            <div
                                onClick={() => setDatas(data => ({ ...data, state: "done" }))}
                            >
                                Terminé
                            </div>
                        </>
                    }
                    {state === "in progress" &&
                        <>
                            <div
                                onClick={() => setDatas(data => ({ ...data, state: "worked on" }))}
                            >
                                En préparation
                            </div>
                            <div
                                onClick={() => setDatas(data => ({ ...data, state: "done" }))}
                            >
                                Terminé
                            </div>
                        </>
                    }
                    {state === "done" &&
                        <>
                            <div
                                onClick={() => setDatas(data => ({ ...data, state: "worked on" }))}
                            >
                                En préparation
                            </div>
                            <div
                                onClick={() => setDatas(data => ({ ...data, state: "in progress" }))}
                            >
                                En cours
                            </div>
                        </>
                    }
                </DropdownInput>
            </div>
        </div>
    )
}

export default State