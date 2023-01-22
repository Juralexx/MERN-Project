import React from 'react'
import { Link } from 'react-router-dom'
import NoContent from './NoContent'
import { TextButton } from '../tools/global/Button'
import { dateParser, reverseArray } from '../Utils'
import { MediumAvatar } from '../tools/global/Avatars'
import { convertDeltaToHTML } from '../tools/editor/functions'
import Icon from '../tools/icons/Icon'

const Actualities = ({ project, user }) => {
    return (
        <>
            <h2 className="text-[26px] bold mb-2">Actualités</h2>
            <div className="actuality-container">
                {project.actualities.length > 0 ? (
                    reverseArray(project.actualities).map((element, key) => {
                        return (
                            <div className="actuality-content" key={key}>
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
                                            <div className="date">
                                                {dateParser(element.date)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="actuality-description before">
                                    <p dangerouslySetInnerHTML={convertDeltaToHTML(element.description)}></p>
                                </div>
                                <div className="actuality-btn">
                                    <TextButton className="btn_icon_end">
                                        <Link to={element.urlid + "/" + element.url}>
                                            En savoir plus <Icon name="DoubleArrowRight" />
                                        </Link>
                                    </TextButton>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <NoContent
                        user={user}
                        project={project}
                        icon={<Icon name="Notification" />}
                        mainText="Recevez les news du projet directement dans vos notifications !"
                        text="Suivez le projet pour être tenu au courant de son avancement."
                    />
                )}
            </div>
        </>
    )
}

export default Actualities