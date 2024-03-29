import React, { useState } from 'react'
import NoContent from './NoContent'
import FsLightbox from 'fslightbox-react';
import { fullImage } from '../Utils';
import Icon from '../tools/icons/Icon';

const Gallery = ({ project, user }) => {
    const [toggler, setToggler] = useState(false)
    const [picture, setPicture] = useState(project.pictures[0])

    return (
        <>
            <h2 className="text-[26px] bold mb-8">Galerie</h2>
            {project.pictures.length > 0 ? (
                <div className="row">
                    {project.pictures.length > 1 &&
                        project.pictures.map((element, key) => {
                            return (
                                <div className="col-12 col-xl-6 !p-2 min-h-[300px]">
                                    <div className="w-full h-full" key={key} style={fullImage(element)} onClick={() => { setToggler(!toggler); setPicture(element) }}></div>
                                </div>
                            )
                        })
                    }
                </div>
            ) : (
                <NoContent
                    className="gallery_card"
                    project={project}
                    user={user}
                    icon={<Icon name="Picture" />}
                    text="Suivez le projet pour savoir quand des photos seront ajoutées !"
                />
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