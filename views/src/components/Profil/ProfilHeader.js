import React from "react";
import { useSelector } from "react-redux";
import UploadCoverImg from "./uploads/UploadCoverImg";
import UploadImg from "./uploads/UploadImg";

const ProfilHeader = () => {
    const userData = useSelector((state) => state.userReducer)

    const coverPicture = {
        backgroundImage: "url(" + userData.cover_picture + ")",
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
        <div className="profil-header">
            <div className="cover-img" style={coverPicture}>
                <div className="pseudo-header"><p>{userData.pseudo}</p></div>
                <UploadCoverImg />
            </div>
            <div className="avatar -online-ring" style={profilAvatar}>
                <UploadImg />
            </div>
        </div>
    )
}

export default ProfilHeader;