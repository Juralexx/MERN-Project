import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { avatar, coverPicture } from "../components/tools/functions/useAvatar";
import UploadCoverImg from "../components/profil/uploads/UploadCoverImg";
import UploadImg from "../components/profil/uploads/UploadImg";
import Footer from '../components/Footer'
import About from "../components/profil/About";
import { Button } from "../components/tools/components/Button";
import Edit from "../components/profil/Edit";
import Friends from "../components/profil/Friends";

const Profil = ({ user }) => {
    const isThisActive = ({ isActive }) => (!isActive ? "" : "active")

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
                                <NavLink to="/profil/edit">
                                    <Button text="Modifier mon profil" className="ml-3" />
                                </NavLink>
                            </div>
                            <div className="avatar" style={avatar(user.picture)}>
                                <UploadImg user={user} />
                            </div>
                            <div className="content_nav">
                                <NavLink to="/profil" className={isThisActive}>Profil</NavLink>
                                <NavLink to="/profil/about" className={isThisActive}>À propos</NavLink>
                                <NavLink to="/profil/projects" className={isThisActive}>Projets</NavLink>
                                <NavLink to="/profil/contacts" className={isThisActive}>Contacts</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="profil_content">
                        <Routes>
                            <Route index element={
                                <></>
                            } />
                            <Route path="about" element={
                                <About user={user} />
                            } />
                            <Route path="edit" element={
                                <Edit user={user} />
                            } />
                             <Route path="contacts" element={
                                <Friends user={user} />
                            } />
                        </Routes>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Profil