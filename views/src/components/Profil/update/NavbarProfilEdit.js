import React from "react";
import { NavLink } from "react-router-dom";

const NavbarProfilEdit = () => {

    return (
        <div className="profil-edit-nav">
            <h4>À propos</h4>
            <ul>
                <li>
                    <NavLink to="/about" className={(navData) => navData.isActive ? "activeLink" : "" }>
                        <p>Informations générales</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about/bio" className={(navData) => navData.isActive ? "activeLink" : "" }>
                        <p>Description</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about/contact" className={(navData) => navData.isActive ? "activeLink" : "" }>
                        <p>Coordonnées</p>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
};

export default NavbarProfilEdit;