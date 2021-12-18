import React from "react";
import { useSelector } from "react-redux";
import UploadImg from "./UploadImg";

const UpdateProfil = () => {
    const userData = useSelector((state) => state.userReducer)
    return (
        <div className="container">
            <div className="profil-container">
                <div className="profil-top">
                    <div className="infos">
                        <div className="left">
                            <img src={userData.picture} alt="Photo de profil" />
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