import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './Protected.routes'
import Home from '../../pages/Home'
import Login from '../../pages/Login'
import Register from '../../pages/Register'
import Navbar from '../Navbar'
import Profil from '../../pages/Profil'
import MemberProfil from '../members/MemberProfil'
import Main from '../profil/main/Main'
import About from '../profil/about/About'
import Bio from '../profil/about/update/Bio'
import MainInfos from '../profil/about/update/MainInfos'
import ContactInfos from '../profil/about/update/ContactInfos'
import Location from '../profil/about/update/Location'
import AddProject from '../../pages/AddProject'
import Projects from '../../pages/Projects'
import Project from '../../pages/Project'
import UserProjects from '../../pages/UserProjects'
import MostLiked from '../../pages/MostLiked'
import SocialsNetworks from '../profil/about/update/SocialsNetworks'
import Messenger from '../messenger/Messenger'

function Paths({ websocket, onlineUsers, friends, user, uid }) {
    return (
        <BrowserRouter>
            <Navbar websocket={websocket} user={user} uid={uid} />
            <Routes>
                <Route path="/" element={<Home websocket={websocket} user={user} />} />
                <Route path=":pseudo" element={<MemberProfil />} />
                <Route path="most-liked" element={<MostLiked />} />
                <Route path=":pseudo/projects" element={<UserProjects />} />
                <Route path="project/:URL" element={<Project />} />

                <Route path="login" element={<Login uid={uid} />} />
                <Route path="register" element={<Register uid={uid} />} />

                <Route path="add-project" element={
                    <ProtectedRoute uid={uid}>
                        <AddProject user={user} websocket={websocket} />
                    </ProtectedRoute>
                } />
                <Route path="projects" element={
                    <ProtectedRoute uid={uid}>
                        <Projects websocket={websocket} user={user} />
                    </ProtectedRoute>
                } />
                <Route path="messenger" element={
                    <ProtectedRoute uid={uid}>
                        <Messenger websocket={websocket} friends={friends} onlineUsers={onlineUsers} />
                    </ProtectedRoute>
                } />
                <Route element={<ProtectedRoute uid={uid} />}>
                    <Route path="profil" element={<Profil user={user} />}>
                        <Route index element={<Main />} />
                        <Route path="about" element={<About />}>
                            <Route index element={<MainInfos />} />
                            <Route path="contact" element={<ContactInfos />} />
                            <Route path="bio" element={<Bio />} />
                            <Route path="location" element={<Location />} />
                            <Route path="socials-networks" element={<SocialsNetworks />} />
                        </Route>
                    </Route>
                </Route>

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Paths;