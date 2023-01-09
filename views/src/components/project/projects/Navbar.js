import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = ({ project, isManager }) => {
    const isThisActive = ({ isActive }) => (isActive ? "active" : "unactive")

    return (
        <nav className="dashboard-header_navbar">
            <div className="container-lg">
                <div className='dashboard-header_navbar-content custom-scrollbar-x'>
                    <NavLink
                        to={`/projects/${project.URLID}/${project.URL}/about`}
                        className={isThisActive}
                    >
                        À propos
                    </NavLink>
                    <NavLink
                        to={`/projects/${project.URLID}/${project.URL}/gallery`}
                        className={isThisActive}
                    >
                        Galerie
                    </NavLink>
                    <NavLink
                        to={`/projects/${project.URLID}/${project.URL}/actuality`}
                        className={isThisActive}
                    >
                        Actualités
                    </NavLink>
                    <NavLink
                        to={`/projects/${project.URLID}/${project.URL}/qna`}
                        className={isThisActive}
                    >
                        FAQ
                    </NavLink>
                    {isManager &&
                        <NavLink
                            to={`/projects/${project.URLID}/${project.URL}/edit`}
                            className={isThisActive}
                        >
                            Modifier
                        </NavLink>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar