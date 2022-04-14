import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { Button } from '../../../tools/components/Button'
import EditQna from './EditQna'

const Qna = ({ project }) => {
    return (
        <Routes>
            <Route index element={
                <div className="content-container">
                    <div className="content-box">
                        <div className="header flex justify-between mb-5">
                            <h2>Foire aux questions</h2>
                            <NavLink to="edit"><Button text="modifier" /></NavLink>
                        </div>
                        {project.QNA.map((element, key) => {
                            return (
                                <div className="qna-accordion" key={key}>
                                    <div className="qna-accordion-question">
                                        {key + 1}. {element.question}
                                    </div>
                                    <div className="qna-accordion-answer">
                                        {element.answer}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            } />

            <Route path="edit" element={
                <EditQna
                    project={project}
                />
            } />
        </Routes>
    )
}

export default Qna