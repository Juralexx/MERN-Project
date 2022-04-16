import React, { useRef, useState } from 'react'
import { NavLink} from 'react-router-dom'
import { stateToBackground, stateToString } from '../../home/functions'
import { useClickOutside } from '../../tools/functions/useClickOutside'
import { sortByDone, sortByInProgress, sortByOld, sortByRecent, sortByWorkedOn } from './functions'
import { ClassicInput, DropdownInput, IconInput } from '../../tools/components/Inputs'
import Categories from '../../home/Categories'
import { BiCategoryAlt, BiTask } from 'react-icons/bi'
import { BsCaretDownFill, BsFillPeopleFill } from 'react-icons/bs'
import { MdGroups, MdOutlineDescription, MdOutlineMessage, MdReadMore } from 'react-icons/md'

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
                <div className="dashboard-projects-header-container">
                    <div className="dashboard-projects-header-top">
                        <h1>Mes projects <span>{projects.length}</span></h1>
                    </div>
                    <div className="dashboard-projects-header-bottom">
                        <div className="dashboard-projects-header-bottom-left">
                            <ClassicInput className="full" placeholder="Rechercher un projet..." value={searchQuery} onInput={e => setSearchQuery(e.target.value)} onChange={searchProject} cross clean={() => setSearchQuery("")} />
                        </div>
                        <div className="dashboard-projects-header-bottom-right" ref={categoriesRef}>
                            <IconInput
                                className="is-start-icon"
                                placeholder="Catégorie"
                                readOnly
                                icon={<BiCategoryAlt />}
                                endIcon={<BsCaretDownFill />}
                                onClick={() => setOpenCategoriesPicker(!openCategoriesPicker)}
                                onChange={() => setCategory(category)}
                                value={category}
                            />
                            <Categories className="right" open={openCategoriesPicker} setOpen={setOpenCategoriesPicker} category={category} setCategory={setCategory} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-container">
                <div className="content-box">
                    <div className="dashboard-projects-tools">
                        <div>
                            <div className="infos blue mr-2">Projets en ligne ({(projects.filter(e => e.state === "worked on" || e.state === "in progress")).length})</div>
                            <div className="infos green">Projects terminés ({(projects.filter(e => e.state === "done")).length})</div>
                        </div>
                        <div>
                            <DropdownInput useRef={filterMenu} placeholder="Filtrer" cross readOnly value={filter} className="right ml-3" open={display} onClick={() => setDisplay(!display)} clean={() => { setFilter(""); setPros(projects) }}>
                                <div onClick={() => sortByRecent(projects, setPros, setFilter, setDisplay)}>Plus récent au plus ancien</div>
                                <div onClick={() => sortByOld(projects, setPros, setFilter, setDisplay)}>Plus ancien au plus récent</div>
                                <div onClick={() => sortByWorkedOn(projects, setPros, setFilter, setDisplay)}>En préparation</div>
                                <div onClick={() => sortByInProgress(projects, setPros, setFilter, setDisplay)}>En cours</div>
                                <div onClick={() => sortByDone(projects, setPros, setFilter, setDisplay)}>Terminé</div>
                            </DropdownInput>
                        </div>
                    </div>
                    {projects &&
                        pros.map((element, key) => {
                            return (
                                <div className="project-card" key={key} style={{ display: search ? (isResults.includes(element) ? "flex" : "none") : "flex" }}>
                                    <div className="project-picture">
                                        <img src={element.pictures[0]} alt={element.title} />
                                    </div>
                                    <div className="project-card-content">
                                        <div className="project-card-content-top">
                                            <div className="project-title">
                                                <h2><NavLink to={`${element.URLID}/${element.URL}`}>{element.title}</NavLink></h2>
                                                <div className={`state ${stateToBackground(element)}`}>{stateToString(element.state)}</div>
                                            </div>
                                            <h3>{element.subtitle}</h3>
                                            <div className="location">{element.location} - {element.department} ({element.code_department}) - {element.region} | {element.category}</div>
                                        </div>
                                        <div className="project-tags">
                                            {element.tags.slice(0, 5).map((tag, i) => {
                                                return <div key={i}>#{tag}</div>
                                            })}
                                            {element.tags.length > 5 &&
                                                <div className="more-tags">+{element.tags.length - 5}</div>
                                            }
                                        </div>
                                        <div className="project-card-content-infos">
                                            <div className="contributors"><BsFillPeopleFill /><p>{element.numberofcontributors}</p></div>
                                        </div>
                                        <div className="description">{element.description}</div>
                                    </div>
                                    <div className="project-nav">
                                        <NavLink to={`${element.URLID}/${element.URL}`}><MdReadMore />Voir</NavLink>
                                        <NavLink to={`${element.URLID}/${element.URL}/about`}><MdOutlineDescription />À propos</NavLink>
                                        <NavLink to={`${element.URLID}/${element.URL}/tasks`}><BiTask />Tâches</NavLink>
                                        <NavLink to={`${element.URLID}/${element.URL}/messenger`}><MdOutlineMessage />Messenger</NavLink>
                                        <NavLink to={`${element.URLID}/${element.URL}/members`}><MdGroups />Membres</NavLink>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        </>
    )
}

export default Projects