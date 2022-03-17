import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { getProject } from '../actions/project.action';
import { UserContext } from '../components/AppContext'
import Sidebar from '../components/project/projects/Sidebar'
import Header from '../components/project/projects/Header'
import Title from '../components/project/projects/informations/Title'
import Location from '../components/project/projects/informations/Location'
import Category from '../components/project/projects/informations/Category'
import End from '../components/project/projects/informations/End'
import State from '../components/project/projects/informations/State'
import Work from '../components/project/projects/informations/Work';
import Content from '../components/project/projects/informations/Content';
import Members from '../components/project/projects/members/Members';
import Tasks from '../components/project/projects/tasks/Tasks';

const Projects = ({ websocket }) => {
    const projectData = useSelector((state) => state.projectReducer)
    const user = useContext(UserContext)
    const [projects, setProjects] = useState([])
    const [project, setProject] = useState()
    const [admins, setAdmins] = useState([])
    const [isLoading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        if (user) {
            const getProjects = async () => {
                const currentUserProjects = user.current_projects.map(async (project) => {
                    return await axios.get(`${process.env.REACT_APP_API_URL}api/project/single/${project}`)
                        .then((res) => res.data)
                        .catch((err) => console.error(err))
                })
                Promise.all(currentUserProjects).then((res) => {
                    setProjects(res)
                    setProject(res[0])
                    dispatch(getProject(res[0]._id))
                    setAdmins(res[0].members.filter(member => member.role === "admin"))
                    setLoading(false)
                })
            }
            getProjects()
        }
    }, [user, dispatch])

    useEffect(() => {
        if (projectData && !isLoading) {
            setProject(projectData)
        }
    }, [projectData])

    const changeProject = (project) => {
        setProject(project)
        dispatch(getProject(project._id))
        setAdmins(project.members.filter(member => member.role === "admin"))
    }

    return (
        <div className="relative flex w-[100%] h-[calc(100%-60px)] bg-background_light dark:bg-background_primary">
            <Sidebar projects={projects} setProject={setProject} changeProject={changeProject} isLoading={isLoading} user={user} />
            <div className="relative w-full h-full overflow-y-auto">
                {project &&
                    <>
                        <Header project={project} />
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
                                    <Members project={project} admins={admins} user={user} websocket={websocket} />
                                </div>
                                <div className="bg-white dark:bg-background_primary_light text-gray-500 dark:text-slate-300 px-5 rounded-xl">
                                    <Tasks project={project} admins={admins} user={user} />
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Projects