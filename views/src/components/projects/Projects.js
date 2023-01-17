import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { stateToBackground, stateToString } from './functions'
import { sortByDone, sortByInProgress, sortByOld, sortByRecent, sortByWorkedOn } from './functions'
import { ClassicInput, DropdownInput } from '../tools/global/Inputs'
import { dateParser, removeAccents } from '../Utils'
import { categories } from '../../api/categories'
import { Button } from '../tools/global/Button'
import FooterLight from '../FooterLight';
import Icon from '../tools/icons/Icon'

const Projects = ({ projects }) => {
    const [projectsToShow, setProjectsToShow] = useState(projects)
    const [category, setCategory] = useState("")
    const [filter, setFilter] = useState("")

    const [search, setSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isResults, setResults] = useState([])
    const regexp = new RegExp(searchQuery, 'i')

    useEffect(() => {
        if (category.length > 0) {
            let projectsArr = projectsToShow.filter(project => removeAccents(project.category) === removeAccents(category))
            setProjectsToShow(projectsArr)
        }
    }, [category, projectsToShow])

    const searchProject = () => {
        if (searchQuery.length > 2) {
            const response = projectsToShow.filter(project => regexp.test(removeAccents(project.title)))
            setResults(response)
            setSearch(true)
            if (!isResults || isResults.length === 0) {
                setProjectsToShow(projects)
            }
        } else setSearch(false)
    }

    return (
        <>
            <div className="dashboard-projects-header">
                <div className="container-lg">
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
                                value={category}
                                onChange={() => { }}
                                onClean={() => { setCategory(""); searchProject() }}
                            >
                                {categories.map((category, key) => {
                                    return <div key={key} onClick={() => { setCategory(category.name); searchProject() }}>{category.name}</div>
                                })}
                            </DropdownInput>
                        </div>
                    </div>
                </div>
            </div>
            <div className='dashboard-projects-body'>
                <div className="container-lg py-5">
                    <div className="dashboard-projects-tools">
                        <div>
                            <button className='mr-1'>En ligne <span>{(projects.filter(e => e.state === "worked on" || e.state === "in progress")).length}</span></button>
                            <button className='ml-1 '>Terminés <span>{(projects.filter(e => e.state === "done")).length}</span></button>
                        </div>
                        <div>
                            <DropdownInput
                                placeholder="Filtrer"
                                cross
                                value={filter}
                                onChange={e => setFilter(e.target.value)}
                                onClean={() => { setFilter(""); setProjectsToShow(projects) }}
                            >
                                <div onClick={() => { sortByRecent(projects); setFilter("Plus récent au plus ancien") }}>Plus récent au plus ancien</div>
                                <div onClick={() => { sortByOld(projects); setFilter("Plus ancien au plus récent") }}>Plus ancien au plus récent</div>
                                <div onClick={() => { sortByWorkedOn(projects); setFilter("En préparation") }}>En préparation</div>
                                <div onClick={() => { sortByInProgress(projects); setFilter("En cours") }}>En cours</div>
                                <div onClick={() => { sortByDone(projects); setFilter("Terminé") }}>Terminé</div>
                            </DropdownInput>
                        </div>
                    </div>
                    {projects.length > 0 ? (
                        projectsToShow.map((element, key) => {
                            return (
                                <div className="row project-card" key={key} style={{ display: search ? (isResults.includes(element) ? "flex" : "none") : "flex" }}>
                                    <div className="col-0 col-md-3 project-picture">
                                        <img src={element.pictures[0]} alt={element.title} />
                                    </div>
                                    <div className="col-12 col-md-9 project-card-content">
                                        <div className="project-card-content-top">
                                            <h2 className='one_line'>
                                                <Link to={`${element.URLID}/${element.URL}`}>{element.title}</Link>
                                            </h2>
                                            <h3 className='one_line'>{element.subtitle}</h3>
                                            <div className={`state ${stateToBackground(element)}`}>{stateToString(element.state)}</div>
                                            <div className="infos_field">
                                                <Icon name="Calendar" /> {dateParser(element.createdAt)}
                                            </div>
                                            <div className="infos_field">
                                                <Icon name="Position" /> {element.location.city} - {element.location.department} ({element.location.code_department})
                                            </div>
                                            <div className="infos_field">
                                                <Icon name="List" /> {element.category}
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
                        })
                    ) : (
                        <div className="no_content">
                            <div className="svg_container">
                                <Icon name="Dashboard" />
                            </div>
                            <p>Vous n'avez pas encore déposé de projet.</p>
                            <Button>
                                <NavLink to={`/add-project`}>Déposer un projet</NavLink>
                            </Button>
                        </div>
                    )}
                    {search && isResults.length === 0 &&
                        <div className="empty-array">
                            <Icon name="Search" />
                            <div>Aucun resultat ne correspond à votre recherche</div>
                        </div>
                    }
                </div>
            </div>
            <FooterLight />
        </>
    )
}

export default Projects