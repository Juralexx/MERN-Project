import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../../pages/Home'
import Trending from '../../pages/Trending'
import Dashboard from '../../pages/Dashboard'
import Project from '../../pages/Project'
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

function Index() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="login" element={ <Login /> } />
        <Route path="register" element={ <Signup /> } />

        <Route path="profil" element={ <Profil /> }>
          <Route index element={ <Main /> } />
          <Route path="about" element={ <About /> }>
            <Route index element={ <MainInfos /> } />
            <Route path="contact" element={ <ContactInfos /> } />
            <Route path="bio" element={ <Bio /> } />
            <Route path="location" element={ <Location /> } />
          </Route>
        </Route>

        <Route path="projects" element={ <Project /> } />

        <Route path="project/add" element={ <AddProject /> } />

        <Route path="dashboard" element={ <Dashboard /> } />

        <Route path=":pseudo" element={ <MemberProfil /> } />

        <Route path="trending" element={ <Trending /> } />
        <Route path="*" element={ <Navigate to="/" /> } />
      </Routes>
    </Router>
  );
}

export default Index;