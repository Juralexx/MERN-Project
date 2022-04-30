import React from "react";
import NavbarProfilEdit from "./about/NavbarProfilEdit";
import { Outlet } from "react-router-dom";

const About = () => {

    return (
        <div className="profil-edit-container">
        <div className="left">
            <NavbarProfilEdit />
        </div>

        <Outlet />
    </div>
    )
};

export default About;