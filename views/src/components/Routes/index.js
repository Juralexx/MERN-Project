import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../../pages/Home'
import Trending from '../../pages/Trending'
import Profil from '../../pages/Profil'
import Dashboard from '../../pages/Dashboard'
import Project from '../../pages/Project'

function Index() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Home /> } />
          <Route path="trending" element={ <Trending /> } />
          <Route path="profil" element={ <Profil /> } />
          <Route path="dashboard" element={ <Dashboard /> } />
          <Route path="project" element={ <Project /> } />
        <Route path="*" element={ <Navigate to="/" /> } />
      </Routes>
    </Router>
  );
}

export default Index;