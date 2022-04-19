import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useClickOutside } from '../../../tools/functions/useClickOutside'
import { reverseArray } from '../../../Utils'
import { StartIconOutlinedButton } from '../../../tools/components/Button'
import CreateTask from './CreateTask'
import UpdateTask from './UpdateTask'
import Kanban from './Kanban'
import TasksList from './TasksList'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import TaskModal from './TaskModal'

const Tasks = ({ project, isAdmin, isManager, user, websocket }) => {
    const [tasks, setTasks] = useState(project.tasks)
    const [createTask, setCreateTask] = useState(false)
    const [updateTask, setUpdateTask] = useState(false)
    const [openTask, setOpenTask] = useState(false)
    const [getTask, setTask] = useState(null)
    const [navbar, setNavbar] = useState(1)
    const [layout, setLayout] = useState("kanban")
    const taskMenu = useRef()
    const [openTaskMenu, setOpenTaskMenu] = useState(-1)
    useClickOutside(taskMenu, setOpenTaskMenu, -1)
    const localStore = localStorage.getItem("taskLayout")
    const addActive = (state, classe) => { if (state) { return classe } else { return "" } }
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [end, setEnd] = useState("")
    const [state, setState] = useState("todo")
    const [status, setStatus] = useState("normal")
    const [array, setArray] = useState([])
    const dispatch = useDispatch()

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

    useEffect(() => {
        if (navbar === 1)
            setTasks(reverseArray(project.tasks))
        else if (navbar === 2)
            setTasks(reverseArray(project.tasks.filter(e => e.state === "todo")))
        else if (navbar === 3)
            setTasks(reverseArray(project.tasks.filter(e => e.state === "in progress")))
        else if (navbar === 4)
            setTasks(reverseArray(project.tasks.filter(e => e.state === "done")))
    }, [navbar, project.tasks])

    return (
        <>
            <div className="content-container">
                <div className="content-box">
                    <div className="dashboard-tasks-header">
                        <div className="dashboard-tasks-header-left">
                            <h2>Tâches ({project.tasks.length})</h2>
                            <div className="dashboard-tasks-nav">
                                <div className={`dashboard-tasks-nav-item ${addActive(layout === "kanban", "active")}`} onClick={handleLayout}>Kanban</div>
                                <div className={`dashboard-tasks-nav-item ${addActive(layout === "list", "active")}`} onClick={handleLayout}>Liste</div>
                            </div>
                        </div>
                        {(isAdmin || isManager) &&
                            <StartIconOutlinedButton text="Ajouter une tâche" icon={<AiOutlinePlusCircle />} onClick={() => setCreateTask(true)} />
                        }
                    </div>
                    {layout === "list" ? (
                        <TasksList
                            project={project}
                            user={user}
                            websocket={websocket}
                            dispatch={dispatch}
                            isAdmin={isAdmin}
                            isManager={isManager}
                            tasks={tasks}
                            setOpenTask={setOpenTask}
                            setTask={setTask}
                            navbar={navbar}
                            setNavbar={setNavbar}
                            openTaskMenu={openTaskMenu}
                            setOpenTaskMenu={setOpenTaskMenu}
                            setUpdateTask={setUpdateTask}
                        />
                    ) : (
                        <Kanban
                            project={project}
                            user={user}
                            isAdmin={isAdmin}
                            isManager={isManager}
                            tasks={tasks}
                            setOpenTask={setOpenTask}
                            setTask={setTask}
                            websocket={websocket}
                            dispatch={dispatch}
                            setCreateTask={setCreateTask}
                            setUpdateTask={setUpdateTask}
                            setState={setState}
                        />
                    )}
                </div>
            </div>
            <CreateTask
                open={createTask}
                setOpen={setCreateTask}
                project={project}
                user={user}
                websocket={websocket}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                end={end}
                setEnd={setEnd}
                state={state}
                setState={setState}
                status={status}
                setStatus={setStatus}
                array={array}
                setArray={setArray}
            />
            {updateTask &&
                <UpdateTask
                    project={project}
                    user={user}
                    websocket={websocket}
                    element={getTask}
                    open={updateTask}
                    setOpen={setUpdateTask}
                />
            }

            {openTask &&
                <TaskModal
                    task={getTask}
                    project={project}
                    open={openTask}
                    setOpen={setOpenTask}
                    setUpdateTask={setUpdateTask}
                    user={user}
                />
            }
        </>
    )
}

export default Tasks