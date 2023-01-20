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

    const search = () => {
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

        navigate({
            pathname: '/search/',
            search: `?${createSearchParams(params)}`,
            state:{
                url: window.location.pathname
            }
        })
    }

    /**
     * 
     */

    return (
        <div className="home-body">
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
                                    <Link to="/">
                                        Voir plus <Icon name="ArrowRight" />
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
                                        Voir plus <Icon name="ArrowRight" />
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
                                        Voir plus <Icon name="ArrowRight" />
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
                                        Voir plus <Icon name="ArrowRight" />
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
                                user={user}
                                projects={projects}
                            />
                        } />
                        <Route path="search/*" element={
                            <Search
                                user={user}
                                websocket={websocket}
                                search={search}
                                datas={datas}
                                setDatas={setDatas}
                                sortedProjects={sortedProjects}
                            />
                        } />
                        <Route path="/*" element={<Navigate to="/" />} />
                    </>
                }
            </Routes>
            <Footer />
        </div>
    )
}

export default Home;