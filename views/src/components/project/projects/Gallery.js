import React, { useEffect, useState } from 'react'
import FsLightbox from 'fslightbox-react';


const Gallery = ({ project }) => {
    const [toggler, setToggler] = useState(false)
    const [current, setCurrent] = useState()
    const [array, setArray] = useState([])

    useEffect(() => {
        [...Array(project.pictures.length)].map(el => {
            return setArray(arr => [...arr, 'image'])
        })
    }, [project.pictures.length])

    return (
        <>
            <div className="gallery-wrapper">
                <div className="gallery">
                    {project.pictures.map((element, key) => {
                        return (
                            <div className="gallery-brick" key={key}>
                                <img src={element} alt={project.title} title={project.title} onClick={() => { setToggler(!toggler); setCurrent(element) }} />
                            </div>
                        )
                    })}
                </div>
                <FsLightbox
                    toggler={toggler}
                    sources={project.pictures}
                    types={array}
                />
            </div>
        </>
    )
}

export default Gallery