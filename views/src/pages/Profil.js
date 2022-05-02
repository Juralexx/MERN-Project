import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { avatar, coverPicture } from "../components/tools/functions/useAvatar";
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
                    <div className="box">
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
                <div className="content_box profil_content">
                    <Routes>
                        <Route index element={
                            <>
                                <ProfilCard user={user} />
                            </>
                        } />
                        <Route path="about" element={
                            <>
                                <ProfilCard user={user} />
                                <About user={user} />
                            </>
                        } />
                        <Route path="projects/*" element={
                            <>
                                <ProfilCard user={user} />
                                <Projects user={user} websocket={websocket} />
                            </>
                        } />
                        <Route path="contacts" element={
                            <>
                                <ProfilCard user={user} />
                                <Friends user={user} websocket={websocket} />
                            </>
                        } />
                        <Route path="edit" element={
                            <Edit user={user} />
                        } />
                    </Routes>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Profil