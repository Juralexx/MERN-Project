import React from "react";
import { useSelector } from "react-redux";
import { avatar, coverPicture } from "../tools/functions/useAvatar";
import UploadCoverImg from "./uploads/UploadCoverImg";
import UploadImg from "./uploads/UploadImg";

const ProfilHeader = () => {
    const userData = useSelector((state) => state.userReducer)

    return (
        <div className="profil-header">
            <div className="cover-img" style={coverPicture(userData.cover_picture)}>
                <div className="pseudo-header"><p>{userData.pseudo}</p></div>
                <UploadCoverImg />
            </div>
            <div className="avatar -online-ring" style={avatar(userData.picture)}>
                <UploadImg />
            </div>
        </div>
    )
}

export default ProfilHeader;