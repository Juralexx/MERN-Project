import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useParams, useNavigate, Routes, Route } from 'react-router-dom'
import { getProject } from '../actions/project.action';
import Header from '../components/project/project-page/Header';
import Actualities from '../components/project/project-page/Actualities';
import Gallery from '../components/project/project-page/Gallery';
import Qna from '../components/project/project-page/Qna';

const ProjectPage = ({ user, websocket, projects }) => {
    const { URLID, URL } = useParams()
    const [project, setProject] = useState()
    const [isLoading, setLoading] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const projet = projects.find(element => element.URLID === URLID && element.URL === URL)
        setProject(projet)
        dispatch(getProject(projet._id))
        setLoading(false)
    }, [URL, URLID, projects, setProject, dispatch, user._id])

    return (
        <div className="content-container project-page">
            <div className="content-box">
                {!isLoading && <Header project={project} />}
                <div className="project-page-body">
                    <Routes>
                        <Route index element={
                            <div className="dashboard-content-container">

                            </div>
                        } />
                        <Route path="gallery" element={
                            <Gallery
                                user={user}
                                websocket={websocket}
                                project={project}
                            />
                        } />
                        <Route path="actuality/*" element={
                            <Actualities
                                user={user}
                                websocket={websocket}
                                project={project}
                            />
                        } />
                        <Route path="qna" element={
                            <Qna
                                user={user}
                                websocket={websocket}
                                project={project}
                            />
                        } />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default ProjectPage;