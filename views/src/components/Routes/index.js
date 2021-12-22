import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../../pages/Home'
import Trending from '../../pages/Trending'
import Profil from '../../pages/Profil'
import Dashboard from '../../pages/Dashboard'
import Project from '../../pages/Project'
import Login from '../../pages/Signin'
import Signup from '../../pages/Signup'
import Navbar from '../Navbar'
import ProfilEditPage from '../../pages/ProfilEdit'

function Index() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={ <Home /> } />
          <Route path="login" element={ <Login /> } />
          <Route path="register" element={ <Signup /> } />
          <Route path="trending" element={ <Trending /> } />
          <Route path="profil" element={ <Profil /> } />
            <Route path="profil/edit" element={ <ProfilEditPage /> } />
          <Route path="dashboard" element={ <Dashboard /> } />
          <Route path="project" element={ <Project /> } />
        <Route path="*" element={ <Navigate to="/" /> } />
      </Routes>
    </Router>
  );
}

export default Index;