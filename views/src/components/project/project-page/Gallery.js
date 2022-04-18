import React from 'react'

const Gallery = ({ project }) => {
    return (
        <>
            <div className="content-header">
                <h2>Galerie</h2>
            </div>
            {project.pictures.map((element, key) => {
                return (
                    <div className="qna-accordion" key={key}></div>
                )
            })}
        </>
    )
}

export default Gallery