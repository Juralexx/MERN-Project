import React, { useState } from 'react'
import NoContent from './NoContent'
import Icon from '../tools/icons/Icon'
import { addClass } from '../Utils'

const Qna = ({ project, user }) => {
    const [displayed, setDislayed] = useState([])

    const openAnswer = (key) => {
        if (!displayed.includes(key)) setDislayed(e => [...e, key])
        else setDislayed(displayed.filter(e => e !== key))
    }

    return (
        <>
            <h2 className="text-[26px] bold mb-8">Foire aux questions</h2>
            {project.QNA.length > 0 ? (
                project.QNA.map((element, key) => {
                    return (
                        <div className={`accordion ${addClass(displayed.includes(key), 'open')}`}
                            key={key}
                            onClick={() => openAnswer(key)}
                        >
                            <div className="accordion_top">
                                <p>{element.question}</p>
                                {displayed.includes(key) ? <Icon name="CaretDown" /> : <Icon name="CaretRight" />}
                            </div>
                            <div className="accordion_body">
                                {element.answer}
                            </div>
                        </div>
                    )
                })
            ) : (
                <NoContent
                    user={user}
                    project={project}
                    icon={<Icon name="Notifications" />}
                    mainText="Recevez les news du projet directement dans vos notifications !"
                    text="Suivez le projet pour être tenu au courant de son avancement."
                />
            )}
        </>
    )
}

export default Qna