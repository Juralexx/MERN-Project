import React from "react";
import ProfilHeader from "../components/Profil/ProfilHeader";
import NavbarProfilEdit from "../components/Profil/update/NavbarProfilEdit";
import { Outlet } from "react-router-dom";
import LeftNavProfil from "../components/Profil/LeftNavProfil";

const ProfilEdit = () => {

    return (
        <>
            <>
                <LeftNavProfil />
            </>
            <div className="container">
                <div className="profil-container">
                    <ProfilHeader />
                    <div className="profil-edit-container">
                        <div className="left">
                            <NavbarProfilEdit />
                        </div>

                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
};

export default ProfilEdit;