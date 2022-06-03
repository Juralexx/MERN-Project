import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { avatar, coverPicture } from "../components/tools/hooks/useAvatar";
import UploadCoverImg from "../components/profil/uploads/UploadCoverImg";
import UploadImg from "../components/profil/uploads/UploadImg";
import Footer from '../components/Footer'
import About from "../components/profil/About";
import Edit from "../components/profil/Edit";
import Friends from "../components/profil/Friends";
import Projects from "../components/profil/Projects";
import ProfilCard from "../components/profil/ProfilCard";

const Profil = ({ user, websocket }) => {
    const isThisActive = ({ isActive }) => (!isActive ? "" : "active")

    return (
        <>
            <div className="content_container profil_container">
                <div className="profil_header">
                    <div className="profil_cover_img" style={coverPicture(user.cover_picture)}>
                        <UploadCoverImg user={user} />
                    </div>
                    <div className="container relative">
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
                <div className="container mt-8 pb-[100px]">
                    {user &&
                        <Routes>
                            <Route index element={
                                <div className="row">
                                    <ProfilCard user={user} />
                                </div>
                            } />
                            <Route path="about" element={
                                <div className="row">
                                    <ProfilCard user={user} />
                                    <About user={user} />
                                </div>
                            } />
                            <Route path="projects/*" element={
                                <div className="row">
                                    <ProfilCard user={user} />
                                    <Projects user={user} websocket={websocket} />
                                </div>
                            } />
                            <Route path="contacts" element={
                                <div className="row">
                                    <ProfilCard user={user} />
                                    <Friends user={user} websocket={websocket} />
                                </div>
                            } />
                            <Route path="edit/*" element={
                                <Edit user={user} />
                            } />
                        </Routes>
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Profil