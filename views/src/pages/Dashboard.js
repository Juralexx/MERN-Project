import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/project/projects/Sidebar'
import Projects from '../components/project/projects/Projects';
import Project from '../components/project/projects/Project';
import FooterLight from '../components/FooterLight';

const Dashboard = ({ websocket, user }) => {
    const [projects, setProjects] = useState([])
    const [isLoading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        if (Object.keys(user).length > 0 && user.projects.length > 0) {
            const currents = user.projects.map(async (projectId) => {
                return await axios
                    .get(`${process.env.REACT_APP_API_URL}api/project/${projectId}`)
                    .then(res => res.data)
                    .catch(err => console.error(err))
            })
            Promise.all(currents).then(res => {
                setProjects(res)
                setLoading(false)
            })
        }
    }, [user, dispatch])

    return (
        <div className="dashboard">
            <Sidebar user={user} projects={projects} isLoading={isLoading} />
            <div className="dashboard-content">
                {!isLoading &&
                    <Routes>
                        <Route index element={
                            <Projects
                                user={user}
                                websocket={websocket}
                                projects={projects}
                                setProjects={setProjects}
                            />
                        } />
                        {(Object.keys(user).length > 0 && projects.length > 0) && (
                            <Route path=":URLID/:URL/*" element={
                                <Project
                                    user={user}
                                    websocket={websocket}
                                    projects={projects}
                                    setProjects={setProjects}
                                />
                            } />
                        )}
                    </Routes>
                }
                <FooterLight />
            </div>
        </div>
    )
}

export default Dashboard