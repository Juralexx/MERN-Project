import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { createSearchParams, Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Icon from '../components/tools/icons/Icon';
import Header from '../components/home/Header';
import CategoriesSwiper from '../components/home/CategoriesSwiper';
import ProjectsSwiper from '../components/home/ProjectsSwiper';
import TagsSwiper from '../components/home/TagsSwiper';
import Footer from '../components/Footer';
import Search from './Search';
import Researches from './Researches';
import ProjectPage from './Project';

const Home = ({ websocket, user }) => {
    const [isLoading, setLoading] = useState(true)
    const [projects, setProjects] = useState([])
    const [sortedProjects, setSortedProjects] = useState({ randomized: [], byDates: [], byLikes: [], byFollows: [] })

    useEffect(() => {
        const fetch = async () => {
            await axios
                .get(`${process.env.REACT_APP_API_URL}api/project/`)
                .then(res => {
                    setProjects(res.data)
                    setSortedProjects(() => ({
                        all: res.data,
                        randomized: res.data.sort(() => {
                            return Math.random() - 0.5
                        }),
                        byDates: res.data.sort((a, b) => {
                            return Date.parse(a.createdAt) > Date.parse(b.createdAt) ? -1 : 1
                        }),
                        byLikes: res.data.sort((a, b) => {
                            return parseInt(a.likers.length) > parseInt(b.likers.length) ? -1 : 1
                        }),
                        byFollowings: res.data.sort((a, b) => {
                            return parseInt(a.followers.length) > parseInt(b.followers.length) ? -1 : 1
                        })
                    }))
                    setLoading(false)
                })
                .catch(err => console.log(err))
        }
        fetch()
    }, [])

    /**
     * 
     */

    const [datas, setDatas] = useState({
        query: "",
        category: "",
        skills: "",
        location: [],
        recentLocations: [],
        aroundLocation: 0,
        date: "",
        state: "",
    })
    const navigate = useNavigate()

    const locationsStored = localStorage.getItem("search:locations")

    useEffect(() => {
        if (locationsStored && JSON.parse(locationsStored).length > 0)
            setDatas(data => ({ ...data, recentLocations: JSON.parse(locationsStored) }))
    }, [locationsStored])

    const search = async () => {
        let params = { origin: 'home' }
        if (datas.query)
            params = { ...params, q: datas.query }

        if (datas.category)
            params = { ...params, category: datas.category }

        if (datas.location.length > 0) {
            localStorage.setItem("search:locations", JSON.stringify(datas.location))

            let concatLocations = { region: String(), department: String(), city: String() }

            datas.location.forEach(loc => {
                if (loc.type === 'city') {
                    return concatLocations = {
                        ...concatLocations,
                        city: concatLocations.city.concat('/', loc.location)
                    }
                } else if (loc.type === 'department') {
                    return concatLocations = {
                        ...concatLocations,
                        department: concatLocations.department.concat('/', loc.department)
                    }
                } else if (loc.type === 'region') {
                    return concatLocations = {
                        ...concatLocations,
                        region: concatLocations.region.concat('/', loc.region)
                    }
                }
            })
            if (concatLocations.city.length > 0)
                params = { ...params, location: concatLocations.city.slice(1) }

            if (concatLocations.department.length > 0)
                params = { ...params, department: concatLocations.department.slice(1) }

            if (concatLocations.region.length > 0)
                params = { ...params, region: concatLocations.region.slice(1) }

        }
        if (datas.date)
            params = { ...params, date: datas.date }

        if (datas.state)
            params = { ...params, state: datas.state }

        localStorage.setItem("prevUrl", window.location.pathname)

        if (user && user._id) {
            await axios({
                method: "put",
                url: `${process.env.REACT_APP_API_URL}api/user/${user._id}`,
                data: {
                    research: {
                        query: datas.query,
                        category: datas.category,
                        location: datas.location,
                        Date: datas.date,
                        State: datas.state,
                        createdAt: new Date().toISOString()
                    },
                }
            })
                .catch(err => console.log(err))
        }

        navigate({
            pathname: '/search/',
            search: `?${createSearchParams(params)}`
        })
    }

    /**
     * 
     */

    return (
        <>
            <div className="main-body">
                <Routes>
                    <Route index element={
                        <>
                            <Header
                                user={user}
                                search={search}
                                datas={datas}
                                setDatas={setDatas}
                            />
                            <div className="container">
                                <CategoriesSwiper />
                                <div className="swiper-container">
                                    <div className="swiper-header">
                                        <h2>Les plus récent</h2>
                                        <Link to="/recents">
                                            Voir plus <Icon name="DoubleArrowRight" />
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
                                        <Link to="/all">
                                            Voir plus <Icon name="DoubleArrowRight" />
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
                                        <Link to="/liked">
                                            Voir plus <Icon name="DoubleArrowRight" />
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
                                        <Link to="/followed">
                                            Voir plus <Icon name="DoubleArrowRight" />
                                        </Link>
                                    </div>
                                    <div className="swiper-inner">
                                        <ProjectsSwiper
                                            projects={sortedProjects.byFollowings}
                                            isLoading={isLoading}
                                            websocket={websocket}
                                            user={user}
                                        />
                                    </div>
                                </div>
                                <TagsSwiper />
                            </div>
                        </>
                    } />
                    {projects.length > 0 &&
                        <>
                            <Route path="project/:URLID/:URL/*" element={
                                <ProjectPage
                                    projects={projects}
                                    user={user}
                                    websocket={websocket}
                                />
                            } />
                            {['search/*', '/all', '/recents', '/liked', '/followed']
                                .map(path => (
                                    <Route key={path} path={path} element={
                                        <Search
                                            user={user}
                                            websocket={websocket}
                                            search={search}
                                            datas={datas}
                                            setDatas={setDatas}
                                            sortedProjects={sortedProjects}
                                        />
                                    } />
                                ))}
                            <Route path="researches/*" element={
                                <Researches
                                    user={user}
                                    search={search}
                                    setDatas={setDatas}
                                />
                            } />
                            <Route path="/*" element={<Navigate to="/" />} />
                        </>
                    }
                </Routes>
            </div>
            <Footer />
        </>
    )
}

export default Home;