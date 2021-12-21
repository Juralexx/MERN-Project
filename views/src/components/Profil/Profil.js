import React, { useContext } from "react";
import { useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { UidContext } from "../AppContext";

const Profil = () => {
    const uid = useContext(UidContext)
    const userData = useSelector((state) => state.userReducer)
    const profilAvatar = {
        backgroundImage: "url(" + userData.picture + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
    }

    if (userData.name === '') { document.getElementsByClassName('name-field')[0].style.display = "none"; }
    if (userData.lastname === '') { document.getElementsByClassName('lastname-field')[0].style.display = "none"; }
    if (userData.work === '') { document.getElementsByClassName('work-field')[0].style.display = "none"; }
    if (userData.phone === '') { document.getElementsByClassName('phone-field')[0].style.display = "none"; }

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
                            <h4>A propos de vous</h4>
                            <p>Pseudo : {userData.pseudo}</p>
                            <p>Email : {userData.email}</p>
                            <p className="name-field">Prénom : <span className="name">{userData.name}</span></p>
                            <p className="lastname-field">Nom : {userData.lastname}</p>
                            <p className="work-field">Métier : {userData.work}</p>
                            <p className="phone-field">Tél : {userData.phone}</p>
                            <p>Inscrit depuis le : {userData.createdAt}</p>
                            <a href="/profil/edit" className="btn btn-primary">Modifier mon profil</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profil