import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import { NavLink, useParams, Routes, Route } from 'react-router-dom'
import { getProject } from '../actions/project.action';
import { convertDeltaToHTML } from '../components/tools/editor/functions';
import Header from '../components/project/project-page/Header';
import Actualities from '../components/project/project-page/Actualities';
import Gallery from '../components/project/project-page/Gallery';
import Qna from '../components/project/project-page/Qna';
import ActualityCard from '../components/project/project-page/ActualityCard';
import GalleryCard from '../components/project/project-page/GalleryCard';
import MapCard from '../components/project/project-page/MapCard';
import Actuality from '../components/project/project-page/Actuality';
import Works from '../components/project/project-page/Works';
import QnaCard from '../components/project/project-page/QnaCard';
import Networks from '../components/project/project-page/Networks';
import { Button } from '../components/tools/components/Button';

const ProjectPage = ({ user, projects }) => {
    const { URLID, URL } = useParams()
    const [project, setProject] = useState({})
    const [isLoading, setLoading] = useState(true)
    const isActive = ({ isActive }) => (!isActive ? "" : "active")
    const dispatch = useDispatch()

    useEffect(() => {
        if (Object.keys(project).length === 0) {
            const projet = projects.find(e => e.URLID === URLID && e.URL === URL)
            setProject(projet)
            dispatch(getProject(projet._id))
            setLoading(false)
        }
    }, [URL, URLID, projects, project, setProject, dispatch])

    const getHeight = () => {
        let screenHeight = document.documentElement.clientHeight
        return screenHeight
    }

    const [displayBtn, setDisplayBtn] = useState("none")
    const navRef = useRef()

    useEffect(() => {
        if (navRef?.current?.getBoundingClientRect().top > 200) {
            window.addEventListener('scroll', () => {
                if (navRef?.current?.getBoundingClientRect().top < 200) {
                    setDisplayBtn("block")
                } else setDisplayBtn("none")
            })
        }
    }, [navRef.current])

    return (
        !isLoading &&
        <div className="content_container project-page">
            <Header user={user} project={project} />
            <div className="project-page-body">
                <div className="container-lg content_nav-sticky overflow-x-auto" ref={navRef}>
                    <div className="content_nav">
                        <NavLink to={`/project/${project.URLID}/${project.URL}/`} className={isActive}>À propos</NavLink>
                        <NavLink to={`/project/${project.URLID}/${project.URL}/researches`} className={isActive}>Recherches <span>{project.works.length}</span></NavLink>
                        <NavLink to={`/project/${project.URLID}/${project.URL}/gallery`} className={isActive}>Galerie <span>{project.pictures.length}</span></NavLink>
                        <NavLink to={`/project/${project.URLID}/${project.URL}/actuality`} className={isActive}>Actualités <span>{project.actualities.length}</span></NavLink>
                        <NavLink to={`/project/${project.URLID}/${project.URL}/qna`} className={isActive}>FAQ <span>{project.QNA.length}</span></NavLink>
                        <Button text="Rejoindre le projet" className="ml-auto" style={{ display: displayBtn }} />
                    </div>
                </div>
                <div className="container-lg">
                    <div className="row h-full py-10">
                        <div className="col-lg-8 lg:pr-4">
                            {!isLoading &&
                                <Routes>
                                    <Route index element={
                                        <>
                                            <h2 className="text-[26px] bold mb-8">À propos du projet</h2>
                                            <div dangerouslySetInnerHTML={convertDeltaToHTML(project.content[0])}></div>
                                            {project.networks.length > 0 &&
                                                <Networks project={project} />
                                            }
                                        </>
                                    } />
                                    <Route path="researches" element={
                                        <Works user={user} project={project} />
                                    } />
                                    <Route path="gallery" element={
                                        <Gallery user={user} project={project} />
                                    } />
                                    <Route path="actuality" element={
                                        <Actualities user={user} project={project} />
                                    } />
                                    <Route path="actuality/:urlid/:url" element={
                                        <Actuality user={user} project={project} />
                                    } />
                                    <Route path="qna" element={
                                        <Qna user={user} project={project} />
                                    } />
                                </Routes>
                            }
                        </div>
                        <div className="content-cards col-lg-4" style={{ maxHeight: getHeight() }}>
                            {!isLoading &&
                                <>
                                    <MapCard project={project} user={user} />
                                    <ActualityCard project={project} user={user} />
                                    <QnaCard project={project} user={user} />
                                    <GalleryCard project={project} user={user} />
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