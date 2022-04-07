import React, { useState, useRef } from 'react'
import { useDispatch } from "react-redux";
import { avatar } from '../../tools/functions/useAvatar'
import { dateParser } from '../../Utils'
import { useClickOutside } from '../../tools/functions/useClickOutside';
import { leaveProject } from '../../tools/functions/member';
import SmallMenu from '../../tools/components/SmallMenu';
import Breadcrumb from '../../tools/components/Breadcrumb';
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { HiLocationMarker } from 'react-icons/hi'
import { HiCalendar } from 'react-icons/hi'
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '../../tools/components/Button';

const Header = ({ project, websocket, user }) => {
    const menuRef = useRef()
    const [openMenu, setOpenMenu] = useState(false)
    useClickOutside(menuRef, setOpenMenu, false)
    const dispatch = useDispatch()
    const location = useLocation()
    const isThisActive = ({ isActive }) => (!isActive ? "" : "active")

    return (
        <div className="dashboard-header">
            <div className="dashboard-header-container">
                <Breadcrumb project={project} />

                <div className="dashboard-header-top">
                    <div className="dashboard-header-left">
                        <div className="dashboard-header-img" style={avatar(project.pictures[0])}></div>
                        <div className="dashboard-header-content">
                            <h1>{project.title}</h1>
                            <div className="dashboard-header-content-infos">
                                <div className="infos"><HiLocationMarker />{project.location + ", " + project.department}</div>
                                <div className="infos"><HiCalendar />{dateParser(project.createdAt)}</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="dashboard-header-right">
                            <div ref={menuRef} className="tools-btn" onClick={() => setOpenMenu(!openMenu)}>
                                <BiDotsVerticalRounded />
                            </div>
                            {openMenu && (
                                <SmallMenu top="top-[50px]" right="right-16">
                                    <div className="tools-choice" onClick={() => leaveProject(user, project, websocket, dispatch)}>Quitter le projet</div>
                                </SmallMenu>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {(location.pathname.includes("about") || location.pathname.includes("gallery") || location.pathname.includes("actuality") || location.pathname.includes("qna")) &&
                <div className="dashboard-header-navbar">
                    <div className="dashboard-header-navbar-content">
                        <div className="dashboard-header-navbar-item">
                            <NavLink to={`/projects/${project.URLID}/${project.URL}/about`} className={`${isThisActive}`}>À propos</NavLink>
                        </div>
                        <div className="dashboard-header-navbar-item">
                            <NavLink to={`/projects/${project.URLID}/${project.URL}/gallery`} className={`${isThisActive}`}>Galerie</NavLink>
                        </div>
                        <div className="dashboard-header-navbar-item">
                            <NavLink to={`/projects/${project.URLID}/${project.URL}/actuality`} className={`${isThisActive}`}>Actualités</NavLink>
                        </div>
                        <div className="dashboard-header-navbar-item">
                            <NavLink to={`/projects/${project.URLID}/${project.URL}/qna`} className={`${isThisActive}`}>FAQ</NavLink>
                        </div>
                        <div className="dashboard-header-navbar-item">
                            <NavLink to={`/projects/${project.URLID}/${project.URL}/edit`} className={`${isThisActive}`}><Button text="Modifier" /></NavLink>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Header