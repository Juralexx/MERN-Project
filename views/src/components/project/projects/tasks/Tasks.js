import React, { useState, useRef } from 'react'
import axios from 'axios'
import { useClickOutside } from '../../../tools/functions/useClickOutside'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import SmallMenu from '../../../tools/components/SmallMenu'
import { dateParser } from '../../../Utils'
import CreateTask from './CreateTask'
import TasksMenu from './TasksMenu'
import UpdateTask from './UpdateTask'

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

    const changeState = async (element) => {
        const state = () => { if (element.state === "undone") { return "done" } else { return "undone" } }
        await axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/project/update-task/${project._id}`,
            data: {
                taskId: element._id,
                state: state()
            }
        }).then((res) => console.log(res)).catch(err => console.log(err))
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
                        <div className="relative flex justify-between items-center py-3 px-3" key={key}>
                            <div className="flex items-center">
                                <input type="checkbox" className="mr-3" onClick={() => changeState(element)} />
                                <div>
                                    <div>{element.title}</div>
                                    <div className="text-xs">{dateParser(element.end)}</div>
                                </div>
                            </div>
                            {(isAdmin || isManager) && (
                                <div ref={taskMenu}>
                                    <BiDotsVerticalRounded className="h-5 w-5 cursor-pointer" onClick={() => setOpenTaskMenu(key)} />
                                    {openTaskMenu === key && (
                                        <SmallMenu>
                                            <div className="py-2 cursor-pointer" onClick={() => { setTask(element); setUpdateTask(true) }}>Modifier</div>
                                            <div className="py-2 cursor-pointer">Supprimer</div>
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