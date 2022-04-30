import React, { useState } from 'react'
import { MdKeyboardArrowRight, MdKeyboardArrowDown, MdOutlineNotificationsActive } from 'react-icons/md'
import NoContent from './NoContent'

const Works = ({ project, user }) => {
    const [displayed, setDislayed] = useState([])

    const openAnswer = (key) => {
        if (!displayed.includes(key)) setDislayed(e => [...e, key])
        else setDislayed(displayed.filter(e => e !== key))
    }

    return (
        <>
            <div className="content-header">
                <h2>Compétences recherchées</h2>
            </div>
            {project.works.length > 0 ? (
                project.works.map((element, key) => {
                    return (
                        <div className="accordion" key={key} onClick={() => openAnswer(key)}>
                            <div className="accordion_top">
                                {element.name}
                                {displayed.includes(key) ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
                            </div>
                            {displayed.includes(key) &&
                                <div className="accordion_body">
                                    {element.description ? (
                                        element.description
                                    ) : (
                                        "Aucune description..."
                                    )}
                                </div>
                            }
                        </div>
                    )
                })
            ) : (
                <NoContent user={user} project={project} icon={<MdOutlineNotificationsActive />} mainText="Recevez les news du projet directement dans vos notifications !" text="Suivez le projet pour être tenu au courant de son avancement." />
            )}
        </>
    )
}

export default Works