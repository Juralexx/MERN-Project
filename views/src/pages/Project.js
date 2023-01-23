import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useParams, Routes, Route, Navigate, Link } from 'react-router-dom'
import { convertDeltaToHTML } from '../components/tools/editor/functions';
import Header from '../components/project-[page]/Header';
import Actualities from '../components/project-[page]/Actualities';
import Gallery from '../components/project-[page]/Gallery';
import Qna from '../components/project-[page]/Qna';
import ActualityCard from '../components/project-[page]/ActualityCard';
import GalleryCard from '../components/project-[page]/GalleryCard';
import MapCard from '../components/project-[page]/MapCard';
import Actuality from '../components/project-[page]/Actuality';
import Works from '../components/project-[page]/Works';
import QnaCard from '../components/project-[page]/QnaCard';
import Networks from '../components/project-[page]/Networks';
import { Button } from '../components/tools/global/Button';
import Oval from '../components/tools/loaders/Oval';

const ProjectPage = ({ user, projects, websocket }) => {
    const { URLID, URL } = useParams()
    const [project, setProject] = useState({})
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        if (Object.keys(project).length === 0) {
            setProject(projects.find(element => element.URLID === URLID && element.URL === URL))
            setLoading(false)
        }
    }, [URL, URLID, projects, project])

    /**
     * 
     */

    const getHeight = () => {
        let screenHeight = document.documentElement.clientHeight
        return screenHeight
    }

    const navRef = useRef()
    const [displayBtn, setDisplayBtn] = useState("none")

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.matchMedia('(min-width: 993px)').matches && navRef?.current?.getBoundingClientRect().top < 20) {
                setDisplayBtn("block")
            } else setDisplayBtn("none")
        })
    }, [navRef])

    /**
     * 
     */

    return (
        !isLoading ? (
            <div className="project-page">
                <Header
                    project={project}
                    user={user}
                    websocket={websocket}
                />
                <div className="project-page-body">
                    <div className='content_nav-sticky' ref={navRef}>
                        <div className="container-lg">
                            <div className="content_nav overflow-x-auto custom-scrollbar-x">
                                <NavLink to={`/project/${project.URLID}/${project.URL}/`}>
                                    À propos
                                </NavLink>
                                <NavLink to={`/project/${project.URLID}/${project.URL}/researches`}>
                                    Recherches <span>{project.works.length}</span>
                                </NavLink>
                                <NavLink to={`/project/${project.URLID}/${project.URL}/gallery`}>
                                    Galerie <span>{project.pictures.length}</span>
                                </NavLink>
                                <NavLink to={`/project/${project.URLID}/${project.URL}/actuality`}>
                                    Actualités <span>{project.actualities.length}</span>
                                </NavLink>
                                <NavLink to={`/project/${project.URLID}/${project.URL}/qna`}>
                                    FAQ <span>{project.QNA.length}</span>
                                </NavLink>
                                <Button className="ml-auto" style={{ display: displayBtn }}>
                                    Rejoindre le projet
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="container-lg">
                        <div className="row h-full py-10">
                            <div className="col-lg-8 lg:pr-4">
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
                                        <Works
                                            user={user}
                                            project={project}
                                        />
                                    } />
                                    <Route path="gallery" element={
                                        <Gallery
                                            user={user}
                                            project={project}
                                        />
                                    } />
                                    <Route path="actuality" element={
                                        <Actualities
                                            user={user}
                                            project={project}
                                        />
                                    } />
                                    <Route path="actuality/:urlid/:url" element={
                                        <Actuality
                                            user={user}
                                            project={project}
                                        />
                                    } />
                                    <Route path="qna" element={
                                        <Qna
                                            user={user}
                                            project={project}
                                        />
                                    } />
                                    <Route path="*" element={
                                        <Navigate replace to="/" />
                                    } />
                                </Routes>
                            </div>
                            <div className="content-cards col-lg-4 custom-scrollbar" style={{ maxHeight: getHeight() }}>
                                <MapCard
                                    project={project}
                                    user={user}
                                />
                                <ActualityCard
                                    project={project}
                                    user={user}
                                />
                                <QnaCard
                                    project={project}
                                    user={user}
                                />
                                <GalleryCard
                                    project={project}
                                    user={user}
                                />
                            </div>
                        </div>
                        {project.tags.length > 0 &&
                            <div className="explore-more">
                                <h3>Explorer plus de projets</h3>
                                <div className="explore-more-tags">
                                    {project.tags.map((element, key) => {
                                        return (
                                            <Link to={`/search/?tag=${element}`} className="tag" key={key}>
                                                <span>#</span>{element}
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        ) : (
            <Oval />
        )
    )
}

export default ProjectPage;