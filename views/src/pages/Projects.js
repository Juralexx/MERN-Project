import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { getProject } from '../actions/project.action';
import Sidebar from '../components/project/projects/Sidebar'
import Header from '../components/project/projects/Header'
import Title from '../components/project/projects/informations/Title'
import Location from '../components/project/projects/informations/Location'
import Category from '../components/project/projects/informations/Category'
import End from '../components/project/projects/informations/End'
import State from '../components/project/projects/informations/State'
import Work from '../components/project/projects/informations/Work';
import Content from '../components/project/projects/informations/Content';
import HomeMembers from '../components/project/projects/members/HomeMembers';
import Members from '../components/project/projects/members/Members';
import HomeTasks from '../components/project/projects/tasks/HomeTasks';
import ActivityFeed from '../components/project/projects/activity-feed/ActivityFeed';
import Tasks from '../components/project/projects/tasks/Tasks';

const Projects = ({ websocket, user }) => {
    const projectData = useSelector((state) => state.projectReducer)
    const [projects, setProjects] = useState([])
    const [project, setProject] = useState()
    const [isAdmin, setAdmin] = useState()
    const [isManager, setManager] = useState()
    const [isLoading, setLoading] = useState(true)
    const [home, setHome] = useState(true)
    // const [messenger, setMessenger] = useState(false)
    const [members, setMembers] = useState(false)
    const [tasks, setTasks] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (Object.keys(user).length > 0 && user.current_projects.length > 0) {
            const currentProjects = user.current_projects.map(async (project) => {
                return await axios.get(`${process.env.REACT_APP_API_URL}api/project/single/${project}`)
                    .then((res) => res.data).catch((err) => console.error(err))
            })
            Promise.all(currentProjects).then((res) => {
                setProjects(res)
                setProject(res[0])
                dispatch(getProject(res[0]._id))
                setLoading(false)
            })
        }
    }, [user, dispatch])

    useEffect(() => {
        if (Object.keys(projectData).length > 0) {
            setProject(projectData)
            setManager(projectData.manager === user._id)
            setAdmin(projectData.admins.includes(user._id))
        }
    }, [projectData, user._id])

    useEffect(() => {
        let socket = websocket.current
        socket.on("leaveProject", data => {
            let index = projects.filter(element => element._id !== data.projectId)
            setProjects(index)
            if (index.length > 0) setProject(index[0])
            else setProject(null)
        })
        return () => socket.off("leaveProject")
    }, [websocket.current, websocket, projects])

    const changeProject = (project) => {
        setProject(project)
        dispatch(getProject(project._id))
        setManager(project.manager === user._id)
        setAdmin(project.admins.includes(user._id))
        setHome(true)
        setMembers(false)
        setTasks(false)
    }

    return (
        <div className="dashboard">
            <Sidebar projects={projects} setProject={setProject} project={project} changeProject={changeProject} isLoading={isLoading} user={user} home={home} setHome={setHome} members={members} setMembers={setMembers} tasks={tasks} setTasks={setTasks} />
            <div className="dashboard-content">
                {project &&
                    <>
                        <Header project={project} websocket={websocket} user={user} />
                        {home &&
                            <div className="grid grid-cols-2 gap-4 py-4 pl-4 pr-2">
                                <div>
                                    <div className="bg-white dark:bg-background_primary_light text-gray-500 dark:text-slate-300 px-5 rounded-xl">
                                        <Title project={project} />
                                        <Category project={project} />
                                        <Location project={project} />
                                        <End project={project} />
                                        <State project={project} />
                                        <Work project={project} />
                                        <Content project={project} />
                                    </div>
                                </div>
                                <div>
                                    <div className="bg-white dark:bg-background_primary_light text-gray-500 dark:text-slate-300 px-5 mb-5 rounded-xl">
                                        <HomeMembers project={project} setProject={setProject} isAdmin={isAdmin} isManager={isManager} user={user} websocket={websocket} />
                                    </div>
                                    <div className="bg-white dark:bg-background_primary_light text-gray-500 dark:text-slate-300 px-5 mb-5 rounded-xl">
                                        <HomeTasks project={project} isAdmin={isAdmin} isManager={isManager} user={user} websocket={websocket} />
                                    </div>
                                    <div className="bg-white dark:bg-background_primary_light text-gray-500 dark:text-slate-300 px-5 rounded-xl">
                                        <ActivityFeed project={project} user={user} websocket={websocket} />
                                    </div>
                                </div>
                            </div>
                        }
                        {members &&
                            <Members project={project} setProject={setProject} isAdmin={isAdmin} isManager={isManager} user={user} websocket={websocket} />
                        }
                        {tasks &&
                            <Tasks project={project} isAdmin={isAdmin} isManager={isManager} user={user} websocket={websocket} />
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default Projects