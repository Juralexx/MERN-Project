import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../../pages/Home'
import Login from '../../pages/Signin'
import Signup from '../../pages/Signup'
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
import MyProjects from '../../pages/MyProjects'
import Project from '../../pages/Project'
import UserProjects from '../../pages/UserProjects'
import MostLiked from '../../pages/MostLiked'
import SocialsNetworks from '../profil/about/update/SocialsNetworks'
import Messenger from '../messenger/Messenger'

function Index({ websocket, onlineUsers, friends }) {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />

        <Route path="profil" element={<Profil />}>
          <Route index element={<Main />} />
          <Route path="about" element={<About />}>
            <Route index element={<MainInfos />} />
            <Route path="contact" element={<ContactInfos />} />
            <Route path="bio" element={<Bio />} />
            <Route path="location" element={<Location />} />
            <Route path="socials-networks" element={<SocialsNetworks />} />
          </Route>
        </Route>

        <Route path=":pseudo" element={<MemberProfil />} />

        <Route path="project/add" element={<AddProject />} />
        <Route path="projects" element={<MyProjects />} />
        <Route path="projects/:pseudo" element={<UserProjects />} />
        <Route path="project/:titleURL" element={<Project />} />

        <Route path="most-liked" element={<MostLiked />} />

        <Route path="messenger" element={<Messenger websocket={websocket} friends={friends} onlineUsers={onlineUsers} />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default Index;