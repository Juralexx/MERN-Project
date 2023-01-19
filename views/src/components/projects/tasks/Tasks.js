import React, { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Kanban from './Kanban'
import TasksList from './TasksList'
import TaskModal from './TaskModal'
import CreateTask from './CreateTask'
import Icon from '../../tools/icons/Icon'
import { TextButton } from '../../tools/global/Button'
import { addClass } from '../../Utils'

const Tasks = ({ project, user, websocket }) => {
    const [tasks, setTasks] = useState(project.tasks)

    const names = ["todo", "in progress", "done"]
    const sortedTasks = [
        project.tasks.filter(element => element.state === "todo"),
        project.tasks.filter(element => element.state === "in progress"),
        project.tasks.filter(element => element.state === "done")
    ]

    return (
        <>
            <div className="container-lg py-10">
                <div className="dashboard-tasks-header">
                    <div className="dashboard-tasks-header_left">
                        <h2>Tâches <span>({project.tasks.length})</span></h2>
                        <div className="dashboard-tasks-nav">
                            <Link to={`/projects/${project.URLID}/${project.URL}/tasks`} className={addClass(window.location.pathname === `/projects/${project.URLID}/${project.URL}/tasks`, 'active')}>
                                Kanban
                            </Link>
                            <Link to={`/projects/${project.URLID}/${project.URL}/tasks/list`} className={addClass(window.location.pathname === `/projects/${project.URLID}/${project.URL}/tasks/list`, 'active')}>
                                Liste
                            </Link>
                        </div>
                    </div>
                    {window.location.pathname.includes('list') ? (
                        <TextButton className="btn_icon_start">
                            <Link to={`/projects/${project.URLID}/${project.URL}/tasks/list/create`}>
                                <Icon name="Plus" /> Ajouter une tâche
                            </Link>
                        </TextButton>
                    ) : (
                        <TextButton className="btn_icon_start">
                            <Link to={`/projects/${project.URLID}/${project.URL}/tasks/create`}>
                                <Icon name="Plus" /> Ajouter une tâche
                            </Link>
                        </TextButton>
                    )}
                </div>
                <Routes>
                    <Route path='/*' element={
                        <>
                            <Kanban
                                project={project}
                                user={user}
                                websocket={websocket}
                                names={names}
                                sortedTasks={sortedTasks}
                            />
                            <Routes>
                                <Route path=':id/*' element={
                                    <TaskModal
                                        user={user}
                                        project={project}
                                        websocket={websocket}
                                    />
                                } />
                                <Route path='create' element={
                                    <CreateTask
                                        project={project}
                                        user={user}
                                        websocket={websocket}
                                    />
                                } />
                            </Routes>
                        </>
                    } />
                    <Route path='list/*' element={
                        <>
                            <TasksList
                                project={project}
                                user={user}
                                websocket={websocket}
                                names={names}
                                sortedTasks={sortedTasks}
                                tasks={tasks}
                                setTasks={setTasks}
                            />
                            <Routes>
                                <Route path=':id/*' element={
                                    <TaskModal
                                        user={user}
                                        project={project}
                                        websocket={websocket}
                                    />
                                } />
                                <Route path='create' element={
                                    <CreateTask
                                        project={project}
                                        user={user}
                                        websocket={websocket}
                                    />
                                } />
                            </Routes>
                        </>
                    } />
                </Routes>
            </div>
        </>
    )
}

export default Tasks