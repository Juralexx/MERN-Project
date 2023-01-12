import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MediumAvatar } from '../tools/global/Avatars'
import { dateParser } from '../Utils'
import { convertDeltaToHTML } from '../tools/editor/functions'
import FsLightbox from 'fslightbox-react'

const Actuality = ({ project }) => {
    const { urlid, url } = useParams()
    const [actuality, setActuality] = useState({})
    const [index, setIndex] = useState(null)
    const [toggler, setToggler] = useState({ open: false, imgIndex: 0 })

    useEffect(() => {
        if (project.actualities) {
            let i = project.actualities.findIndex(e => e.urlid === urlid && e.url === url)
            setActuality(project.actualities[i])
            setIndex(i)
        }
    }, [project.actualities, urlid, url])

    return (
        Object.keys(actuality).length > 0 && (
            <div className="actuality-page-container">
                <div className="actuality">
                    <div className="actuality-header">
                        <div className="actuality-nb">Actu #{index + 1}</div>
                        <h3>{actuality.title}</h3>
                        <div className="actuality-infos">
                            <MediumAvatar pic={actuality.posterPicture} />
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
                                    <div className='actuality-img' key={key} onClick={() => { setToggler({ open: !toggler.open, imgIndex: key }) }}>
                                        <img src={element} alt={actuality.title} />
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
                <FsLightbox
                    toggler={toggler.open}
                    sources={actuality.pictures}
                    source={actuality.pictures[toggler.imgIndex]}
                    types={[...Array(actuality.pictures.length)].fill('image')}
                />
            </div>
        )
    )
}

export default Actuality