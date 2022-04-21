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
import Footer from '../components/Footer';

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
        <div className="content-container project-page">
            {!isLoading && <Header project={project} />}
            <div className="project-page-body">
                <div className="project-navbar">
                    <div className="project-navbar-content">
                        <div className="project-navbar-item">
                            <NavLink to={`/project/${project.URLID}/${project.URL}/`} className={`${isThisActive}`}>À propos</NavLink>
                        </div>
                        <div className="project-navbar-item">
                            <NavLink to={`/project/${project.URLID}/${project.URL}/gallery`} className={`${isThisActive}`}>Galerie</NavLink>
                        </div>
                        <div className="project-navbar-item">
                            <NavLink to={`/project/${project.URLID}/${project.URL}/actuality`} className={`${isThisActive}`}>Actualités</NavLink>
                        </div>
                        <div className="project-navbar-item">
                            <NavLink to={`/project/${project.URLID}/${project.URL}/qna`} className={`${isThisActive}`}>FAQ</NavLink>
                        </div>
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
                </div>
            </div>
        </div>
    )
}

export default ProjectPage;