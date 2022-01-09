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
import ProfilEdit from '../../pages/ProfilEdit'
import MainInfos from '../Profil/update/MainInfos'
import ContactInfos from '../Profil/update/ContactInfos'
import Bio from '../Profil/update/Bio'
import Location from '../Profil/update/Location'
import { useDispatch, useSelector } from "react-redux";

function Index() {
  const userData = useSelector((state) => state.userReducer);
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={ <Home /> } />
          <Route path="login" element={ <Login /> } />
          <Route path="register" element={ <Signup /> } />
          <Route path="trending" element={ <Trending /> } />
          <Route path="profil" element={ <Profil /> } />

          <Route path="about" element={ <ProfilEdit /> }>
            <Route index element={ <MainInfos /> } />
            <Route path="contact" element={ <ContactInfos /> } />
            <Route path="bio" element={ <Bio /> } />
            <Route path="location" element={ <Location /> } />
          </Route>

          <Route path="dashboard" element={ <Dashboard /> } />
          <Route path="project" element={ <Project /> } />
        <Route path="*" element={ <Navigate to="/" /> } />
      </Routes>
    </Router>
  );
}

export default Index;