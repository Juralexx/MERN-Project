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
import MemberProfil from '../Members/MemberProfil'
import Main from '../Profil/main/Main'
import About from '../Profil/about/About'
import Bio from '../Profil/about/update/Bio'
import MainInfos from '../Profil/about/update/MainInfos'
import ContactInfos from '../Profil/about/update/ContactInfos'
import Location from '../Profil/about/update/Location'

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

        <Route path="dashboard" element={ <Dashboard /> } />

        <Route path=":pseudo" element={ <MemberProfil /> } />

        <Route path="trending" element={ <Trending /> } />
        <Route path="project" element={ <Project /> } />
        <Route path="*" element={ <Navigate to="/" /> } />
      </Routes>
    </Router>
  );
}

export default Index;