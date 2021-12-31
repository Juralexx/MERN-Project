import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBio } from "../../actions/user.action";
import { dateParser } from "../Utils";
import UploadCoverImg from "./UploadCoverImg";
import UploadImg from "./UploadImg";

const Profil = () => {
    const userData = useSelector((state) => state.userReducer)
    const [bio, setBio] = useState(userData.bio)
    const [updateBioForm, setUpdateBioForm] = useState(false)
    const dispatch = useDispatch()

    const handleUpdate = (e) => {
        dispatch(updateBio(userData._id, bio))
        setUpdateBioForm(false)
    }

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
        <div className="container">
            <div className="profil-container">
                <div className="profil-top">
                    <div className="cover-img" style={coverPicture}>
                        <UploadCoverImg />
                    </div>
                    <div className="avatar -online-ring" style={profilAvatar}>
                        <UploadImg />
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profil-card">
                                <p>Pseudo : {userData.pseudo}</p>
                                <p>Email : {userData.email}</p>
                                {userData.name === '' ? (<p style={{ display: 'none' }}></p>) : (<p className="name-field">Prénom : {userData.name}</p>)}
                                {userData.lastname === '' ? (<p style={{ display: 'none' }}></p>) : (<p className="lastname-field">Nom : {userData.lastname}</p>)}
                                {userData.work === '' ? (<p style={{ display: 'none' }}></p>) : (<p className="work-field">Métier : {userData.work}</p>)}
                                {userData.phone === '' ? (<p style={{ display: 'none' }}></p>) : (<p className="phone-field">Tél : {userData.phone}</p>)}
                                <p>Inscrit depuis le : {dateParser(userData.createdAt)}</p>
                            </div>
                            <a href="/projects">
                                <div className="profil-card">
                                    <div className="top">
                                        <i className="fas fa-project-diagram"></i>
                                    </div>
                                    <div className="bottom">
                                        Mes projets
                                    </div>
                                </div>
                            </a>
                            <a href="/profil/edit">
                                <div className="profil-card">
                                    <div className="top">
                                        <i className="fas fa-user-circle"></i>
                                    </div>
                                    <div className="bottom">
                                        Modifier mon profil
                                    </div>
                                </div>
                            </a>
                            <a href="/settings">
                                <div className="profil-card">
                                    <div className="top">
                                        <i className="fas fa-sliders-h"></i>
                                    </div>
                                    <div className="bottom">
                                        Paramètres
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className="col-md-6">
                            <div className="bio">
                                {updateBioForm === false ? (
                                    <>
                                        <p>{userData.bio}</p>
                                        <button className="btn btn-primary" onClick={() => setUpdateBioForm(!updateBioForm)}>Modifier ma description</button>
                                    </>
                                ) : (
                                    <>
                                        <textarea type="text" defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)}></textarea>
                                        <button className="btn btn-primary" onClick={handleUpdate}>Enregistrer</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profil