import React, { useState, useRef } from 'react'
import axios from 'axios'
import { clickOn, useClickOutside } from '../../../tools/functions/useClickOutside'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import SmallMenu from '../../../tools/components/SmallMenu'
import { dateParser } from '../../../Utils'
import CreateTask from './CreateTask'
import TasksMenu from './TasksMenu'
import UpdateTask from './UpdateTask'
import { useDispatch } from 'react-redux'
import { changeTaskState, deleteTask } from '../../../../actions/project.action'

const Tasks = ({ project, admins, isManager, user, websocket }) => {
    const isAdmin = admins.some(member => member.id === user._id)
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

    const changeState = async (element) => {
        const state = () => { if (element.state === "undone") { return "done" } else { return "undone" } }
        const members = project.members.filter(member => member.id !== user._id)
        members.map(member => {
            return websocket.current.emit('updateTaskState', {
                receiverId: member.id,
                taskId: element._id,
                state: state()
            })
        })
        dispatch(changeTaskState(project._id, element._id, state()))
    }

    const removeTask = (task) => {
        const members = project.members.filter(member => member.id !== user._id)
        members.map(member => {
            return websocket.current.emit('deleteTask', {
                receiverId: member.id,
                taskId: task._id
            })
        })
        dispatch(deleteTask(project._id, task._id))
    }

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
                            <div className="flex items-center">
                                <input type="checkbox" checked={element.state === "done"} className="mr-3" onClick={() => changeState(element)} />
                                <div>
                                    <div>{element.title}</div>
                                    <div className="text-xs">{dateParser(element.end)}</div>
                                </div>
                            </div>
                            {(isAdmin || isManager) && (
                                <div>
                                    <BiDotsVerticalRounded className="h-5 w-5 cursor-pointer" onClick={() => clickOn(openTaskMenu, setOpenTaskMenu, key)} />
                                    {openTaskMenu === key && (
                                        <SmallMenu useRef={taskMenu}>
                                            <div className="py-2 cursor-pointer" onClick={() => { setTask(element); setUpdateTask(true) }}>Modifier</div>
                                            <div className="py-2 cursor-pointer" onClick={() => removeTask(element)}>Supprimer</div>
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