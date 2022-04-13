import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { Button } from '../../../tools/components/Button'
import { convertDeltaToHTML } from '../../../tools/functions/function'
import { dateParser } from '../../../Utils'
import EditActuality from './EditActuality'

const Actualities = ({ project, user }) => {

    return (
        <Routes>
            <Route index element={
                <div className="content-container">
                    <div className="content-box">
                        <div className="header flex justify-between mb-5">
                            <h2>Actualités</h2>
                        </div>
                        <div className="actuality-container">
                            {project.actualities.map((element, key) => {
                                return (
                                    <div className="actuality-content" key={key}>
                                        <div className="actuality-img"><img src={element.pictures[0]} alt={element.title} /></div>
                                        <div className="actuality-description">
                                            <h3>{element.title}</h3>
                                            <div className="date">{dateParser(element.date)}</div>
                                            <p className="description" dangerouslySetInnerHTML={convertDeltaToHTML(element.description)}></p>
                                            <div className="btn-container">
                                                <Link to={`${element.url}/edit`}><Button text="Modifier"></Button></Link>
                                                <Button className="ml-2" text="Voir" />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            } />

            <Route path=":url/edit" element={
                <EditActuality
                    project={project}
                />
            } />
        </Routes>
    )
}

export default Actualities