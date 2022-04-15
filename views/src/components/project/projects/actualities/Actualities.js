import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'
import { deleteActuality } from '../../../../actions/project.action'
import { convertDeltaToHTML } from '../../../tools/functions/function'
import { dateParser } from '../../../Utils'
import { Button } from '../../../tools/components/Button'
import Warning from '../../../tools/components/Warning'
import EditActuality from './EditActuality'

const Actualities = ({ project, user }) => {
    const [warning, setWarning] = useState(false)
    const dispatch = useDispatch()

    const deleteActu = (element) => {
        dispatch(deleteActuality(project._id, element._id))
    }

    return (
        <Routes>
            <Route index element={
                <div className="content-container">
                    <div className="content-box">
                        <div className="header flex justify-between mb-5">
                            <h2>Actualités</h2>
                        </div>
                        <div className="actuality-container">
                            {project.actualities.map((element, key) => {
                                return (
                                    <div key={key}>
                                        <div className="actuality-content">
                                            <div className="actuality-img"><img src={element.pictures[0]} alt={element.title} /></div>
                                            <div className="actuality-description">
                                                <h3>{element.title}</h3>
                                                <div className="date">{dateParser(element.date)}</div>
                                                <p className="description" dangerouslySetInnerHTML={convertDeltaToHTML(element.description)}></p>
                                                <div className="btn-container">
                                                    <Button text="Voir" />
                                                    <Link to={`${element.url}/edit`} className="mx-2"><Button text="Modifier"></Button></Link>
                                                    <Button text="Supprimer" onClick={() => setWarning(true)} />
                                                </div>
                                            </div>
                                        </div>
                                        <Warning
                                            open={warning}
                                            setOpen={setWarning}
                                            title="Etes-vous sur de vouloir supprimer cette actualité ?"
                                            text="Votre actualité sera définitivement supprimée"
                                            onValidate={() => { deleteActu(element); setWarning(false) }}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            } />

            <Route path=":url/edit" element={
                <EditActuality
                    project={project}
                />
            } />
        </Routes>
    )
}

export default Actualities