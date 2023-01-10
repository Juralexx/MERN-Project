import React from "react";
import { Navigate, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { avatar, coverPicture } from "../components/tools/hooks/useAvatar";
import UploadCoverImg from "../components/profil/uploads/UploadCoverImg";
import UploadImg from "../components/profil/uploads/UploadImg";
import FooterLight from '../components/FooterLight'
import About from "../components/profil/About";
import Edit from "../components/profil/Edit";
import Friends from "../components/profil/Friends";
import Projects from "../components/profil/Projects";
import ProfilCard from "../components/profil/ProfilCard";

const Profil = ({ user, websocket }) => {
    const isThisActive = ({ isActive }) => (!isActive ? "" : "active")
    const location = useLocation()
    
    return (
        <>
            <div className="profil_container">
                <div className="profil_header">
                    <div className="profil_cover_img" style={coverPicture(user.cover_picture)}>
                        <UploadCoverImg
                            user={user}
                        />
                    </div>
                    <div className="container relative">
                        <div className="avatar" style={avatar(user.picture)}>
                            <UploadImg
                                user={user}
                            />
                        </div>
                        <div className="content_nav">
                            <NavLink to="/profil" className={isThisActive}>
                                Profil
                            </NavLink>
                            <NavLink to="about" className={isThisActive}>
                                À propos
                            </NavLink>
                            <NavLink to="contacts" className={isThisActive}>
                                Contacts
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="container mt-8 pb-[100px]">
                    <div className="row">
                        {!location.pathname.includes('edit') &&
                            <ProfilCard user={user} />
                        }
                        {user &&
                            <Routes>
                                <Route index element={
                                    <Projects
                                        user={user}
                                        websocket={websocket}
                                    />
                                } />
                                <Route path="about" element={
                                    <About
                                        user={user}
                                    />
                                } />
                                <Route path="contacts" element={
                                    <Friends
                                        user={user}
                                        websocket={websocket}
                                    />
                                } />
                                <Route path="edit/*" element={
                                    <Edit
                                        user={user}
                                    />
                                } />
                                <Route path="*" element={<Navigate to="/profil" />} />
                            </Routes>
                        }
                    </div>
                </div>
            </div>
            <FooterLight />
        </>
    )
}

export default Profil