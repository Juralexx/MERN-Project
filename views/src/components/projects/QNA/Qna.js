import React from 'react'
import { Link, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import { Button } from '../../tools/global/Button'
import EditQna from './EditQna'
import Icon from '../../tools/icons/Icon';

const Qna = ({ project, isManager }) => {
    return (
        <Routes>
            <Route index element={
                <div className="container-lg py-8">
                    {project.QNA.length > 0 ? (
                        <>
                            <div className="header flex flex-col sm:flex-row sm:items-center mb-9">
                                <h2 className='mb-3 sm:mb-0'>Foire aux questions</h2>
                                {isManager &&
                                    <Button className="sm:ml-5">
                                        <Link to="edit">Modifier</Link>
                                    </Button>
                                }
                            </div>
                            {project.QNA.map((element, key) => {
                                return (
                                    <div className='mb-7' key={key}>
                                        <h4>
                                            {key + 1}. {element.question}
                                        </h4>
                                        <p className='py-3 txt-sec'>
                                            {element.answer}
                                        </p>
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
                                    <Icon name="Quotes" />
                                </div>
                                <p>Vous n'avez pas encore ajouté de FAQ.</p>
                                <span>Ajoutez une FAQ pour répondre aux questions que vos visiteur pourraient se poser !</span>
                                {isManager &&
                                    <Button>
                                        <NavLink to={`/projects/${project.URLID}/${project.URL}/add-qna`}>Ajouter une FAQ</NavLink>
                                    </Button>
                                }
                            </div>
                        </>
                    )}
                </div>
            } />

            <Route path="edit" element={
                project.QNA.length === 0 ? (
                    <EditQna
                        project={project}
                    />
                ) : (
                    <Navigate
                        replace
                        to={`/projects/${project.URLID}/${project.URL}/qna`}
                    />
                )
            } />
        </Routes>
    )
}

export default Qna