import React from "react";
import UploadCoverImg from "../components/profil/uploads/UploadCoverImg";
import UploadImg from "../components/profil/uploads/UploadImg";
import { avatar, coverPicture } from "../components/tools/functions/useAvatar";
import Footer from '../components/Footer'
import { NavLink } from "react-router-dom";

const Profil = ({ user }) => {

    return (
        <>
            <div className="content_container">
                <div className="profil_container">
                    <div className="profil_header">
                        <div className="profil_cover_img" style={coverPicture(user.cover_picture)}>
                            <UploadCoverImg user={user} />
                        </div>
                        <div className="box">
                            <div className="pseudo_header">
                                <p>{user.pseudo}</p>
                            </div>
                            <div className="avatar" style={avatar(user.picture)}>
                                <UploadImg user={user} />
                            </div>
                            <div className="content_nav">
                                <NavLink to="/profil">Profil</NavLink>
                                <NavLink to="/profil/about">À propos</NavLink>
                                <NavLink to="/project">Mes projets</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="profil_content">
                        <div className="content_box">
                            <div className="profil_infos_displayer">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Profil