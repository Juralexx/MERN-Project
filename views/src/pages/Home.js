import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Header from '../components/home/Header';
import ProjectsSwiper from '../components/home/ProjectsSwiper';
import CategoriesSwiper from '../components/home/CategoriesSwiper';
import TagsSwiper from '../components/home/TagsSwiper';
import ProjectPage from './Project';
import Footer from '../components/Footer';
import Search from './Search';
import { MdArrowRightAlt } from 'react-icons/md';

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

    /*************************************************************************************************/
    /**************************************** RECHERCHE **********************************************/

    const [category, setCategory] = useState("")
    const [location, setLocation] = useState([])
    const [recentLocations, setRecentLocations] = useState([])
    const [aroundLocation, setAroundLocation] = useState(0)
    const [date, setDate] = useState("")
    const [state, setState] = useState("")
    const [results, setResults] = useState([])
    const navigate = useNavigate()

    const search = () => {
        localStorage.setItem("search:locations", JSON.stringify(location))
        setLocation([])
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
                            category={category}
                            setCategory={setCategory}
                            location={location}
                            setLocation={setLocation}
                            recentLocations={recentLocations}
                            setRecentLocations={setRecentLocations}
                            aroundLocation={aroundLocation}
                            setAroundLocation={setAroundLocation}
                            state={state}
                            setState={setState}
                            date={date}
                            setDate={setDate}
                        />
                        <div className="home-body">
                            <div className="container">
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
                                category={category}
                                setCategory={setCategory}
                                location={location}
                                setLocation={setLocation}
                                recentLocations={recentLocations}
                                setRecentLocations={setRecentLocations}
                                aroundLocation={aroundLocation}
                                setAroundLocation={setAroundLocation}
                                state={state}
                                setState={setState}
                                date={date}
                                setDate={setDate}
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