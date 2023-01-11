import React, { useState } from 'react'
import Icon from '../../tools/icons/Icon'
import NoContent from './NoContent'

const Works = ({ project, user }) => {
    const [displayed, setDislayed] = useState([])

    const openAnswer = (key) => {
        if (!displayed.includes(key)) setDislayed(e => [...e, key])
        else setDislayed(displayed.filter(e => e !== key))
    }

    return (
        <>
            <h2 className="text-[26px] bold mb-8">Compétences recherchées</h2>
            {project.works.length > 0 ? (
                project.works.map((element, key) => {
                    return (
                        <div className="accordion" key={key} onClick={() => openAnswer(key)}>
                            <div className="accordion_top">
                                <p>{element.name}</p>
                                {displayed.includes(key) ? <Icon name="CaretDown" /> : <Icon name="CaretRight" />}
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
                <NoContent
                    user={user}
                    project={project}
                    icon={<Icon name="Notifications" />}
                    mainText="Recevez les news du projet directement dans vos notifications !" text="Suivez le projet pour être tenu au courant de son avancement."
                />
            )}
        </>
    )
}

export default Works