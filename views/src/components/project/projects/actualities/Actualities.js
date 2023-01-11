import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { deleteActuality } from '../../../../actions/project.action'
import { dateParser } from '../../../Utils'
import { convertDeltaToHTML } from '../../../tools/editor/functions'
import { Button, TextButton } from '../../../tools/global/Button'
import Warning from '../../../tools/global/Warning'
import EditActuality from './EditActuality'
import { MediumAvatar } from '../../../tools/global/Avatars'
import Icon from '../../../tools/icons/Icon'

const Actualities = ({ project, isManager }) => {
    const [warning, setWarning] = useState(false)
    const dispatch = useDispatch()

    const deleteActu = element => dispatch(deleteActuality(project._id, element._id))

    return (
        <Routes>
            <Route index element={
                <div className="container-lg py-8">
                    <div className="flex justify-between mb-2">
                        <h2>Actualités</h2>
                    </div>
                    {project.actualities.length > 0 ? (
                        <div className="actuality-container">
                            {project.actualities.map((element, key) => {
                                return (
                                    <div key={key}>
                                        <div className="actuality-content">
                                            <div className="actuality-header">
                                                <div className="actuality-nb">Actu #{project.actualities.length - key}</div>
                                                <h3>{element.title}</h3>
                                                <div className="actuality-infos">
                                                    <MediumAvatar pic={element.posterPicture} />
                                                    <div className="actuality-infos-right">
                                                        <div className="actuality-poster">{element.posterPseudo} <span>{project.posterId === element.posterId ? "Createur" : "Collaborateur"}</span></div>
                                                        <div className="date">{dateParser(element.date)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="actuality-description before" dangerouslySetInnerHTML={convertDeltaToHTML(element.description)}></div>
                                            <div className="actuality-btn">
                                                {isManager &&
                                                    <>
                                                        <TextButton onClick={() => setWarning(true)}>
                                                            Supprimer
                                                        </TextButton>
                                                        <TextButton>
                                                            <Link to={`${element.urlid}/${element.url}/edit`} className="mx-2">Modifier</Link>
                                                        </TextButton>
                                                    </>
                                                }
                                                <Button>
                                                    <Link to={`/project/${project.URLID}/${project.URL}/actuality/${element.urlid}/${element.url}`}>
                                                        Voir
                                                    </Link>
                                                </Button>
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
                    ) : (
                        <div className="no_content actuality_card">
                            <div className="svg_container">
                                <Icon name="BookOpen" />
                            </div>
                            <p>Vous n'avez pas encore ajouté d'actualité.</p>
                            <span>Ajoutez une actualité pour tenir vos visiteurs au courant de l'avancée de votre projet !</span>
                            {isManager &&
                                <Button>
                                    <Link to={`/projects/${project.URLID}/${project.URL}/add-actuality`}>
                                        Ajouter une actualité
                                    </Link>
                                </Button>
                            }
                        </div>
                    )}
                </div>
            } />

            <Route path=":urlid/:url/edit" element={
                isManager ? (
                    <EditActuality
                        project={project}
                    />
                ) : (
                    <Navigate
                        replace
                        to={`/projects/${project.URLID}/${project.URL}/actuality`}
                    />
                )
            } />
        </Routes>
    )
}

export default Actualities