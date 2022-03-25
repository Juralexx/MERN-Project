import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useClickOutside } from '../../../tools/functions/useClickOutside'
import { reverseArray } from '../../../Utils'
import { IconButton } from '../../../tools/components/Button'
import CreateTask from './CreateTask'
import UpdateTask from './UpdateTask'
import Kanban from './Kanban'
import TasksList from './TasksList'
import { AiOutlinePlusCircle } from 'react-icons/ai'

const Tasks = ({ project, isAdmin, isManager, user, websocket }) => {
    const [tasks, setTasks] = useState(reverseArray(project.tasks))
    const [createTask, setCreateTask] = useState(false)
    const [updateTask, setUpdateTask] = useState(false)
    const [showTask, setShowTask] = useState(-1)
    const [getTask, setTask] = useState(null)
    const [navbar, setNavbar] = useState(1)
    const [layout, setLayout] = useState("kanban")
    const taskMenu = useRef()
    const [openTaskMenu, setOpenTaskMenu] = useState(-1)
    useClickOutside(taskMenu, setOpenTaskMenu, -1)
    const dispatch = useDispatch()
    const localStore = localStorage.getItem("taskLayout")

    const handleLayout = () => {
        if (layout === "list") {
            localStorage.setItem("taskLayout", "kanban");
            setLayout("kanban")
        } else {
            localStorage.setItem("taskLayout", "list");
            setLayout("list")
        }
    }

    useEffect(() => {
        if (project) {
            if (localStore !== null && localStore === "kanban") {
                setLayout("kanban")
            } else if (localStore !== null && localStore === "list") {
                setLayout("list")
            } else {
                localStorage.setItem("taskLayout", "kanban");
            }
        }
    }, [project, localStore])

    useEffect(() => {
        if (navbar === 1) {
            setTasks(reverseArray(project.tasks))
        } else if (navbar === 2) {
            setTasks(reverseArray(project.tasks.filter(element => element.state === "todo")))
        } else if (navbar === 3) {
            setTasks(reverseArray(project.tasks.filter(element => element.state === "in progress")))
        } else if (navbar === 4) {
            setTasks(reverseArray(project.tasks.filter(element => element.state === "done")))
        }
    }, [navbar])

    return (
        <>
            <div className="bg-white dark:bg-background_primary_light my-5 mx-auto w-[97%] max-w-[1366px] text-gray-500 dark:text-slate-300 px-6 py-6 rounded-xl">
                <div className="flex justify-between items-center">
                    <div className="flex">
                        <div className="text-xl">Tâches ({project.tasks.length})</div>
                        <div className="flex items-center ml-7 text-xl">
                            <div className="px-3" onClick={handleLayout}>Kanban</div>
                            <div className="px-3" onClick={handleLayout}>Liste</div>
                        </div>
                    </div>
                    {(isAdmin || isManager) &&
                        <IconButton text="Ajouter une tâche" startIcon={<AiOutlinePlusCircle />} onClick={() => setCreateTask(true)} />
                    }
                </div>
                {layout === "list" ? (
                    <TasksList
                        project={project}
                        user={user}
                        isAdmin={isAdmin}
                        isManager={isManager}
                        tasks={tasks}
                        setTask={setTask}
                        setNavbar={setNavbar}
                        showTask={showTask}
                        setShowTask={setShowTask}
                        websocket={websocket}
                        dispatch={dispatch}
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
                        setTask={setTask}
                        setNavbar={setNavbar}
                        showTask={showTask}
                        setShowTask={setShowTask}
                        websocket={websocket}
                        dispatch={dispatch}
                        openTaskMenu={openTaskMenu}
                        setOpenTaskMenu={setOpenTaskMenu}
                        setUpdateTask={setUpdateTask}
                        layout={layout}
                    />
                )}
            </div>
            {<CreateTask open={createTask} setOpen={setCreateTask} project={project} user={user} websocket={websocket} />}
            {updateTask && <UpdateTask element={getTask} open={updateTask} setOpen={setUpdateTask} project={project} user={user} websocket={websocket} />}
        </>
    )
}

export default Tasks