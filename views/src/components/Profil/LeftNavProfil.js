import React from "react";
import { NavLink } from "react-router-dom";
import { FaProjectDiagram } from 'react-icons/fa'
import { AiOutlineUser, AiOutlineInfoCircle } from 'react-icons/ai'

const LeftNavProfil = () => {
    //const isThisActive = (navData) => navData.isActive ? "activeLink" : ""

    return (
        <div className="left-nav">
            <div className="left-nav-container">
                <ul>
                    <li className="to-profil">
                        <NavLink to="/profil">
                            <AiOutlineUser />
                            <p>Profil</p>
                        </NavLink>
                    </li>
                    <li className="to-about">
                        <NavLink to="/profil/about">
                            <AiOutlineInfoCircle />
                            <p>À propos</p>
                        </NavLink>
                    </li>
                    <li className="to-project">
                        <NavLink to="/project">
                            <FaProjectDiagram />
                            <p>Mes projets</p>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default LeftNavProfil;