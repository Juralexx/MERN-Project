import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import Home from '../../pages/Home';
import Trending from '../../pages/Trending';
import Profil from '../../pages/Profil';
import Dashboard from '../../pages/Dashboard';
import Project from '../../pages/Project';

const index = () => {
  return ( 
    <Router>
        <Routes>
            <Route path="/" exact component={ Home } />
            <Route path="/trending" exact component={ Trending } />
            <Route path="/profil" exact component={ Profil } />
            <Route path="/dashboard" exact component={ Dashboard } />
            <Route path="/project" exact component={ Project } />
            <Navigate to="/" />
        </Routes>
    </Router>
   );
}

export default index;