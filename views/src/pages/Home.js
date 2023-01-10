import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Search from './Search';
import ProjectPage from './Project';
import Footer from '../components/Footer';
import Header from '../components/home/Header';
import ProjectsSwiper from '../components/home/ProjectsSwiper';
import CategoriesSwiper from '../components/home/CategoriesSwiper';
import TagsSwiper from '../components/home/TagsSwiper';
import { MdArrowRightAlt } from 'react-icons/md';

const Home = ({ websocket, user }) => {
    const [isLoading, setLoading] = useState(true)
    const [projects, setProjects] = useState([])
    const [sortedProjects, setSortedProjects] = useState({
        randomized: [],
        byDates: [],
        byLikes: [],
        byFollows: []
    })

    useEffect(() => {
        const fetch = async () => {
            await axios
                .get(`${process.env.REACT_APP_API_URL}api/project/`)
                .then(res => {
                    setProjects(res.data)
                    setSortedProjects(() => ({
                        randomized: res.data.sort(() => {
                            return Math.random() - 0.5
                        }),
                        byDates: res.data.sort((a, b) => {
                            return Date.parse(a.createdAt) > Date.parse(b.createdAt) ? -1 : 1
                        }),
                        byLikes: res.data.sort((a, b) => {
                            return parseInt(a.likers.length) > parseInt(b.likers.length) ? -1 : 1
                        }),
                        byFollows: res.data.sort((a, b) => {
                            return parseInt(a.followers.length) > parseInt(b.followers.length) ? -1 : 1
                        })
                    }))
                    setLoading(false)
                })
                .catch(err => console.log(err))
        }
        fetch()
    }, [])

    /***** RECHERCHE *****/

    const [datas, setDatas] = useState({
        category: "",
        location: [],
        recentLocations: [],
        aroundLocation: 0,
        date: "",
        state: "",
    })
    const [results, setResults] = useState([])
    const navigate = useNavigate()

    const search = () => {
        localStorage.setItem("search:locations", JSON.stringify(datas.location))
        setDatas(data => ({ ...data, location: [] }))
        setResults(projects)
        navigate("/search/a")
    }

    return (
        <>
            <Routes>
                <Route index element={
                    <>
                        <Header
                            user={user}
                            search={search}
                            datas={datas}
                            setDatas={setDatas}
                        />
                        <div className="home-body">
                            <div className="container">
                                <CategoriesSwiper />
                                <div className="swiper-container">
                                    <div className="swiper-header">
                                        <h2>Les plus récent</h2>
                                        <Link to="/">
                                            Voir plus <MdArrowRightAlt />
                                        </Link>
                                    </div>
                                    <div className="swiper-inner">
                                        <ProjectsSwiper
                                            projects={sortedProjects.byDates}
                                            isLoading={isLoading}
                                            websocket={websocket}
                                            user={user}
                                        />
                                    </div>
                                </div>
                                <div className="swiper-container">
                                    <div className="swiper-header">
                                        <h2>Tous les projets</h2>
                                        <Link to="/">
                                            Voir plus <MdArrowRightAlt />
                                        </Link>
                                    </div>
                                    <div className="swiper-inner">
                                        <ProjectsSwiper
                                            projects={sortedProjects.randomized}
                                            isLoading={isLoading}
                                            websocket={websocket}
                                            user={user}
                                        />
                                    </div>
                                </div>
                                <div className="swiper-container">
                                    <div className="swiper-header">
                                        <h2>Les plus aimés</h2>
                                        <Link to="/">
                                            Voir plus <MdArrowRightAlt />
                                        </Link>
                                    </div>
                                    <div className="swiper-inner">
                                        <ProjectsSwiper
                                            projects={sortedProjects.byLikes}
                                            isLoading={isLoading}
                                            websocket={websocket}
                                            user={user}
                                        />
                                    </div>
                                </div>
                                <div className="swiper-container">
                                    <div className="swiper-header">
                                        <h2>Les plus suivis</h2>
                                        <Link to="/">
                                            Voir plus <MdArrowRightAlt />
                                        </Link>
                                    </div>
                                    <div className="swiper-inner">
                                        <ProjectsSwiper
                                            projects={sortedProjects.byFollows}
                                            isLoading={isLoading}
                                            websocket={websocket}
                                            user={user}
                                        />
                                    </div>
                                </div>
                                <TagsSwiper />
                            </div>
                        </div>
                    </>
                } />
                {projects.length > 0 &&
                    <>
                        <Route path="project/:URLID/:URL/*" element={
                            <ProjectPage
                                user={user}
                                projects={projects}
                            />
                        } />
                        <Route path="search/*" element={
                            <Search
                                user={user}
                                websocket={websocket}
                                search={search}
                                results={results}
                                datas={datas}
                                setDatas={setDatas}
                            />
                        } />
                    </>
                }
            </Routes>
            <Footer />
        </>
    )
}

export default Home;