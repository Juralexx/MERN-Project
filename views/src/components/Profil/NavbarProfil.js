import React from "react";
import { NavLink } from "react-router-dom";

const NavbarProfil = () => {

    return (
        <div className="profil-nav">
            <ul>
                <li>
                    <NavLink to="/profil" className={(navData) => navData.isActive ? "activeLink" : "" }>
                        <p>Profil</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={(navData) => navData.isActive ? "activeLink" : "" }>
                        <p>À propos</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/" className={(navData) => navData.isActive ? "activeLink" : "" }>
                        <p>Projets</p>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default NavbarProfil;