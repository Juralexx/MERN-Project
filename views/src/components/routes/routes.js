import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './Protected.routes'
import Home from '../../pages/Home'
import Login from '../../pages/Login'
import Register from '../../pages/Register'
import Navbar from '../Navbar'
import Profil from '../../pages/Profil'
import MemberProfil from '../members/MemberProfil'
import AddProject from '../../pages/AddProject'
import Dashboard from '../../pages/Dashboard'
import Messenger from '../messenger/Messenger'

function Paths({ websocket, onlineUsers, friends, user, uid }) {
    return (
        <BrowserRouter>
            <Navbar websocket={websocket} user={user} uid={uid} />
            <Routes>
                <Route path="/*" element={<Home websocket={websocket} user={user} />} />
                <Route path=":pseudo" element={<MemberProfil />} />

                <Route path="login" element={<Login uid={uid} />} />
                <Route path="register" element={<Register uid={uid} />} />

                <Route path="projects/*" element={
                    <ProtectedRoute uid={uid}>
                        <Dashboard user={user} websocket={websocket} />
                    </ProtectedRoute>
                } />

                <Route path="add-project" element={
                    <ProtectedRoute uid={uid}>
                        <AddProject user={user} websocket={websocket} />
                    </ProtectedRoute>
                } />

                <Route path="messenger" element={
                    <ProtectedRoute uid={uid}>
                        <Messenger websocket={websocket} friends={friends} onlineUsers={onlineUsers} />
                    </ProtectedRoute>
                } />

                <Route path="profil/*" element={
                    <ProtectedRoute uid={uid}>
                        <Profil user={user} websocket={websocket} />
                    </ProtectedRoute>
                } />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Paths;