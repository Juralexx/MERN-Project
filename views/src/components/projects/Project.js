import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useParams, Navigate } from 'react-router-dom';
import { getProject } from '../../reducers/project.action';
import Header from './Header'
import HomeMembers from './members/HomeMembers';
import Members from './members/Members';
import HomeTasks from './tasks/HomeTasks';
import HomeGallery from './gallery/HomeGallery';
import HomeActivityFeed from './activity-feed/HomeActivityFeed';
import Tasks from './tasks/Tasks';
import About from './About';
import Edit from './edit/Edit';
import Gallery from './gallery/Gallery';
import Actualities from './actualities/Actualities';
import AddActuality from './actualities/AddActuality';
import Qna from './QNA/Qna';
import AddQna from './QNA/AddQna';
import ActivityFeed from './activity-feed/ActivityFeed';
import Oval from '../tools/loaders/Oval';

const Project = ({ user, websocket, projects, setProjects }) => {
    const { URLID, URL } = useParams()
    const project = useSelector(state => state.projectReducer)
    const [role, setRole] = useState({ manager: false, admin: false })
    const [isLoading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        if (Object.keys(project).length === 0) {
            const current = projects.find(element => element.URLID === URLID && element.URL === URL)
            dispatch(getProject(current._id))
        }

        if (Object.keys(project).length > 0 && isLoading) {
            setRole({
                manager: project.manager === user._id,
                admin: project.admins.includes(user._id)
            })
            setLoading(false)
        }
    }, [project, user._id, isLoading])

    useEffect(() => {
        let socket = websocket.current
        socket.on("leaveProject", data => {
            let index = projects.filter(element => element._id !== data.projectId)
            setProjects(index)
            window.location.pathname = '/projects'
        })
        return () => socket.off("leaveProject")
    }, [websocket.current, websocket, projects, setProjects])

    return (
        Object.keys(project).length > 0 && !isLoading ? (
            <>
                <Header
                    project={project}
                    websocket={websocket}
                    user={user}
                    isManager={role.manager}
                />
                <Routes>
                    <Route index element={
                        <div className='dashboard-project'>
                            <div className="container-lg py-8">
                                <div className='row'>
                                    <div className='col-12 col-xl-6 !px-0 sm:!px-3'>
                                        <HomeMembers
                                            project={project}
                                            isAdmin={role.admin}
                                            isManager={role.manager}
                                            user={user}
                                            websocket={websocket}
                                        />
                                        <HomeTasks
                                            project={project}
                                            isAdmin={role.admin}
                                            isManager={role.manager}
                                            user={user}
                                            websocket={websocket}
                                        />
                                    </div>
                                    <div className='col-12 col-xl-6 !px-0 sm:!px-3'>
                                        <HomeActivityFeed
                                            project={project}
                                        />
                                        <HomeGallery
                                            project={project}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    } />
                    <Route path="about" element={
                        <About
                            user={user}
                            websocket={websocket}
                            project={project}
                            isAdmin={role.admin}
                            isManager={role.manager}
                        />
                    } />
                    <Route path="tasks" element={
                        <Tasks
                            user={user}
                            websocket={websocket}
                            project={project}
                        />
                    } />
                    <Route path="members" element={
                        <Members
                            user={user}
                            websocket={websocket}
                            project={project}
                            isAdmin={role.admin}
                            isManager={role.manager}
                        />
                    } />
                    <Route path="activity-feed" element={
                        <ActivityFeed
                            project={project}
                        />
                    } />
                    <Route path="edit" element={
                        role.manager ? (
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
                            isManager={role.manager}
                        />
                    } />
                    <Route path="actuality/*" element={
                        <Actualities
                            project={project}
                            user={user}
                            isManager={role.manager}
                            websocket={websocket}
                        />
                    } />


                    <Route path="add-actuality" element={
                        role.manager ? (
                            <AddActuality
                                user={user}
                                websocket={websocket}
                                project={project}
                                isAdmin={role.admin}
                                isManager={role.manager}
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
                            user={user}
                            websocket={websocket}
                            isManager={role.manager}
                        />
                    } />

                    <Route path="add-qna" element={
                        role.manager ? (
                            <AddQna
                                user={user}
                                project={project}
                                websocket={websocket}
                            />
                        ) : (
                            <Navigate
                                to={`/projects/${project.URLID}/${project.URL}/qna`}
                            />
                        )
                    } />
                </Routes>
            </>
        ) : (
            <Oval />
        )
    )
}

export default Project