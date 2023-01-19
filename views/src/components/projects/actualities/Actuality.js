import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import FsLightbox from 'fslightbox-react'
import { Button } from '../../tools/global/Button'
import { MediumAvatar } from '../../tools/global/Avatars'
import { dateParser } from '../../Utils'
import { convertDeltaToHTML } from '../../tools/editor/functions'

const Actuality = ({ project, isManager }) => {
    const { urlid, url } = useParams()
    const index = project.actualities.findIndex(e => e.urlid === urlid && e.url === url)
    const actuality = project.actualities[index]

    const [toggler, setToggler] = useState({ open: false, imgIndex: 0 })

    return (
        Object.keys(actuality).length > 0 && (
            <div className="container-lg py-8 actuality-page-container">
                <div className="actuality">
                    <div className="actuality-header">
                        <div className="actuality-nb">
                            Actu #{index + 1}
                        </div>
                        <h3>{actuality.title}</h3>
                        <div className="actuality-infos">
                            <MediumAvatar pic={actuality.poster.picture} />
                            <div className="actuality-infos-right">
                                <div className="actuality-poster">
                                    {actuality.poster.pseudo} <span>{project.poster._id === actuality.poster._id ? "Createur" : "Collaborateur"}</span>
                                </div>
                                <div className="date">
                                    {dateParser(actuality.date)}
                                </div>
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
                                    <div className='actuality-img' key={key} onClick={() => setToggler({ open: !toggler.open, imgIndex: key })}>
                                        <img src={element} alt={actuality.title} />
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
                {isManager &&
                    <div id="back-actions">
                        <div className='back-actions-inner'>
                            <Button>
                                <Link to="edit">Modifier</Link>
                            </Button>
                        </div>
                    </div>
                }
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