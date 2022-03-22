import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { changeState, isDatePassed, removeTask } from '../../../tools/functions/task'
import { clickOn, useClickOutside } from '../../../tools/functions/useClickOutside'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import SmallMenu from '../../../tools/components/SmallMenu'
import { dateParser } from '../../../Utils'
import CreateTask from './CreateTask'
import TasksMenu from './TasksMenu'
import UpdateTask from './UpdateTask'

const Tasks = ({ project, isAdmin, isManager, user, websocket }) => {
    const [createTask, setCreateTask] = useState(false)
    const [updateTask, setUpdateTask] = useState(false)
    const [getTask, setTask] = useState(null)
    const taskMenu = useRef()
    const [openTaskMenu, setOpenTaskMenu] = useState(-1)
    useClickOutside(taskMenu, setOpenTaskMenu, -1)
    const tasksMenuRef = useRef()
    const [openTasksMenu, setOpenTasksMenu] = useState(false)
    useClickOutside(tasksMenuRef, setOpenTasksMenu, false)
    const dispatch = useDispatch()

    return (
        <>
            <div className="py-3">
                <div className="relative flex justify-between items-center px-3 py-3 mb-2 border-b border-b-slate-300/30">
                    <div className="text-xl">Tâches ({project.tasks.length})</div>
                    {(isAdmin || isManager) &&
                        <TasksMenu isAdmin={isAdmin} isManager={isManager} tasksMenuRef={tasksMenuRef} setOpen={setOpenTasksMenu} open={openTasksMenu} setCreateTask={setCreateTask} />
                    }
                </div>
                {project.tasks.map((element, key) => {
                    return (
                        <div className={`relative flex justify-between items-center py-3 px-3 ${element.state === "done" ? "line-through" : ""}`} key={key}>
                            <div className="flex items-center w-full">
                                <input type="checkbox" checked={element.state === "done"} className="mr-3" onChange={() => changeState(element, project, user, websocket, dispatch)} />
                                <div className="flex justify-between items-center w-full mr-5">
                                    <div>{element.title}</div>
                                    <div className="text-xs" style={{background: element.state !== "done" && isDatePassed(element.end)}}>{dateParser(element.end)}</div>
                                </div>
                            </div>
                            {(isAdmin || isManager) && (
                                <div>
                                    <BiDotsVerticalRounded className="h-5 w-5 cursor-pointer" onClick={() => clickOn(openTaskMenu, setOpenTaskMenu, key)} />
                                    {openTaskMenu === key && (
                                        <SmallMenu useRef={taskMenu}>
                                            <div className="py-2 cursor-pointer" onClick={() => { setTask(element); setUpdateTask(true) }}>Modifier</div>
                                            <div className="py-2 cursor-pointer" onClick={() => removeTask(element, project, user, websocket, dispatch)}>Supprimer</div>
                                        </SmallMenu>
                                    )}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
            {<CreateTask open={createTask} setOpen={setCreateTask} project={project} user={user} websocket={websocket} />}
            {updateTask && <UpdateTask element={getTask} open={updateTask} setOpen={setUpdateTask} project={project} user={user} websocket={websocket} />}
        </>
    )
}

export default Tasks