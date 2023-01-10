import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useOneLevelSearch } from '../tools/hooks/useOneLevelSearch'
import { sortByDone, sortByInProgress, sortByOld, sortByRecent, sortByWorkedOn } from '../project/projects/functions'
import { DropdownInput, IconInput } from '../tools/global/Inputs'
import { OvalLoader } from '../tools/global/Loader'
import Card from '../tools/components/Card'
import { AiOutlineSearch } from 'react-icons/ai'

const Projects = ({ user, websocket }) => {
    const [projects, setProjects] = useState({
        type: "projects",
        array: []
    })
    const [projectsToDisplay, setProjectsToDisplay] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [filter, setFilter] = useState("")
    const { oneLevelSearch, isInResults, query, setQuery } = useOneLevelSearch(projects.array, 'title')

    useEffect(() => {
        if (user.projects) {
            const fetch = () => {
                setLoading(true)
                const promises = user[projects.type].map(async id => {
                    return await axios
                        .get(`${process.env.REACT_APP_API_URL}api/project/${id}`)
                        .then(res => res.data)
                        .catch(err => console.log(err))
                })
                Promise.all(promises).then(res => {
                    setProjects(pros => ({ ...pros, array: res }))
                    setProjectsToDisplay(res)
                    setLoading(false)
                })
            }
            fetch()
        }
    }, [user, projects.type])

    return (
        <div className="profil-page col-12 col-lg-9">
            <div className="content_nav !mb-4">
                <div onClick={() => setProjects(pros => ({ ...pros, type: "projects" }))}>
                    Projets<span>{user.projects?.length}</span>
                </div>
                <div onClick={() => setProjects(pros => ({ ...pros, type: "favorites" }))}>
                    Favoris<span>{user.favorites?.length}</span>
                </div>
                <div onClick={() => setProjects(pros => ({ ...pros, type: "followed" }))}>
                    Suivis<span>{user.followed?.length}</span>
                </div>
                <div onClick={() => setProjects(pros => ({ ...pros, type: "liked" }))}>
                    Soutenus<span>{user.liked?.length}</span>
                </div>
            </div>
            <div className="search_header">
                <h2>Projects <span>{projectsToDisplay.length}</span></h2>
                <IconInput
                    type="text"
                    className="is_start_icon ml-auto mr-2"
                    icon={<AiOutlineSearch />}
                    placeholder="Rechercher un projet..."
                    value={query}
                    onInput={e => setQuery(e.target.value)}
                    onChange={oneLevelSearch}
                    cross
                    onClean={() => { setProjectsToDisplay(projects.array); setQuery("") }}
                />
                <DropdownInput
                    placeholder="Filtrer"
                    value={filter}
                    cross
                    onChange={() => { }}
                    onClean={() => { setFilter(""); setProjectsToDisplay(projects.array) }}
                >
                    <div onClick={() => {
                        setProjectsToDisplay(sortByRecent(projects.array))
                        setFilter("Plus récent au plus ancien")
                    }}>
                        Plus récent au plus ancien
                    </div>
                    <div onClick={() => {
                        setProjectsToDisplay(sortByOld(projects.array))
                        setFilter("Plus ancien au plus récent")
                    }}>
                        Plus ancien au plus récent
                    </div>
                    <div onClick={() => {
                        setProjectsToDisplay(sortByWorkedOn(projects.array))
                        setFilter("En préparation")
                    }}>
                        En préparation
                    </div>
                    <div onClick={() => {
                        setProjectsToDisplay(sortByInProgress(projects.array))
                        setFilter("En cours")
                    }}>
                        En cours
                    </div>
                    <div onClick={() => {
                        setProjectsToDisplay(sortByDone(projects.array))
                        setFilter("Terminé")
                    }}>
                        Terminé
                    </div>
                </DropdownInput>
            </div>
            <div className="profil-page_body !justify-start">
                {!isLoading ? (
                    projectsToDisplay.length > 0 ? (
                        <div className="profil-page_projects !justify-start">
                            {projectsToDisplay.map((element, key) => {
                                return (
                                    <div className={query.length > 0 ? isInResults(element, 'block') : 'block'} key={key}>
                                        <Card
                                            element={element}
                                            user={user}
                                            websocket={websocket}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="empty-content">
                            <img src={`${process.env.REACT_APP_API_URL}files/img/logo.png`} alt="Vous n'avez aucun projets à afficher..." />
                            <p>Vous n'avez aucun projets à afficher...</p>
                        </div>
                    )
                ) : (
                    <div className="loading-container">
                        <OvalLoader />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Projects