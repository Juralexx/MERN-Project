import React from "react";
import NavbarProfilEdit from "./update/NavbarProfilEdit";
import { Outlet } from "react-router-dom";

const InfoBloc = () => {

    return (
        <div className="profil-edit-container">
            <div className="left">
                <NavbarProfilEdit />
            </div>

            <Outlet />
        </div>
    )
};

export default InfoBloc;