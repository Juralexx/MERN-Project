import React from 'react'
import { Link } from 'react-router-dom'
import NoContent from './NoContent'
import { Button } from '../../tools/global/Button'
import { dateParser, reverseArray } from '../../Utils'
import { BigAvatar } from '../../tools/global/Avatars'
import { convertDeltaToHTML } from '../../tools/editor/functions'
import { MdArrowForward, MdOutlineNotificationsActive } from 'react-icons/md'

const Actualities = ({ project, user }) => {

    return (
        <>
            <h2 className="text-[26px] bold mb-8">Actualités</h2>
            <div className="actuality-container">
                {project.actualities.length > 0 ? (
                    reverseArray(project.actualities).map((element, key) => {
                        return (
                            <div className="actuality-content" key={key}>
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
                                <div className="btn_container">
                                    <Button>
                                        <Link to={element.urlid + "/" + element.url}>Voir<MdArrowForward /></Link>
                                    </Button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <NoContent user={user} project={project} icon={<MdOutlineNotificationsActive />} mainText="Recevez les news du projet directement dans vos notifications !" text="Suivez le projet pour être tenu au courant de son avancement." />
                )}
            </div>
        </>
    )
}

export default Actualities