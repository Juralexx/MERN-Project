import React from "react";
import { NavLink } from "react-router-dom";

const NavbarProfilEdit = () => {
    //const isThisActive = (navData) => navData.isActive ? "activeLink" : "";

    return (
        <div className="profil-edit-nav">
            <h5>À propos</h5>
            <ul>
                <li>
                    <NavLink to="/profil/about"><p>Informations générales</p></NavLink>
                </li>
                <li>
                    <NavLink to="/profil/about/bio"><p>Description</p></NavLink>
                </li>
                <li>
                    <NavLink to="/profil/about/contact"><p>Coordonnées</p></NavLink>
                </li>
                <li>
                    <NavLink to="/profil/about/location"><p>Adresse</p></NavLink>
                </li>
                <li>
                    <NavLink to="/profil/about/socials-networks"><p>Réseaux sociaux</p></NavLink>
                </li>
            </ul>
        </div>
    )
};

export default NavbarProfilEdit;