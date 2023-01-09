import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { useOneLevelSearch } from '../tools/hooks/useOneLevelSearch'
import { sortByDone, sortByInProgress, sortByOld, sortByRecent, sortByWorkedOn } from '../project/projects/functions'
import { DropdownInput, IconInput } from '../tools/global/Inputs'
import { SmallLoader } from '../tools/global/Loader'
import Card from '../tools/components/Card'
import { BiSearchAlt } from 'react-icons/bi'
import { AiFillStar } from 'react-icons/ai'
import { IoHeart } from 'react-icons/io5'
import { MdInsertChart } from 'react-icons/md'
import { MdOutlineBookmark } from 'react-icons/md'

const Projects = ({ user, websocket }) => {
    const [projects, setProjects] = useState([])
    const [projectsToDisplay, setProjectsToDisplay] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [filter, setFilter] = useState("")
    const location = useLocation()
    const { oneLevelSearch, isInResults, query, setQuery } = useOneLevelSearch(projectsToDisplay, 'title')

    useEffect(() => {
        if (user.projects) {
            const chosenProjects = () => {
                if (location.pathname.includes("followed")) {
                    return user.followed
                } else if (location.pathname.includes("liked")) {
                    return user.liked
                } else if (location.pathname.includes("favorites")) {
                    return user.favorites
                } else {
                    return user.projects
                }
            }
            const fetch = () => {
                setLoading(true)
                const promises = chosenProjects().map(async id => {
                    return await axios
                        .get(`${process.env.REACT_APP_API_URL}api/project/${id}`)
                        .then(res => res.data)
                        .catch(err => console.log(err))
                })
                Promise.all(promises).then(res => {
                    setProjects(res)
                    setProjectsToDisplay(res)
                    setLoading(false)
                })
            }
            fetch()
        }
    }, [user.projects, user.favorites, user.followed, user.liked, location.pathname])

    return (
        <div className="profil_page col-12 col-lg-9 relative">
            <div className="content_nav !mb-4">
                <NavLink to="/profil/projects"><MdInsertChart />Projets<span>{user.projects?.length}</span></NavLink>
                <NavLink to="favorites"><AiFillStar />Favoris<span>{user.favorites?.length}</span></NavLink>
                <NavLink to="followed"><MdOutlineBookmark />Suivis<span>{user.followed?.length}</span></NavLink>
                <NavLink to="liked" className><IoHeart />Soutenus<span>{user.liked?.length}</span></NavLink>
            </div>
            <div className="search_header">
                <h2>Projects <span>{projectsToDisplay.length}</span></h2>
                <IconInput
                    className="is_start_icon ml-auto mr-2"
                    icon={<BiSearchAlt />}
                    placeholder="Rechercher un projet..."
                    value={query}
                    onInput={e => setQuery(e.target.value)}
                    onChange={oneLevelSearch}
                    cross
                    onClean={() => setQuery("")}
                />
                <DropdownInput
                    placeholder="Filtrer"
                    value={filter}
                    className="right"
                    cross
                    onClean={() => { setFilter(""); setProjectsToDisplay(projects) }}
                >
                    <div onClick={() => { sortByRecent(projects); setFilter("Plus récent au plus ancien") }}>Plus récent au plus ancien</div>
                    <div onClick={() => { sortByOld(projects); setFilter("Plus ancien au plus récent") }}>Plus ancien au plus récent</div>
                    <div onClick={() => { sortByWorkedOn(projects); setFilter("En préparation") }}>En préparation</div>
                    <div onClick={() => { sortByInProgress(projects); setFilter("En cours") }}>En cours</div>
                    <div onClick={() => { sortByDone(projects); setFilter("Terminé") }}>Terminé</div>
                </DropdownInput>
            </div>
            <div className="profil_page-body !justify-start">
                <Routes>
                    <Route index element={
                        !isLoading ? (
                            projectsToDisplay.length > 0 ? (
                                projectsToDisplay.map((element, key) => {
                                    return (
                                        <div className="p-2" key={key}>
                                            <Card
                                                className={isInResults(element, 'block')}
                                                element={element}
                                                user={user}
                                                websocket={websocket}
                                            />
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="empty-content">
                                    <img src={`${process.env.REACT_APP_API_URL}files/img/logo.png`} alt="Vous n'avez aucun projets à afficher..." />
                                    <p>Vous n'avez aucun projets à afficher...</p>
                                </div>
                            )
                        ) : (
                            <div className="loading-container">
                                <SmallLoader />
                            </div>
                        )
                    } />
                    <Route path="followed" element={
                        !isLoading ? (
                            projectsToDisplay.length > 0 ? (
                                projectsToDisplay.map((element, key) => {
                                    return (
                                        <div className="p-2" key={key}>
                                            <Card
                                                className={isInResults(element, 'block')}
                                                element={element}
                                                user={user}
                                                websocket={websocket}
                                            />
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="empty-content">
                                    <img src={`${process.env.REACT_APP_API_URL}files/img/logo.png`} alt="Vous n'avez aucun projets à afficher..." />
                                    <p>Vous n'avez aucun projets à afficher...</p>
                                </div>
                            )
                        ) : (
                            <div className="loading-container">
                                <SmallLoader />
                            </div>
                        )
                    } />
                    <Route path="liked" element={
                        !isLoading ? (
                            projectsToDisplay.length > 0 ? (
                                projectsToDisplay.map((element, key) => {
                                    return (
                                        <div className="p-2" key={key}>
                                            <Card
                                                className={isInResults(element, 'block')}
                                                element={element}
                                                user={user}
                                                websocket={websocket}
                                            />
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="empty-content">
                                    <img src={`${process.env.REACT_APP_API_URL}files/img/logo.png`} alt="Vous n'avez aucun projets à afficher..." />
                                    <p>Vous n'avez aucun projets à afficher...</p>
                                </div>
                            )
                        ) : (
                            <div className="loading-container">
                                <SmallLoader />
                            </div>
                        )
                    } />
                    <Route path="favorites" element={
                        !isLoading ? (
                            projectsToDisplay.length > 0 ? (
                                projectsToDisplay.map((element, key) => {
                                    return (
                                        <div className="p-2" key={key}>
                                            <Card
                                                className={isInResults(element, 'block')}
                                                element={element}
                                                user={user}
                                                websocket={websocket}
                                            />
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="empty-content">
                                    <img src={`${process.env.REACT_APP_API_URL}files/img/logo.png`} alt="Vous n'avez aucun projets à afficher..." />
                                    <p>Vous n'avez aucun projets à afficher...</p>
                                </div>
                            )
                        ) : (
                            <div className="loading-container">
                                <SmallLoader />
                            </div>
                        )
                    } />
                </Routes>
            </div>
        </div>
    )
}

export default Projects