import React from 'react'
import { EndIconButton } from '../../tools/components/Button'
import { convertDeltaToHTML } from '../../tools/functions/function'
import { dateParser, reverseArray } from '../../Utils'
import { BigAvatar } from '../../tools/components/Avatars'
import { MdArrowForward } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Actualities = ({ project }) => {

    return (
        <>
            <div className="content-header">
                <h2>Actualités</h2>
            </div>
            <div className="actuality-container">
                {reverseArray(project.actualities).map((element, key) => {
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
                            <div className="btn-container">
                                <Link to={element.urlid + "/" + element.url}><EndIconButton icon={<MdArrowForward />} text="Voir" /></Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Actualities