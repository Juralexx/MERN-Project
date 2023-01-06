import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { stateToBackground, stateToString } from '../functions'
import { useClickOutside } from '../../tools/hooks/useClickOutside'
import { sortByDone, sortByInProgress, sortByOld, sortByRecent, sortByWorkedOn } from './functions'
import { ClassicInput, DropdownInput, IconInput } from '../../tools/global/Inputs'
import CategoriesPicker from '../../home/CategoriesPicker'
import { BiCategoryAlt } from 'react-icons/bi'
import { BsCaretDownFill } from 'react-icons/bs'
import { IoAlbumsOutline, IoCalendarClearOutline, IoLocationOutline } from 'react-icons/io5'
import { dateParser } from '../../Utils'

const Projects = ({ user, websocket, projects, setProjects }) => {
    const [pros, setPros] = useState(projects)
    const [openCategoriesPicker, setOpenCategoriesPicker] = useState(false)
    const [category, setCategory] = useState("")
    const categoriesRef = useRef()
    useClickOutside(categoriesRef, setOpenCategoriesPicker, false)
    const filterMenu = useRef()
    const [display, setDisplay] = useState(false)
    useClickOutside(filterMenu, setDisplay, false)
    const [filter, setFilter] = useState("")

    const [search, setSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isResults, setResults] = useState([])
    const isEmpty = !isResults || isResults.length === 0
    const regexp = new RegExp(searchQuery, 'i')
    const searchProject = () => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        if (searchQuery.length > 2) {
            const response = projects.filter(project => regexp.test(project.title))
            setResults(response)
            setSearch(true)
            if (isEmpty) {
                setSearch(false)
            }
        } else { setSearch(false) }
    }

    return (
        <>
            <div className="dashboard-projects-header">
                <div className="container">
                    <div className="dashboard-projects-header-top">
                        <h1>Mes projects <span>{projects.length}</span></h1>
                    </div>
                    <div className="dashboard-projects-header-bottom">
                        <div className="dashboard-projects-header-bottom-left">
                            <ClassicInput className="full" placeholder="Rechercher un projet..." value={searchQuery} onInput={e => setSearchQuery(e.target.value)} onChange={searchProject} cross clean={() => setSearchQuery("")} />
                        </div>
                        <div className="dashboard-projects-header-bottom-right" ref={categoriesRef}>
                            <IconInput
                                className="is_start_icon"
                                placeholder="Catégorie"
                                readOnly
                                icon={<BiCategoryAlt />}
                                endIcon={<BsCaretDownFill />}
                                onClick={() => setOpenCategoriesPicker(!openCategoriesPicker)}
                                onChange={() => setCategory(category)}
                                value={category}
                            />
                            <CategoriesPicker className="right no_bottom" open={openCategoriesPicker} setOpen={setOpenCategoriesPicker} category={category} setCategory={setCategory} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container py-11">
                <div className="dashboard-projects-tools">
                    <div>
                        <button>En ligne <span>{(projects.filter(e => e.state === "worked on" || e.state === "in progress")).length}</span></button>
                        <button>Terminés <span>{(projects.filter(e => e.state === "done")).length}</span></button>
                    </div>
                    <div>
                        <DropdownInput placeholder="Filtrer" cross readOnly value={filter} className="right ml-3" open={display} clean={() => { setFilter(""); setPros(projects) }}>
                            <div onClick={() => sortByRecent(projects, setPros, setFilter)}>Plus récent au plus ancien</div>
                            <div onClick={() => sortByOld(projects, setPros, setFilter)}>Plus ancien au plus récent</div>
                            <div onClick={() => sortByWorkedOn(projects, setPros, setFilter)}>En préparation</div>
                            <div onClick={() => sortByInProgress(projects, setPros, setFilter)}>En cours</div>
                            <div onClick={() => sortByDone(projects, setPros, setFilter)}>Terminé</div>
                        </DropdownInput>
                    </div>
                </div>
                {projects &&
                    pros.map((element, key) => {
                        console.log(element)
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
            </div>
        </>
    )
}

export default Projects