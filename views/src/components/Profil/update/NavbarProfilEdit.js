import React from "react";
import { NavLink } from "react-router-dom";

const NavbarProfilEdit = () => {
    const isThisActive = (navData) => navData.isActive ? "activeLink" : "";

    return (
        <div className="profil-edit-nav">
            <h5>À propos</h5>
            <ul>
                <li>
                    <NavLink to="/about" className={isThisActive}><p>Informations générales</p></NavLink>
                </li>
                <li>
                    <NavLink to="/about/bio" className={isThisActive}><p>Description</p></NavLink>
                </li>
                <li>
                    <NavLink to="/about/contact" className={isThisActive}><p>Coordonnées</p></NavLink>
                </li>
                <li>
                    <NavLink to="/about/location" className={isThisActive}><p>Adresse</p></NavLink>
                </li>
            </ul>
        </div>
    )
};

export default NavbarProfilEdit;