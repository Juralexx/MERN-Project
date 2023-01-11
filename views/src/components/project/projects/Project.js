import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useParams, Navigate } from 'react-router-dom';
import { getProject } from '../../../actions/project.action';
import Header from './Header'
import HomeMembers from './members/HomeMembers';
import Members from './members/Members';
import HomeTasks from './tasks/HomeTasks';
import ActivityFeed from './activity-feed/ActivityFeed';
import Tasks from './tasks/Tasks';
import About from './About';
import Edit from './edit/Edit';
import Gallery from './Gallery';
import Actualities from './actualities/Actualities';
import AddActuality from './actualities/AddActuality';
import Qna from './QNA/Qna';
import AddQna from './QNA/AddQna';

const Project = ({ user, websocket, projects, setProjects }) => {
    const reducer = useSelector(state => state.projectReducer)
    const [project, setProject] = useState({})
    const [isAdmin, setAdmin] = useState()
    const [isManager, setManager] = useState()
    const [isLoading, setLoading] = useState(false)
    const { URLID, URL } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        const projet = projects.find(element => element.URLID === URLID && element.URL === URL)
        setProject(projet)
        dispatch(getProject(projet._id))
        setManager(projet.manager === user._id)
        setAdmin(projet.admins.includes(user._id))
        setLoading(false)
    }, [URL, URLID, projects, setProject, dispatch, user._id])

    useEffect(() => {
        if (Object.keys(reducer).length > 0) {
            setProject(reducer)
            setManager(reducer.manager === user._id)
            setAdmin(reducer.admins.includes(user._id))
        }
    }, [reducer, user._id])

    useEffect(() => {
        let socket = websocket.current
        socket.on("leaveProject", data => {
            let index = projects.filter(element => element._id !== data.projectId)
            setProjects(index)
            if (index.length > 0) setProject(index[0])
            else setProject(null)
        })
        return () => socket.off("leaveProject")
    }, [websocket.current, websocket, projects, setProjects])

    return (
        Object.keys(project).length > 0 && !isLoading && (
            <>
                <Header
                    project={project}
                    websocket={websocket}
                    user={user}
                    isManager={isManager}
                />
                <Routes>
                    <Route index element={
                        <div className="container-lg py-8">
                            <HomeMembers
                                project={project}
                                isAdmin={isAdmin}
                                isManager={isManager}
                                user={user}
                                websocket={websocket}
                            />
                            <ActivityFeed
                                project={project}
                                user={user}
                                websocket={websocket}
                            />
                            <HomeTasks
                                project={project}
                                isAdmin={isAdmin}
                                isManager={isManager}
                                user={user}
                                websocket={websocket}
                            />
                        </div>
                    } />
                    <Route path="about" element={
                        <About
                            user={user}
                            websocket={websocket}
                            project={project}
                            isAdmin={isAdmin}
                            isManager={isManager}
                        />
                    } />
                    <Route path="tasks" element={
                        <Tasks
                            user={user}
                            websocket={websocket}
                            project={project}
                            isAdmin={isAdmin}
                            isManager={isManager}
                        />
                    } />
                    <Route path="members" element={
                        <Members
                            user={user}
                            websocket={websocket}
                            project={project}
                            isAdmin={isAdmin}
                            isManager={isManager}
                        />
                    } />
                    <Route path="edit" element={
                        isManager ? (
                            <Edit
                                project={project}
                            />
                        ) : (
                            <Navigate
                                to={`/projects/${project.URLID}/${project.URL}/`}
                            />
                        )
                    } />
                    <Route path="gallery" element={
                        <Gallery
                            project={project}
                            isManager={isManager}
                        />
                    } />
                    <Route path="actuality/*" element={
                        <Actualities
                            project={project}
                            isManager={isManager}
                        />
                    } />


                    <Route path="add-actuality" element={
                        project.actualities.length === 0 && isManager ? (
                            <AddActuality
                                user={user}
                                websocket={websocket}
                                project={project}
                                isAdmin={isAdmin}
                                isManager={isManager}
                            />
                        ) : (
                            <Navigate
                                to={`/projects/${project.URLID}/${project.URL}/actuality`}
                            />
                        )
                    } />

                    <Route path="qna/*" element={
                        <Qna
                            project={project}
                            isManager={isManager}
                        />
                    } />

                    <Route path="add-qna" element={
                        isManager ? (
                            <AddQna
                                user={user}
                                project={project}
                            />
                        ) : (
                            <Navigate
                                to={`/projects/${project.URLID}/${project.URL}/qna`}
                            />
                        )
                    } />
                </Routes>
            </>
        )
    )
}

export default Project