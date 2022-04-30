import React, { useState } from 'react'
import { MdOutlinePhotoLibrary } from 'react-icons/md'
import { projectPicture } from '../../tools/functions/useAvatar'
import NoContent from './NoContent'
import FsLightbox from 'fslightbox-react';

const Gallery = ({ project, user }) => {
    const [toggler, setToggler] = useState(false)
    const [picture, setPicture] = useState(project.pictures[0])

    return (
        <>
            <div className="content-header">
                <h2>Galerie</h2>
            </div>
            {project.pictures.length > 0 ? (
                <div className="img-container">
                    {project.pictures.length > 1 &&
                        project.pictures.map((element, key) => {
                            return (
                                <div className="img-item">
                                    <div key={key} style={projectPicture(element)} onClick={() => { setToggler(!toggler); setPicture(element) }}></div>
                                </div>
                            )
                        })
                    }
                </div>
            ) : (
                <NoContent className="gallery_card" project={project} user={user} icon={<MdOutlinePhotoLibrary />} text="Suivez le projet pour savoir quand des photos seront ajoutées !" />
            )}
            <FsLightbox
                toggler={toggler}
                sources={project.pictures}
                types={[...Array(project.pictures.length)].fill('image')}
                source={picture}
            />
        </>
    )
}

export default Gallery