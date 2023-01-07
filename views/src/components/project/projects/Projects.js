import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { stateToBackground, stateToString } from '../functions'
import { sortByDone, sortByInProgress, sortByOld, sortByRecent, sortByWorkedOn } from './functions'
import { ClassicInput, DropdownInput } from '../../tools/global/Inputs'
import { dateParser, removeAccents } from '../../Utils'
import { categories } from '../../../api/categories'
import { IoAlbumsOutline, IoCalendarClearOutline, IoLocationOutline, IoSearchOutline } from 'react-icons/io5'

const Projects = ({ projects }) => {
    const [projectsToShow, setProjectsToShow] = useState(projects)
    const [category, setCategory] = useState("")
    const [filter, setFilter] = useState("")

    const [search, setSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isResults, setResults] = useState([])
    const regexp = new RegExp(searchQuery, 'i')

    const searchProject = (selectedCategory) => {
        if (selectedCategory) {
            setCategory(selectedCategory)
        }
        if (category.length > 0 || selectedCategory) {
            let projectsArr = projects.filter(project => removeAccents(project.category) === removeAccents(category))
            if (projectsArr.length > 0) {
                setProjectsToShow(projectsArr)
                if (searchQuery.length > 2) {
                    const response = projectsArr.filter(project => regexp.test(removeAccents(project.title)))
                    setResults(response)
                    setSearch(true)
                    if (!isResults || isResults.length === 0) {
                        setProjectsToShow(projects)
                    }
                } else {
                    setSearch(false)
                }
            }
        } else {
            if (searchQuery.length > 2) {
                const response = projects.filter(project => regexp.test(removeAccents(project.title)))
                setResults(response)
                setSearch(true)
                if (!isResults || isResults.length === 0) {
                    setProjectsToShow(projects)
                }
            } else {
                setSearch(false)
                setProjectsToShow(projects)
            }
        }
    }

    return (
        <>
            <div className="dashboard-projects-header">
                <div className="container">
                    <div className="dashboard-projects-header-top">
                        <h1>Mes projects <span>{projects.length}</span></h1>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <ClassicInput
                                className="full"
                                placeholder="Rechercher un projet..."
                                value={searchQuery}
                                onInput={e => setSearchQuery(e.target.value)}
                                onChange={() => searchProject()}
                                cross
                                onClean={() => { setSearchQuery(""); searchProject() }}
                            />
                        </div>
                        <div className="col-4">
                            <DropdownInput
                                placeholder="Catégorie"
                                cross
                                readOnly
                                value={category}
                                clean={() => { setCategory(""); searchProject() }}
                            >
                                {categories.map((category, key) => {
                                    return <div key={key} onClick={() => searchProject(category.name)}>{category.name}</div>
                                })}
                            </DropdownInput>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container py-11 min-h-full">
                <div className="dashboard-projects-tools">
                    <div>
                        <button>En ligne <span>{(projects.filter(e => e.state === "worked on" || e.state === "in progress")).length}</span></button>
                        <button>Terminés <span>{(projects.filter(e => e.state === "done")).length}</span></button>
                    </div>
                    <div>
                        <DropdownInput
                            placeholder="Filtrer"
                            cross
                            readOnly
                            value={filter}
                            clean={() => { setFilter(""); setProjectsToShow(projects) }}
                        >
                            <div onClick={() => sortByRecent(projects, setProjectsToShow, setFilter)}>Plus récent au plus ancien</div>
                            <div onClick={() => sortByOld(projects, setProjectsToShow, setFilter)}>Plus ancien au plus récent</div>
                            <div onClick={() => sortByWorkedOn(projects, setProjectsToShow, setFilter)}>En préparation</div>
                            <div onClick={() => sortByInProgress(projects, setProjectsToShow, setFilter)}>En cours</div>
                            <div onClick={() => sortByDone(projects, setProjectsToShow, setFilter)}>Terminé</div>
                        </DropdownInput>
                    </div>
                </div>
                {projects &&
                    projectsToShow.map((element, key) => {
                        return (
                            <div className="project-card" key={key} style={{ display: search ? (isResults.includes(element) ? "flex" : "none") : "flex" }}>
                                <div className="project-picture">
                                    <img src={element.pictures[0]} alt={element.title} />
                                </div>
                                <div className="project-card-content">
                                    <div className="project-card-content-top">
                                        <h2 className='one_line'>
                                            <Link to={`${element.URLID}/${element.URL}`}>{element.title}</Link>
                                        </h2>
                                        <h3 className='one_line'>{element.subtitle}</h3>
                                        <div className={`state ${stateToBackground(element)}`}>{stateToString(element.state)}</div>
                                        <div className="infos_field">
                                            <IoCalendarClearOutline /> {dateParser(element.createdAt)}
                                        </div>
                                        <div className="infos_field">
                                            <IoLocationOutline /> {element.location} - {element.department} ({element.code_department})
                                        </div>
                                        <div className="infos_field">
                                            <IoAlbumsOutline /> {element.category}
                                        </div>
                                    </div>
                                    <div className="project-tags">
                                        {element.tags.map((tag, i) => {
                                            return <div className="tag" key={i}><span>#</span>{tag}</div>
                                        })}
                                    </div>
                                    <div className="description">{element.description}</div>
                                </div>
                            </div>
                        )
                    })}
                {search && isResults.length === 0 &&
                    <div className="empty-array">
                        <div><IoSearchOutline /></div>
                        <div>Aucun resultat ne correspond à votre recherche</div>
                    </div>
                }
            </div>
        </>
    )
}

export default Projects