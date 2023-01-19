import React, { useState } from 'react'
import axios from 'axios'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Icon from '../../tools/icons/Icon'
import { Button, TextButton } from '../../tools/global/Button'
import Warning from '../../tools/global/Warning'
import EditActuality from './EditActuality'
import { MediumAvatar } from '../../tools/global/Avatars'
import { convertDeltaToHTML } from '../../tools/editor/functions'
import { dateParser, reverseArray } from '../../Utils'
import Actuality from './Actuality'

const Actualities = ({ project, user, isManager, websocket }) => {
    const [warning, setWarning] = useState(-1)

    const deleteActu = async (element) => {
        const activity = {
            type: "delete-actuality",
            who: user.pseudo,
            actuality: element.title,
            date: new Date().toISOString()
        }
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/${project._id}/actualities/${element._id}/delete/`,
            data: {
                activity: activity
            }
        })
            .then(() => {
                project.members.map(member => {
                    return websocket.current.emit("deleteActuality", {
                        receiverId: member._id,
                        actuality: element,
                        activity: activity
                    })
                })
            })
            .catch(err => console.log(err))
    }

    return (
        <Routes>
            <Route index element={
                <div className="container-lg py-8">
                    <div className="flex justify-between mb-2">
                        <h2>Actualités</h2>
                    </div>
                    {project.actualities.length > 0 ? (
                        <div className="actuality-container">
                            {reverseArray(project.actualities).map((element, key) => {
                                return (
                                    <div key={key}>
                                        <div className="actuality-content">
                                            <div className="actuality-header">
                                                <div className="actuality-nb">
                                                    Actu #{project.actualities.length - key}
                                                </div>
                                                <h3>{element.title}</h3>
                                                <div className="actuality-infos">
                                                    <MediumAvatar pic={element.poster.picture} />
                                                    <div className="actuality-infos-right">
                                                        <div className="actuality-poster">
                                                            {element.poster.pseudo} <span>{project.poster._id === element.poster._id ? "Createur" : "Collaborateur"}</span>
                                                        </div>
                                                        <div className="date">{dateParser(element.date)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="actuality-description before" dangerouslySetInnerHTML={convertDeltaToHTML(element.description)}></div>
                                            <div className="actuality-btn">
                                                {isManager &&
                                                    <>
                                                        <TextButton onClick={() => setWarning(key)}>
                                                            Supprimer
                                                        </TextButton>
                                                        <TextButton>
                                                            <Link to={`${element.urlid}/${element.url}/edit`} className="mx-2">Modifier</Link>
                                                        </TextButton>
                                                    </>
                                                }
                                                <Button>
                                                    <Link to={`/projects/${project.URLID}/${project.URL}/actuality/${element.urlid}/${element.url}`}>
                                                        Voir
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                        <Warning
                                            open={warning === key}
                                            setOpen={setWarning}
                                            title="Etes-vous sur de vouloir supprimer cette actualité ?"
                                            text="Votre actualité sera définitivement supprimée."
                                            validateBtn="Supprimer"
                                            className="delete"
                                            onValidate={() => {
                                                deleteActu(element)
                                                setWarning(-1)
                                            }}
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

            <Route path=":urlid/:url/" element={
                <Actuality
                    project={project}
                    user={user}
                    isManager={isManager}
                />
            } />
            <Route path=":urlid/:url/edit" element={
                isManager ? (
                    <EditActuality
                        project={project}
                        user={user}
                        websocket={websocket}
                    />
                ) : (
                    <Navigate
                        replace
                        to={`/projects/${project.URLID}/${project.URL}/actuality`}
                    />
                )
            } />
            <Route
                path="*"
                element={<Navigate
                    replace
                    to={`/projects/${project.URLID}/${project.URL}/actuality`}
                />}
            />

        </Routes>
    )
}

export default Actualities