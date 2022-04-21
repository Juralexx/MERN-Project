import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Route, Routes } from 'react-router-dom';
import Header from '../components/home/Header';
import ProjectsSwiper from '../components/home/ProjectsSwiper';
import CategoriesSwiper from '../components/home/CategoriesSwiper';
import TagsSwiper from '../components/home/TagsSwiper';
import ProjectPage from './Project';
import { MdArrowRightAlt } from 'react-icons/md';
import Footer from '../components/Footer';

const Home = ({ websocket, user }) => {
    const [projects, setProjects] = useState([])
    const [randomized, setRandomized] = useState([])
    const [byDates, setByDates] = useState([])
    const [byLikes, setByLikes] = useState([])
    const [byFollows, setByFollows] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            await axios
                .get(`${process.env.REACT_APP_API_URL}api/project/`)
                .then(res => {
                    setProjects(res.data)
                    setRandomized(res.data.sort(() => {
                        return Math.random() - 0.5
                    }))
                    setByDates(res.data.sort((a, b) => {
                        return Date.parse(a.createdAt) > Date.parse(b.createdAt) ? -1 : 1
                    }))
                    setByLikes(res.data.sort((a, b) => {
                        return parseInt(a.likers.length) > parseInt(b.likers.length) ? -1 : 1
                    }))
                    setByFollows(res.data.sort((a, b) => {
                        return parseInt(a.followers.length) > parseInt(b.followers.length) ? -1 : 1
                    }))
                    setLoading(false)
                }).catch(err => console.log(err))
        }
        fetch()
    }, [projects.length])

    return (
        <>
            <Routes>
                <Route index element={
                    <>
                        <Header />
                        <div className="home-body">
                            <div className="content-box">
                                <CategoriesSwiper />
                                <div className="swiper-container">
                                    <div className="swiper-header">
                                        <h2>Les projets les plus récent</h2>
                                        <Link to="/">Voir plus <MdArrowRightAlt /></Link>
                                    </div>
                                    <div className="swiper-inner">
                                        <ProjectsSwiper projects={byDates} isLoading={isLoading} websocket={websocket} user={user} />
                                    </div>
                                </div>
                                <div className="swiper-container">
                                    <div className="swiper-header">
                                        <h2>Tous les projets</h2>
                                        <Link to="/">Voir plus <MdArrowRightAlt /></Link>
                                    </div>
                                    <div className="swiper-inner">
                                        <ProjectsSwiper projects={randomized} isLoading={isLoading} websocket={websocket} user={user} />
                                    </div>
                                </div>
                                <div className="swiper-container">
                                    <div className="swiper-header">
                                        <h2>Les projets les plus aimés</h2>
                                        <Link to="/">Voir plus <MdArrowRightAlt /></Link>
                                    </div>
                                    <div className="swiper-inner">
                                        <ProjectsSwiper projects={byLikes} isLoading={isLoading} websocket={websocket} user={user} />
                                    </div>
                                </div>
                                <div className="swiper-container">
                                    <div className="swiper-header">
                                        <h2>Les projets les plus suivis</h2>
                                        <Link to="/">Voir plus <MdArrowRightAlt /></Link>
                                    </div>
                                    <div className="swiper-inner">
                                        <ProjectsSwiper projects={byFollows} isLoading={isLoading} websocket={websocket} user={user} />
                                    </div>
                                </div>
                                <TagsSwiper />
                            </div>
                        </div>
                    </>
                } />
                {projects.length > 0 &&
                    <Route path="project/:URLID/:URL/*" element={
                        <ProjectPage
                            user={user}
                            websocket={websocket}
                            projects={projects}
                        />
                    } />
                }
            </Routes>
            <Footer />
        </>
    )
}

export default Home;