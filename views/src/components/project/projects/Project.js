import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useParams } from 'react-router-dom';
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
                <Header project={project} websocket={websocket} user={user} />
                <Routes>
                    <Route index element={
                        <div className="container">
                            <div className="row py-4">
                            <div className="col-12 col-lg-6">
                                <ActivityFeed project={project} user={user} websocket={websocket} />
                            </div>
                            <div className="col-12 col-lg-6">
                                <HomeMembers project={project} isAdmin={isAdmin} isManager={isManager} user={user} websocket={websocket} />
                                <HomeTasks project={project} isAdmin={isAdmin} isManager={isManager} user={user} websocket={websocket} />
                            </div>
                        </div>
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
                        <Edit
                            user={user}
                            websocket={websocket}
                            project={project}
                            isAdmin={isAdmin}
                            isManager={isManager}
                        />
                    } />
                    <Route path="gallery" element={
                        <Gallery
                            user={user}
                            websocket={websocket}
                            project={project}
                            isAdmin={isAdmin}
                            isManager={isManager}
                        />
                    } />
                    <Route path="actuality/*" element={
                        <Actualities
                            user={user}
                            websocket={websocket}
                            project={project}
                            isAdmin={isAdmin}
                            isManager={isManager}
                        />
                    } />

                    {project.actualities.length === 0 ? (
                        <Route path="add-actuality" element={
                            <AddActuality
                                user={user}
                                websocket={websocket}
                                project={project}
                                isAdmin={isAdmin}
                                isManager={isManager}
                            />
                        } />
                    ) : (
                        <Route path="add-actuality" element={
                            <Actualities
                                user={user}
                                websocket={websocket}
                                project={project}
                                isAdmin={isAdmin}
                                isManager={isManager}
                            />
                        } />
                    )}
                    
                    <Route path="qna/*" element={
                        <Qna
                            user={user}
                            websocket={websocket}
                            project={project}
                            isAdmin={isAdmin}
                            isManager={isManager}
                        />
                    } />

                    {project.QNA.length === 0 ? (
                        <Route path="add-qna" element={
                            <AddQna
                                user={user}
                                websocket={websocket}
                                project={project}
                                isAdmin={isAdmin}
                                isManager={isManager}
                            />
                        } />
                    ) : (
                        <Route path="add-qna" element={
                            <Qna
                                user={user}
                                websocket={websocket}
                                project={project}
                                isAdmin={isAdmin}
                                isManager={isManager}
                            />
                        } />
                    )}
                </Routes>
            </>
        )
    )
}

export default Project