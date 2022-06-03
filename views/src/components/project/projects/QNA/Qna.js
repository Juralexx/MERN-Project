import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { Button } from '../../../tools/global/Button'
import EditQna from './EditQna'
import { GrBlockQuote } from 'react-icons/gr';

const Qna = ({ project }) => {
    return (
        <Routes>
            <Route index element={
                <div className="content_container">
                    <div className="content_box">
                        {project.QNA.length > 0 ? (
                            <>
                                <div className="header flex justify-between mb-5">
                                    <h2>Foire aux questions</h2>
                                    <NavLink to="edit"><Button text="modifier" /></NavLink>
                                </div>
                                {project.QNA.map((element, key) => {
                                    return (
                                        <div className="accordion" key={key}>
                                            <div className="accordion_top">
                                                {key + 1}. {element.question}
                                            </div>
                                            <div className="accordion_body">
                                                {element.answer}
                                            </div>
                                        </div>
                                    )
                                })}
                            </>
                        ) : (
                            <>
                                <div className="header flex justify-between mb-5">
                                    <h2>Foire aux questions</h2>
                                </div>
                                <div className="no_content">
                                    <div className="svg_container">
                                        <GrBlockQuote />
                                    </div>
                                    <p>Vous n'avez pas encore ajouté de FAQ.</p>
                                    <span>Ajoutez une FAQ pour répondre aux questions que vos visiteur pourraient se poser !</span>
                                    <NavLink to={`/projects/${project.URLID}/${project.URL}/add-qna`}><Button text="Ajouter une FAQ" /></NavLink>
                                </div>
                            </>
                        )}
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