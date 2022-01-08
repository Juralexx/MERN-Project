import React from "react";
import { NavLink } from "react-router-dom";
import { BsFillInfoCircleFill, BsFillPersonFill } from 'react-icons/bs'
import { FaProjectDiagram } from 'react-icons/fa'

const LeftNavProfil = () => {
    const isThisActive = (navData) => navData.isActive ? "activeLink" : "" 

    return (
        <div className="left-nav-container">
            <ul>
                <li className="to-profil">
                    <NavLink to="/profil" className={isThisActive}>
                    <BsFillPersonFill />
                        <p>Profil</p>
                    </NavLink>
                </li>
                <li className="to-about">
                    <NavLink to="/about" className={isThisActive}>
                        <BsFillInfoCircleFill />
                        <p>À propos</p>
                    </NavLink>
                </li>
                <li className="to-project">
                    <NavLink to="/project" className={isThisActive}>
                        <FaProjectDiagram />
                        <p>Mes projets</p>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default LeftNavProfil;