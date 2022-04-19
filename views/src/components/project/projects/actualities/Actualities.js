import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'
import { deleteActuality } from '../../../../actions/project.action'
import { convertDeltaToHTML } from '../../../tools/functions/function'
import { dateParser } from '../../../Utils'
import { Button, EndIconButton } from '../../../tools/components/Button'
import Warning from '../../../tools/components/Warning'
import EditActuality from './EditActuality'
import { MdArrowForward } from 'react-icons/md'
import { BigAvatar } from '../../../tools/components/Avatars'

const Actualities = ({ project }) => {
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
                                            <div className="actuality-header">
                                                <div className="actuality-nb">Actu #{project.actualities.length - key}</div>
                                                <h3>{element.title}</h3>
                                                <div className="actuality-infos">
                                                    <BigAvatar pic={element.posterPicture} />
                                                    <div className="actuality-infos-right">
                                                        <div className="actuality-poster">{element.posterPseudo} <span>{project.posterId === element.posterId ? "Createur" : "Collaborateur"}</span></div>
                                                        <div className="date">{dateParser(element.date)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="actuality-img"><img src={element.pictures[0]} alt={element.title} /></div> */}
                                            <div className="actuality-description before">
                                                <p dangerouslySetInnerHTML={convertDeltaToHTML(element.description)}></p>
                                            </div>
                                            <div className="btn-container">
                                                <Link to={`/project/${project.URLID}/${project.URL}/actuality/${element.urlid}/${element.url}`}><EndIconButton icon={<MdArrowForward />} text="Voir" /></Link>
                                                <Link to={`${element.urlid}/${element.url}/edit`} className="mx-2"><Button text="Modifier"></Button></Link>
                                                <Button text="Supprimer" onClick={() => setWarning(true)} />
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

            <Route path=":urlid/:url/edit" element={
                <EditActuality
                    project={project}
                />
            } />
        </Routes>
    )
}

export default Actualities