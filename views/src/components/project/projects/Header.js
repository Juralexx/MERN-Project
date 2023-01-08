import React from 'react'
import { useDispatch } from "react-redux";
import { avatar } from '../../tools/hooks/useAvatar'
import { dateParser } from '../../Utils'
import { leaveProject } from '../../tools/functions/member';
import Breadcrumb from './Breadcrumb';
import { IoCalendarClearOutline, IoLocationOutline } from 'react-icons/io5'
import { NavLink, useLocation } from 'react-router-dom';
import ToolsMenu from '../../tools/global/ToolsMenu';

const Header = ({ project, websocket, user }) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const isThisActive = ({ isActive }) => (!isActive ? "" : "active")

    return (
        <div className="dashboard-header">
            <div className="container py-3">
                <Breadcrumb project={project} />

                <div className="dashboard-header-top">
                    <div className="dashboard-header_left">
                        <div className="dashboard-header-img" style={avatar(project.pictures[0])}></div>
                        <div className="dashboard-header-content">
                            <h1>{project.title}</h1>
                            <div className="dashboard-header-content-infos">
                                <div className="infos"><IoLocationOutline />{project.location + ", " + project.department}</div>
                                <div className="infos"><IoCalendarClearOutline />{dateParser(project.createdAt)}</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="dashboard-header_right">
                            <ToolsMenu>
                                <div className="tools_choice" onClick={() => leaveProject(user, project, websocket, dispatch)}>Quitter le projet</div>
                            </ToolsMenu>
                        </div>
                    </div>
                </div>
            </div>

            {(location.pathname.includes("about") || location.pathname.includes("gallery") || location.pathname.includes("actuality") || location.pathname.includes("qna")) &&
                <div className="dashboard-header_navbar">
                    <div className="dashboard-header_navbar-content">
                        <div className="dashboard-header_navbar-item">
                            <NavLink to={`/projects/${project.URLID}/${project.URL}/about`} className={isThisActive}>À propos</NavLink>
                        </div>
                        <div className="dashboard-header_navbar-item">
                            <NavLink to={`/projects/${project.URLID}/${project.URL}/gallery`} className={isThisActive}>Galerie</NavLink>
                        </div>
                        <div className="dashboard-header_navbar-item">
                            <NavLink to={`/projects/${project.URLID}/${project.URL}/actuality`} className={isThisActive}>Actualités</NavLink>
                        </div>
                        <div className="dashboard-header_navbar-item">
                            <NavLink to={`/projects/${project.URLID}/${project.URL}/qna`} className={isThisActive}>FAQ</NavLink>
                        </div>
                        <div className="dashboard-header_navbar-item">
                            <NavLink to={`/projects/${project.URLID}/${project.URL}/edit`} className={isThisActive}>Modifier</NavLink>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Header