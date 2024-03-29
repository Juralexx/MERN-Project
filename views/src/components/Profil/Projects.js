import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Icon from '../tools/icons/Icon'
import Oval from '../../components/tools/loaders/Oval'
import Card from '../tools/components/Card'
import { DropdownInput, IconInput } from '../tools/global/Inputs'
import { addClass } from '../Utils'
import { useOneLevelSearch } from '../tools/custom-hooks/useOneLevelSearch'
import { sortByOld, sortByRecent, sortByState } from '../projects/functions'

const Projects = ({ user, websocket }) => {
    const [projects, setProjects] = useState({
        type: "projects",
        array: []
    })
    const [projectsToDisplay, setProjectsToDisplay] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [filter, setFilter] = useState("")
    const { oneLevelSearch, isElementInSearchResults, search, setSearch } = useOneLevelSearch(projects.array, 'title')

    /**
     * 
     */

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

    /**
     * 
     */

    return (
        <div className="profil-page col-12 col-lg-9">
            <div className="content_nav !mb-4 custom-scrollbar-x">
                <div className={addClass(projects.type === "projects", 'active')} onClick={() => setProjects(pros => ({ ...pros, type: "projects" }))}>
                    Projets <span>{user.projects?.length}</span>
                </div>
                <div className={addClass(projects.type === "favorites", 'active')} onClick={() => setProjects(pros => ({ ...pros, type: "favorites" }))}>
                    Favoris <span>{user.favorites?.length}</span>
                </div>
                <div className={addClass(projects.type === "followed", 'active')} onClick={() => setProjects(pros => ({ ...pros, type: "followed" }))}>
                    Suivis <span>{user.followed?.length}</span>
                </div>
                <div className={addClass(projects.type === "liked", 'active')} onClick={() => setProjects(pros => ({ ...pros, type: "liked" }))}>
                    Soutenus <span>{user.liked?.length}</span>
                </div>
            </div>
            <div className="search-header">
                <h2>Projects&nbsp;<span>{projectsToDisplay.length}</span></h2>
                <div className='search-header_inputs mt-3 md:mt-0'>
                    <IconInput
                        type="text"
                        className="is_start_icon ml-auto mr-2 mb-2 sm:mb-0 md:max-w-[300px]"
                        icon={<Icon name="Search" />}
                        placeholder="Rechercher un projet..."
                        value={search.query}
                        onInput={e => setSearch(prevState => ({ ...prevState, query: e.target.value }))}
                        onChange={oneLevelSearch}
                        cross
                        onClean={() => {
                            setProjectsToDisplay(projects.array)
                            setSearch(prevState => ({ ...prevState, query: '' }))
                        }}
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
                            setProjectsToDisplay(sortByState(projects.array, 'worked on'))
                            setFilter("En préparation")
                        }}>
                            En préparation
                        </div>
                        <div onClick={() => {
                            setProjectsToDisplay(sortByState(projects.array, 'in progress'))
                            setFilter("En cours")
                        }}>
                            En cours
                        </div>
                        <div onClick={() => {
                            setProjectsToDisplay(sortByState(projects.array, 'done'))
                            setFilter("Terminé")
                        }}>
                            Terminé
                        </div>
                    </DropdownInput>
                </div>
            </div>
            <div className="profil-page_body !justify-start">
                {!isLoading ? (
                    projectsToDisplay.length > 0 ? (
                        <div className="profil-page_projects !justify-start">
                            {projectsToDisplay.map((element, key) => {
                                return (
                                    <div className={search.query.length > 0 ? isElementInSearchResults(element, 'block') : 'block'} key={key}>
                                        <Card
                                            project={element}
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
                        <Oval />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Projects