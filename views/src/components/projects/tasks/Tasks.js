import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addClass } from '../../Utils'
import { TextButton } from '../../tools/global/Button'
import CreateTask from './CreateTask'
import UpdateTask from './UpdateTask'
import Kanban from './Kanban'
import TasksList from './TasksList'
import TaskModal from './TaskModal'
import Icon from '../../tools/icons/Icon'

const Tasks = ({ project, user, websocket }) => {
    const [tasks, setTasks] = useState(project.tasks)
    const [task, setTask] = useState(project.tasks[0])

    const [openTask, setOpenTask] = useState(false)
    const [createTask, setCreateTask] = useState(false)
    const [updateTask, setUpdateTask] = useState(false)
    
    const dispatch = useDispatch()

    const [layout, setLayout] = useState("kanban")
    const localStore = localStorage.getItem("taskLayout")

    const handleLayout = () => {
        if (layout === "list") {
            localStorage.setItem("taskLayout", "kanban")
            setLayout("kanban")
        } else {
            localStorage.setItem("taskLayout", "list")
            setLayout("list")
        }
    }

    useEffect(() => {
        if (project)
            if (localStore !== null && localStore === "kanban")
                setLayout("kanban")
            else if (localStore !== null && localStore === "list")
                setLayout("list")
            else localStorage.setItem("taskLayout", "kanban")
    }, [project, localStore])

    return (
        <>
            <div className="container-lg py-10">
                <div className="dashboard-tasks-header">
                    <div className="dashboard-tasks-header_left">
                        <h2>Tâches <span>({project.tasks.length})</span></h2>
                        <div className="dashboard-tasks-nav">
                            <div
                                className={`${addClass(layout === "kanban", "active")}`}
                                onClick={handleLayout}
                            >
                                Kanban
                            </div>
                            <div
                                className={`${addClass(layout === "list", "active")}`}
                                onClick={handleLayout}
                            >
                                Liste
                            </div>
                        </div>
                    </div>
                    <TextButton className="btn_icon_start" onClick={() => setCreateTask(true)}>
                        <Icon name="Plus" /> Ajouter une tâche
                    </TextButton>
                </div>
                {layout === "list" ? (
                    <TasksList
                        project={project}
                        user={user}
                        websocket={websocket}
                        tasks={tasks}
                        setTasks={setTasks}
                        setTask={setTask}
                        setOpenTask={setOpenTask}
                        setUpdateTask={setUpdateTask}
                        dispatch={dispatch}
                    />
                ) : (
                    <Kanban
                        project={project}
                        user={user}
                        websocket={websocket}
                        tasks={tasks}
                        setTask={setTask}
                        setOpenTask={setOpenTask}
                        setUpdateTask={setUpdateTask}
                        dispatch={dispatch}
                    />
                )}
            </div>
            <CreateTask
                open={createTask}
                setOpen={setCreateTask}
                project={project}
                user={user}
                websocket={websocket}
            />
            <UpdateTask
                project={project}
                user={user}
                websocket={websocket}
                task={task}
                open={updateTask}
                setOpen={setUpdateTask}
            />
            <TaskModal
                task={task}
                project={project}
                open={openTask}
                setOpen={setOpenTask}
                setUpdateTask={setUpdateTask}
                user={user}
            />
        </>
    )
}

export default Tasks