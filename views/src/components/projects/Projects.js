import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import ProjectCard from './ProjectCard'
import Icon from '../tools/icons/Icon'
import { ClassicInput, DropdownInput } from '../tools/global/Inputs'
import { Button } from '../tools/global/Button'
import FooterLight from '../FooterLight';
import { categories } from '../../api/categories'
import { removeAccents } from '../Utils'
import { filterToString, sortProjects } from './functions'

const Projects = ({ projects, user }) => {

    const created = (array) => array.filter(item => item.poster._id === user._id)
    const participations = (array) => array.filter(item => item.poster._id !== user._id)

    const [projectsToShow, setProjectsToShow] = useState({
        all: projects,
        created: created(projects),
        participations: participations(projects),
    })

    /**
     * 
     */

    const [search, setSearch] = useState({
        isSearching: false,
        isSearchActive: false,
        query: "",
        results: [],
        filters: {
            category: '',
            filter: ''
        }
    })
    const regexp = new RegExp(removeAccents(search.query), 'i')

    useEffect(() => {
        const filters = search.filters
        let results = []

        if (search.isSearchActive && search.query.length < 2 && filters.category === '' && filters.filter === '') {
            setSearch(data => ({ ...data, isSearchActive: false }))
        } 

        if (search.isSearching) {
            setSearch(data => ({ ...data, isSearchActive: true }))

            if (search.query.length >= 2) {
                let response = projects.filter(project => regexp.test(removeAccents(project.title)))
                setSearch(data => ({ ...data, results: response }))

                // Si la recherche est lancée mais aucune categorie ni aucun filtre n'est activé
                if (filters.category === '' && filters.filter === '') {
                    setProjectsToShow(datas => ({
                        ...datas,
                        created: created(response),
                        participations: participations(response)
                    }))
                }
                // Si la recherche est lancée et qu'une categorie est activée mais aucun filtre n'est selectionné
                else if (filters.category !== '' && filters.filter === '') {
                    results = response.filter(project => project.category === filters.category)
                    setProjectsToShow(datas => ({
                        ...datas,
                        created: created(results),
                        participations: participations(results)
                    }))
                }
                // Si la recherche est lancée et qu'aucune categorie n'est activée mais qu'un filtre est selectionné
                else if (filters.category === '' && filters.filter !== '') {
                    results = sortProjects(response, filters.filter)
                    setProjectsToShow(datas => ({
                        ...datas,
                        created: created(results),
                        participations: participations(results)
                    }))
                }
                // Si la recherche est lancée et qu'une categorie est activée et qu'un filtre est selectionné
                else if (filters.category !== '' && filters.filter !== '') {
                    let categorySort = response.filter(project => project.category === filters.category)
                    results = sortProjects(categorySort, filters.filter)
                    setProjectsToShow(datas => ({
                        ...datas,
                        created: created(results),
                        participations: participations(results)
                    }))
                }
            } else if (search.query.length < 2) {
                setSearch(data => ({ ...data, isSearching: false }))

                // Si la recherche n'est pas lancée et qu'aucune categorie ni aucun filtre n'est activé
                if (filters.category === '' && filters.filter === '') {
                    setProjectsToShow(datas => ({
                        ...datas,
                        created: created(projects),
                        participations: participations(projects)
                    }))
                }
                // Si la recherche n'est pas lancée et qu'une categorie est selectionnée mais aucun filtre n'est activé
                else if (filters.category !== '' && filters.filter === '') {
                    results = projects.filter(project => project.category === filters.category)
                    setProjectsToShow(datas => ({
                        ...datas,
                        created: created(results),
                        participations: participations(results)
                    }))
                }
                // Si la recherche n'est pas lancée et qu'aucune categorie n'est activée mais qu'un filtre est selectionné
                else if (filters.category === '' && filters.filter !== '') {
                    results = sortProjects(projects, filters.filter)
                    setProjectsToShow(datas => ({
                        ...datas,
                        created: created(results),
                        participations: participations(results)
                    }))
                }
                // Si la recherche n'est pas lancée et qu'une categorie est activée et qu'un filtre est selectionné
                else if (filters.category !== '' && filters.filter !== '') {
                    let categorySort = projects.filter(project => project.category === filters.category)
                    results = sortProjects(categorySort, filters.filter)
                    setProjectsToShow(datas => ({
                        ...datas,
                        created: created(results),
                        participations: participations(results)
                    }))
                }
            }
            setSearch(datas => ({ ...datas, isSearching: false }))
        }
    }, [projects, search, regexp])

    /**
     * 
     */

    return (
        <>
            <div className="dashboard-projects-header">
                <div className="container-lg">
                    <div className="dashboard-projects-header-top">
                        <h1>Mes projects <span>{projects.length}</span></h1>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-8">
                            <ClassicInput
                                className="full"
                                placeholder="Rechercher un projet..."
                                value={search.query}
                                onChange={e => setSearch(data => ({ ...data, isSearching: true, query: e.target.value }))}
                                cross
                                onClean={() => setSearch(data => ({ ...data, isSearching: true, query: '' }))}
                            />
                            {search.isSearchActive && search.results.length === 0 &&
                                <div className="py-2 text-center">
                                    Aucun résultat ne correspond à votre recherche
                                </div>
                            }
                        </div>
                        <div className="col-12 col-sm-4 !mt-2 sm:!mt-0">
                            <DropdownInput
                                placeholder="Catégorie"
                                value={search.filters.category}
                                onChange={() => { }}
                                cross
                                onClean={() => setSearch(datas => ({ ...datas, isSearching: true, filters: { ...datas.filters, category: '' } }))}
                            >
                                {categories.map((category, key) => {
                                    return (
                                        <div key={key} onClick={() => setSearch(datas => ({ ...datas, isSearching: true, filters: { ...datas.filters, category: category.name } }))}>
                                            {category.name}
                                        </div>
                                    )
                                })}
                            </DropdownInput>
                        </div>
                    </div>
                </div>
            </div>
            <div className='dashboard-projects-body'>
                <div className="container-lg pt-5">
                    <div className="dashboard-projects-tools">
                        <div>
                            <button className='mr-1'>
                                En ligne <span>{(projects.filter(e => e.state === "worked on" || e.state === "in progress")).length}</span>
                            </button>
                            <button className='ml-1'>
                                Terminés <span>{(projects.filter(e => e.state === "done")).length}</span>
                            </button>
                        </div>
                        <div>
                            <DropdownInput
                                placeholder="Filtrer"
                                value={filterToString(search.filters.filter)}
                                onChange={() => { }}
                                cross
                                onClean={() => setSearch(datas => ({ ...datas, isSearching: true, filters: { ...datas.filters, filter: '' } }))}
                            >
                                <div onClick={() => setSearch(datas => ({ ...datas, isSearching: true, filters: { ...datas.filters, filter: 'chronological' } }))}>
                                    Plus récent au plus ancien
                                </div>
                                <div onClick={() => setSearch(datas => ({ ...datas, isSearching: true, filters: { ...datas.filters, filter: 'unchronological' } }))}>
                                    Plus ancien au plus récent
                                </div>
                                <div onClick={() => setSearch(datas => ({ ...datas, isSearching: true, filters: { ...datas.filters, filter: 'worked on' } }))}>
                                    En préparation
                                </div>
                                <div onClick={() => setSearch(datas => ({ ...datas, isSearching: true, filters: { ...datas.filters, filter: 'in progress' } }))}>
                                    En cours
                                </div>
                                <div onClick={() => setSearch(datas => ({ ...datas, isSearching: true, filters: { ...datas.filters, filter: 'done' } }))}>
                                    Terminé
                                </div>
                            </DropdownInput>
                        </div>
                    </div>
                </div>
                <div className='container-lg pb-5 !px-0 sm:!px-3'>
                    {projectsToShow.created.length > 0 || projectsToShow.participations.length > 0 ? (
                        <>
                            {projectsToShow.created.length > 0 && (
                                <>
                                    <div className='dashboard-project-title'>
                                        Créés <span>- {projectsToShow.created.length}</span>
                                    </div>
                                    {projectsToShow.created.map((element, key) => {
                                        return <ProjectCard element={element} key={key} />
                                    })}
                                </>
                            )}
                            {projectsToShow.participations.length > 0 && (
                                <>
                                    <div className='dashboard-project-title'>
                                        Participations <span>- {projectsToShow.participations.length}</span>
                                    </div>
                                    {projectsToShow.participations.map((element, key) => {
                                        return <ProjectCard element={element} key={key} />
                                    })}
                                </>
                            )}
                        </>
                    ) : (
                        search.isSearchActive ? (
                            <div className="empty-array">
                                <Icon name="Search" />
                                <div>Aucun résultat ne correspond à votre recherche</div>
                            </div>
                        ) : (
                            <div className="no_content">
                                <div className="svg_container">
                                    <Icon name="Dashboard" />
                                </div>
                                <p>
                                    Vous n'avez pas encore déposé ou participé à un projet.<br/>
                                    Vos projets en cours s'afficherons ici.
                                </p>
                                <Button>
                                    <NavLink to={`/add-project`}>Déposer un projet</NavLink>
                                </Button>
                            </div>
                        )
                    )}
                </div>
            </div>
            <FooterLight />
        </>
    )
}

export default Projects