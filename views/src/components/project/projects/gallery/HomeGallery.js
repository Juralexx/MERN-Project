import React from 'react'
import { Link } from 'react-router-dom'
import { StringButton } from '../../../tools/global/Button'
import Icon from '../../../tools/icons/Icon'

const HomeGallery = ({ project, user, websocket }) => {
    return (
        <div className="dashboard-card home-gallery">
            <div className="home-gallery-header">
                <h3>Galerie</h3>
                <div className="flex items-center">
                    <StringButton className="mr-4">
                        <Link to="gallery">Voir tous</Link>
                    </StringButton>
                </div>
            </div>
            <div className="dashboard-card-container home-gallery-container custom-scrollbar">
                {project.pictures.length > 0 ? (
                    project.pictures.slice(0, 2).map((picture, key) => {
                        return (
                            <div className="gallery-brick" key={key}>
                                <img src={picture} alt={project.title} title={project.title} />
                            </div>
                        )
                    })
                ) : (
                    <div className="empty-array">
                        <Icon name="Picture" />
                        <div>Vous n'avez aucunes images...</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomeGallery