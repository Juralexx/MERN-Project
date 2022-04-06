import React from 'react'

const Galery = ({ project }) => {

    return (
        <div className="masonry-wrapper">
            <div class="masonry">
                {project.pictures.map((element, key) => {
                    return (
                        <div class="masonry-brick">
                            <img src={element} alt={project.title} title={project.title} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Galery