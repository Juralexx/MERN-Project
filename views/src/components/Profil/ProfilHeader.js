import React from "react";
import { useSelector } from "react-redux";
import NavbarProfil from "./NavbarProfil";
import UploadCoverImg from "./UploadCoverImg";
import UploadImg from "./UploadImg";

const ProfilHeader = () => {
    const userData = useSelector((state) => state.userReducer)

    const coverPicture = {
        backgroundImage: "url(" + userData.coverPicture + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
    }

    const profilAvatar = {
        backgroundImage: "url(" + userData.picture + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
    }

    return (
        <div className="profil-top">
            <div className="cover-img" style={coverPicture}>
                <div className="pseudo-header"><p>{userData.pseudo}</p></div>
                <UploadCoverImg />
            </div>
            <div className="avatar -online-ring" style={profilAvatar}>
                <UploadImg />
            </div>
            <NavbarProfil />
        </div>
    )
}

export default ProfilHeader;