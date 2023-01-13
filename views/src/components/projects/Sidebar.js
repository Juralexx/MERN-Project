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
            if (localStore !== null && localStore === "closed")
                setReduced(true)
            else if (localStore !== null && localStore === "open")
                setReduced(false)
            else localStorage.setItem("sideState", "closed")
    }, [isLoading, localStore])

    return (
        <div className={`sidebar ${addClass(reduced && !hovered, "reduced")}`}>
            <div className="sidebar-header">
                <Link to="/projects">
                    <div className="sidebar-header-inner">
                        Mes Projets <span>{projects.length}</span>
                    </div>
                </Link>
                <Icon
                    name="DoubleArrowLeft"
                    className="sidebar-header-toggle"
                    onClick={handleState}
                />
            </div>
            <div className="sidebar-inner custom-scrollbar">
                {!isLoading ? (
                    projects.map((element, key) => {
                        return (
                            <div
                                key={key}
                                className="sidebar-container"
                                onMouseEnter={() => reduced && setHovered(true)}
                                onMouseLeave={() => reduced && setHovered(false)}
                            >
                                <NavLink
                                    to={`${element.URLID}/${element.URL}`}
                                    className={isThisActive}
                                    onClick={() => setReduced(true)}
                                >
                                    <div
                                        className="sidebar-title"
                                        onClick={() => setSubmenu(key)}
                                    >
                                        <div className="sidebar-title-inner">
                                            <div className="sidebar-img" style={fullImage(element.pictures[0])}></div>
                                            <div className="sidebar-name one_line">
                                                {element.title}
                                            </div>
                                        </div>
                                        <div className={`${reduced && !hovered ? "hidden" : ""}`}>
                                            {submenu === key ? <Icon name="CaretDown" /> : <Icon name="CaretRight" />}
                                        </div>
                                    </div>
                                </NavLink>
                                {submenu === key && (
                                    <div
                                        className="sidebar-submenu"
                                        onClick={() => setReduced(true)}
                                    >
                                        <NavLink to={`${element.URLID}/${element.URL}/about`} className={isThisActive}>
                                            <Icon name="FilesMultiples" />
                                            <div className="sidebar-submenu-text">
                                                <p>À propos</p> <Icon name="CaretRight" />
                                            </div>
                                        </NavLink>
                                        <NavLink to={`${element.URLID}/${element.URL}/tasks`} className={isThisActive}>
                                            <Icon name="Tasks" />
                                            <div className="sidebar-submenu-text">
                                                <p>Tâches <span>{element.tasks?.length}</span></p> <Icon name="CaretRight" />
                                            </div>
                                        </NavLink>
                                        <NavLink to={`${element.URLID}/${element.URL}/messenger`} className={isThisActive}>
                                            <Icon name="Chat" />
                                            <div className="sidebar-submenu-text">
                                                <p>Messenger</p> <Icon name="CaretRight" />
                                            </div>
                                        </NavLink>
                                        <NavLink to={`${element.URLID}/${element.URL}/members`} className={isThisActive}>
                                            <Icon name="Group" />
                                            <div className="sidebar-submenu-text">
                                                <p>Membres</p> <Icon name="CaretRight" />
                                            </div>
                                        </NavLink>
                                    </div>
                                )}
                            </div>
                        )
                    })
                ) : (
                    [...Array(5)].map((_, key) => {
                        return (
                            <div className="sidebar-skeleton" key={key}>
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
            </div >
            {user &&
                <div className="sidebar-bottom">
                    <div className="sidebar-bottom-avatar" style={fullImage(user.picture)}></div>
                    <div className="sidebar-bottom-pseudo">
                        {user.pseudo}
                    </div>
                </div>
            }
        </div >
    )
}

export default Sidebar