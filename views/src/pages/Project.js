import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import { useParams, Routes, Route, NavLink } from 'react-router-dom'
import { getProject } from '../actions/project.action';
import { convertDeltaToHTML } from '../components/tools/functions/function'
import Header from '../components/project/project-page/Header';
import Actualities from '../components/project/project-page/Actualities';
import Gallery from '../components/project/project-page/Gallery';
import Qna from '../components/project/project-page/Qna';
import ActualityCard from '../components/project/project-page/ActualityCard';
import GalleryCard from '../components/project/project-page/GalleryCard';
import MapCard from '../components/project/project-page/MapCard';
import Actuality from '../components/project/project-page/Actuality';

const ProjectPage = ({ user, websocket, projects }) => {
    const { URLID, URL } = useParams()
    const [project, setProject] = useState({})
    const [isLoading, setLoading] = useState(true)
    const isThisActive = ({ isActive }) => (!isActive ? "" : "active")
    const cardsContainer = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        if (Object.keys(project).length === 0) {
            const projet = projects.find(element => element.URLID === URLID && element.URL === URL)
            setProject(projet)
            dispatch(getProject(projet._id))
            setLoading(false)
        }
    }, [URL, URLID, projects, project, setProject, dispatch])

    const getTop = () => {
        let clientHeight = cardsContainer?.current?.clientHeight
        let screenHeight = document.documentElement.clientHeight
        return screenHeight - clientHeight
    }

    return (
        !isLoading &&
        <div className="content-container project-page">
            <Header project={project} />
            <div className="project-page-body">
                <div className="box">
                    <div className="project-navbar">
                        <NavLink to={`/project/${project.URLID}/${project.URL}/`} className={isThisActive}>
                            À propos
                        </NavLink>
                        <NavLink to={`/project/${project.URLID}/${project.URL}/gallery`} className={isThisActive}>
                            Galerie <span>{project.pictures.length}</span>
                        </NavLink>
                        <NavLink to={`/project/${project.URLID}/${project.URL}/actuality`} className={isThisActive}>
                            Actualités <span>{project.actualities.length}</span>
                        </NavLink>
                        <NavLink to={`/project/${project.URLID}/${project.URL}/qna`} className={isThisActive}>
                            FAQ <span>{project.QNA.length}</span>
                        </NavLink>
                    </div>
                </div>
                <div className="content-box">
                    <div className="project-page-content">
                        <div className="content">
                            {!isLoading &&
                                <Routes>
                                    <Route index element={
                                        <div dangerouslySetInnerHTML={convertDeltaToHTML(project.content[0])}></div>
                                    } />
                                    <Route path="gallery" element={
                                        <Gallery user={user} websocket={websocket} project={project} />
                                    } />
                                    <Route path="actuality" element={
                                        <Actualities user={user} websocket={websocket} project={project} />
                                    } />
                                    <Route path="actuality/:urlid/:url" element={
                                        <Actuality user={user} websocket={websocket} project={project} />
                                    } />
                                    <Route path="qna" element={
                                        <Qna user={user} websocket={websocket} project={project} />
                                    } />
                                </Routes>
                            }
                        </div>
                        <div className="content-cards" ref={cardsContainer} style={{ top: cardsContainer.current && getTop() }}>
                            {!isLoading &&
                                <>
                                    <MapCard project={project} />
                                    <ActualityCard project={project} />
                                    <GalleryCard project={project} />
                                </>
                            }
                        </div>
                    </div>
                    {project.tags.length > 0 &&
                        <div className="explore-more">
                            <h3>Explorer plus de projets</h3>
                            <div className="explore-more-tags">
                                {project.tags.map((element, key) => {
                                    return (
                                        <div className="tag" key={key}><span>#</span> {element}</div>
                                    )
                                })}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProjectPage;