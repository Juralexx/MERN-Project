import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { avatar } from '../../tools/functions/useAvatar'
import { MdOutlineMessage, MdGroups, MdOutlineDescription } from 'react-icons/md'
import { BsFillDiagram3Fill, BsFillCaretRightFill } from 'react-icons/bs'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { BiTask } from 'react-icons/bi'
import { GoThreeBars } from 'react-icons/go'

const Sidebar = ({ user, projects, isLoading }) => {
    const [reduced, setReduced] = useState(false)
    const [submenu, setSubmenu] = useState(0)
    const [hoverCard, setHoverCard] = useState(-1)
    const localStore = localStorage.getItem("sideState")
    const addActive = (state, classe) => { if (state) { return classe } else { return "" } }
    const isThisActive = (isActive) => (!isActive ? "" : "active")

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
            else if (localStore !== null && localStore === "closed") setReduced(false)
            else localStorage.setItem("sideState", "open")
    }, [isLoading, localStore])

    return (
        <div className={`sidebar ${addActive(reduced, "reduced")}`}>
            <div className={`sidebar-header ${addActive(reduced, "reduced")}`}>
                <div className={`sidebar-header-inner ${addActive(reduced, "reduced")}`}>
                    <div className="sidebar-header-icon"><BsFillDiagram3Fill /></div>
                    <p>Mes Projets <span>{projects.length}</span></p>
                </div>
                <div className="sidebar-header-toggle" onClick={handleState}><GoThreeBars /></div>
            </div>
            <div className="sidebar-inner custom-scrollbar">
                {!isLoading ? (
                    projects.map((element, key) => {
                        return (
                            <div className="sidebar-container" key={key}>
                                <NavLink to={`${element.URLID}/${element.URL}`} className={`${isThisActive}`}>
                                    <div className={`sidebar-title ${addActive(reduced, "reduced")}`} onClick={() => setSubmenu(key)} onMouseEnter={() => setHoverCard(key)} onMouseLeave={() => setHoverCard(-1)}>
                                        <div className="sidebar-title-inner">
                                            <div className="sidebar-img" style={avatar(element.pictures[0])}></div>
                                            <div className={`sidebar-name ${addActive(reduced, "reduced")} one-line`}>{element.title}</div>
                                        </div>
                                        <div className={`${reduced ? "hidden" : ""}`}><BsFillCaretRightFill /></div>
                                        {reduced && hoverCard === key && (
                                            <div className="sidebar-hover-card">{element.title}</div>
                                        )}
                                    </div>
                                </NavLink>
                                {submenu === key && (
                                    <div className={`sidebar-submenu ${addActive(reduced, "reduced")}`}>
                                        <div className="sidebar-submenu-card">
                                            <NavLink to={`${element.URLID}/${element.URL}/about`} className={`${isThisActive}`}>
                                                <div className="sidebar-submenu-title">
                                                    <MdOutlineDescription />
                                                    <div className="sidebar-submenu-text">À propos</div>
                                                </div>
                                            </NavLink>
                                        </div>
                                        <div className="sidebar-submenu-card">
                                            <NavLink to={`${element.URLID}/${element.URL}/tasks`} className={`${isThisActive}`}>
                                                <div className="sidebar-submenu-title">
                                                    <BiTask />
                                                    <div className="sidebar-submenu-text">Tâches <span>{element.tasks?.length}</span></div>
                                                </div>
                                            </NavLink>
                                        </div>
                                        <div className="sidebar-submenu-card">
                                            <NavLink to={`${element.URLID}/${element.URL}/messenger`} className={`${isThisActive}`}>
                                                <div className="sidebar-submenu-title">
                                                    <MdOutlineMessage />
                                                    <div className="sidebar-submenu-text">Messenger</div>
                                                </div>
                                            </NavLink>
                                        </div>
                                        <div className="sidebar-submenu-card">
                                            <NavLink to={`${element.URLID}/${element.URL}/members`} className={`${isThisActive}`}>
                                                <div className="sidebar-submenu-title">
                                                    <MdGroups />
                                                    <div className="sidebar-submenu-text">Membres</div>
                                                </div>
                                            </NavLink>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })
                ) : (
                    [...Array(5)].map((element, key) => {
                        return (
                            <div className={`sidebar-skeleton ${addActive(reduced, "reduced")}`} key={key}>
                                <div className="sidebar-skeleton-card">
                                    <div className="sidebar-skeleton-round animate-pulse"></div>
                                    <div className="sidebar-skeleton-text animate-pulse"></div>
                                </div>
                                <div className={`${reduced ? "hidden" : "flex"}`}><BsFillCaretRightFill /></div>
                            </div>
                        )
                    })
                )}
            </div>
            {user &&
                <div className={`sidebar-bottom ${addActive(reduced, "reduced")}`}>
                    <div className="sidebar-bottom-inner">
                        <div className="sidebar-bottom-avatar" style={avatar(user.picture)}></div>
                        <div className="sidebar-bottom-pseudo">{user.pseudo}</div>
                    </div>
                    <div className={`${reduced ? "hidden" : "flex"} tools-btn`}><BiDotsVerticalRounded /></div>
                </div>
            }
        </div>
    )
}

export default Sidebar