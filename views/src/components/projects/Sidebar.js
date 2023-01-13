import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { addClass, fullImage } from '../Utils'
import Icon from '../tools/icons/Icon'

const Sidebar = ({ user, projects, isLoading }) => {
    const [reduced, setReduced] = useState(true)
    const [hovered, setHovered] = useState(false)
    const [submenu, setSubmenu] = useState(0)
    const localStore = localStorage.getItem("sideState")
    const isThisActive = ({ isActive }) => (!isActive ? "unactive" : "active")

    const handleState = () => {
        if (!reduced) {
            localStorage.setItem("sideState", "closed");
            setReduced(true)
        } else {
            localStorage.setItem("sideState", "open");
            setReduced(false)
        }
    }

    useEffect(() => {
        if (!isLoading)
            if (localStore !== null && localStore === "closed") setReduced(true)
            else if (localStore !== null && localStore === "open") setReduced(false)
            else localStorage.setItem("sideState", "open")
    }, [isLoading, localStore])

    return (
        <div className={`sidebar ${addClass(reduced && !hovered, "reduced")}`}>
            <div className={`sidebar-header ${addClass(reduced && !hovered, "reduced")}`}>
                <Link to="/projects">
                    <div className={`sidebar-header-inner ${addClass(reduced && !hovered, "reduced")}`}>
                        <p>Mes Projets <span>{projects.length}</span></p>
                    </div>
                </Link>
                <div className="sidebar-header-toggle" onClick={handleState}>
                    <Icon name="DoubleArrowLeft" />
                </div>
            </div>
            <div className="sidebar-inner custom-scrollbar">
                {!isLoading ? (
                    projects.map((element, key) => {
                        return (
                            <div className="sidebar-container" key={key} onMouseEnter={() => reduced && setHovered(true)} onMouseLeave={() => reduced && setHovered(false)}>
                                <NavLink to={`${element.URLID}/${element.URL}`} className={isThisActive} onClick={() => setReduced(true)}>
                                    <div className={`sidebar-title ${addClass(reduced && !hovered, "reduced")}`} onClick={() => setSubmenu(key)}>
                                        <div className="sidebar-title-inner">
                                            <div className="sidebar-img" style={fullImage(element.pictures[0])}></div>
                                            <div className={`sidebar-name ${addClass(reduced && !hovered, "reduced")} one_line`}>{element.title}</div>
                                        </div>
                                        <div className={`${reduced && !hovered ? "hidden" : ""}`}>
                                            <Icon name="CaretRight" />
                                        </div>
                                    </div>
                                </NavLink>
                                {submenu === key && (
                                    <div className={`sidebar-submenu ${addClass(reduced && !hovered, "reduced")}`} onClick={() => setReduced(true)}>
                                        <NavLink to={`${element.URLID}/${element.URL}/about`} className={isThisActive}>
                                            <Icon name="FilesMultiples" />
                                            <div className="sidebar-submenu-text">À propos</div>
                                        </NavLink>
                                        <NavLink to={`${element.URLID}/${element.URL}/tasks`} className={isThisActive}>
                                            <Icon name="Tasks" />
                                            <div className="sidebar-submenu-text">Tâches <span>{element.tasks?.length}</span></div>
                                        </NavLink>
                                        <NavLink to={`${element.URLID}/${element.URL}/messenger`} className={isThisActive}>
                                            <Icon name="Chat" />
                                            <div className="sidebar-submenu-text">Messenger</div>
                                        </NavLink>
                                        <NavLink to={`${element.URLID}/${element.URL}/members`} className={isThisActive}>
                                            <Icon name="Group" />
                                            <div className="sidebar-submenu-text">Membres</div>
                                        </NavLink>
                                    </div>
                                )}
                            </div>
                        )
                    })
                ) : (
                    [...Array(5)].map((_, key) => {
                        return (
                            <div className={`sidebar-skeleton ${addClass(reduced && !hovered, "reduced")}`} key={key}>
                                <div className="sidebar-skeleton-card">
                                    <div className="sidebar-skeleton-round animate-pulse"></div>
                                    <div className="sidebar-skeleton-text animate-pulse"></div>
                                </div>
                                <div className={`${reduced && !hovered ? "hidden" : "flex"}`}>
                                    <Icon name="CaretRight" />
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
            {user &&
                <div className={`sidebar-bottom ${addClass(reduced && !hovered, "reduced")}`}>
                    <div className="sidebar-bottom-avatar" style={fullImage(user.picture)}></div>
                    <div className="sidebar-bottom-pseudo">{user.pseudo}</div>
                </div>
            }
        </div>
    )
}

export default Sidebar