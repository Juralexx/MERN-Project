import React from "react";
import { useSelector } from "react-redux";
import UploadImg from "./UploadImg";

const UpdateProfil = () => {
    const userData = useSelector((state) => state.userReducer)
    const profilAvatar = {
        backgroundImage: "url(" + userData.picture +")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
    }

    return (
        <div className="container">
            <div className="profil-container">
                <div className="profil-top">
                    <div className="infos">
                        <div className="left">
                            <div className="avatar" style={ profilAvatar }></div>
                            <UploadImg />
                        </div>
                        <div className="right">
                            <h4>A propos de {userData.pseudo}</h4>
                            <p>Pseudo : {userData.pseudo}</p>
                            <p>Email : {userData.email}</p>
                            <p>Inscrit depuis le : {userData.createdAt}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UpdateProfil