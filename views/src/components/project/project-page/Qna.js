import React, { useState } from 'react'
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md'

const Qna = ({ project }) => {
    const [displayed, setDislayed] = useState([])

    const openAnswer = (key) => {
        if (!displayed.includes(key)) setDislayed(e => [...e, key])
        else setDislayed(displayed.filter(e => e !== key))
    }

    return (
        <>
            <div className="content-header">
                <h2>Foire aux questions</h2>
            </div>
            {project.QNA.map((element, key) => {
                return (
                    <div className="qna-page-accordion" key={key} onClick={() => openAnswer(key)}>
                        <div className="qna-page-accordion-question">
                            {element.question}
                            {displayed.includes(key) ?  <MdKeyboardArrowDown /> : <MdKeyboardArrowRight /> }
                        </div>
                        {displayed.includes(key) &&
                            <div className="qna-page-accordion-answer">
                                {element.answer}
                            </div>
                        }
                    </div>
                )
            })}
        </>
    )
}

export default Qna