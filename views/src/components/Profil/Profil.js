import React from "react";
import { useSelector } from "react-redux";
import { dateParser } from "../Utils";
import UploadImg from "./UploadImg";
import Modal, {modalToggle} from "./UploadImgModal";

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
                            <a href="/profil/edit" className="btn btn-primary">Modifier mon profil</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profil