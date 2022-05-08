import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BigAvatar } from '../../tools/components/Avatars'
import { dateParser } from '../../Utils'
import { coverPicture } from '../../tools/functions/useAvatar'
import { convertDeltaToHTML } from '../../tools/editor/functions'

const Actuality = ({ project }) => {
    const { urlid, url } = useParams()
    const [actuality, setActuality] = useState({})
    const [index, setIndex] = useState(null)

    useEffect(() => {
        if (project.actualities) {
            setActuality(project.actualities.find(e => e.urlid === urlid && e.url === url))
            setIndex(project.actualities.findIndex(e => e.urlid === urlid && e.url === url))
        }
    }, [project.actualities, urlid, url])

    return (
        Object.keys(actuality).length > 0 &&
        <div className="actuality-page-container">
            <div className="actuality-content">
                <div className="actuality-header">
                    <div className="actuality-nb">Actu #{index + 1}</div>
                    <h3>{actuality.title}</h3>
                    <div className="actuality-infos">
                        <BigAvatar pic={actuality.posterPicture} />
                        <div className="actuality-infos-right">
                            <div className="actuality-poster">{actuality.posterPseudo} <span>{project.posterId === actuality.posterId ? "Createur" : "Collaborateur"}</span></div>
                            <div className="date">{dateParser(actuality.date)}</div>
                        </div>
                    </div>
                </div>
                <div className="actuality-description">
                    <p dangerouslySetInnerHTML={convertDeltaToHTML(actuality.description)}></p>
                </div>
                {actuality.pictures.length > 0 &&
                    <div className="actuality-img-container">
                        {actuality.pictures.map((element, key) => {
                            return (
                                <div key={key} style={coverPicture(element)}></div>
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    )
}

export default Actuality