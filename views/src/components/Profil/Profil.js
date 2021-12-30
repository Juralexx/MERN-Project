import React from "react";
import { useSelector } from "react-redux";
import { dateParser } from "../Utils";
import UploadImg from "./UploadImg";
import Modal, { modalToggle } from "./UploadImgModal";

const Profil = () => {
    const userData = useSelector((state) => state.userReducer)
    const profilAvatar = {
        backgroundImage: "url(" + userData.picture + ")",
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
                            <div className="avatar" style={profilAvatar}>
                                <UploadImg />
                            </div>
                        </div>
                        <div className="right">
                            <h4>A propos de vous</h4>
                            <p>Pseudo : {userData.pseudo}</p>
                            <p>Email : {userData.email}</p>
                            {userData.name === '' ? (<p style={{ display: 'none' }}></p>) : (<p className="name-field">Prénom : {userData.name}</p>)}
                            {userData.lastname === '' ? (<p style={{ display: 'none' }}></p>) : (<p className="lastname-field">Nom : {userData.lastname}</p>)}
                            {userData.work === '' ? (<p style={{ display: 'none' }}></p>) : (<p className="work-field">Métier : {userData.work}</p>)}
                            {userData.phone === '' ? (<p style={{ display: 'none' }}></p>) : (<p className="phone-field">Tél : {userData.phone}</p>)}
                            <p>Inscrit depuis le : {dateParser(userData.createdAt)}</p>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div class="row">
                        <div class="col-md-4">
                            <a href="/projects">
                                <div class="profil-card">
                                    <div class="top">
                                        <i class="fas fa-project-diagram"></i>
                                    </div>
                                    <div class="bottom">
                                        Mes projets
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-4">
                            <a href="/profil/edit">
                                <div class="profil-card">
                                    <div class="top">
                                        <i class="fas fa-user-circle"></i>
                                    </div>
                                    <div class="bottom">
                                        Modifier mon profil
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-4">
                            <a href="/settings">
                                <div class="profil-card">
                                    <div class="top">
                                        <i class="fas fa-sliders-h"></i>
                                    </div>
                                    <div class="bottom">
                                        Paramètres
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profil