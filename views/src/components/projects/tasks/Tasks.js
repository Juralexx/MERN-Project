import React, { useState } from 'react'
import { TextButton } from '../../tools/global/Button'
import CreateTask from './CreateTask'
import Kanban from './Kanban'
import TasksList from './TasksList'
import TaskModal from './TaskModal'
import Icon from '../../tools/icons/Icon'
import { Link, Route, Routes } from 'react-router-dom'
import { addClass } from '../../Utils'

const Tasks = ({ project, user, websocket }) => {
    const [tasks, setTasks] = useState(project.tasks)
    const [createTask, setCreateTask] = useState(false)

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
                    <TextButton className="btn_icon_start" onClick={() => setCreateTask(true)}>
                        <Icon name="Plus" /> Ajouter une tâche
                    </TextButton>
                </div>
                <Routes>
                    <Route path='*' element={
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
                            </Routes>
                        </>
                    } />
                    <Route path=':id/*' element={
                        <TaskModal
                            user={user}
                            project={project}
                            websocket={websocket}
                        />
                    } />
                </Routes>
            </div>
            <CreateTask
                open={createTask}
                setOpen={setCreateTask}
                project={project}
                user={user}
                websocket={websocket}
            />
        </>
    )
}

export default Tasks