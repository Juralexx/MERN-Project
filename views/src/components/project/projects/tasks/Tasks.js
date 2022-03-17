import React, { useState, useRef } from 'react'
import axios from 'axios'
import { useClickOutside } from '../../../tools/functions/useClickOutside'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import SmallMenu from '../../../tools/components/SmallMenu'
import { dateParser } from '../../../Utils'
import CreateTask from './CreateTask'

const Tasks = ({ project, admins, user }) => {
    const isAdmin = admins.some(member => member.id === user._id)
    const [createTask, setCreateTask] = useState(false)
    const taskMenu = useRef()
    const [openTaskMenu, setOpenTaskMenu] = useState(-1)
    useClickOutside(taskMenu, setOpenTaskMenu, -1)
    const tasksMenu = useRef()
    const [openTasksMenu, setOpenTasksMenu] = useState(false)
    useClickOutside(tasksMenu, setOpenTasksMenu, false)

    const changeState = async (element) => {
        function state() { if (element.state === "undone") { return "done" } else return "undone" }
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/update-task/${project._id}`,
            data: {
                taskId: element._id,
                state: state()
            }
        })
            .then((res) => console.log(res)).catch(err => console.log(err))
    }

    return (
        <>
            <div className="py-3">
                <div className="relative flex justify-between items-center px-3 py-3 mb-2 border-b border-b-slate-300/30">
                    <div className="text-xl">Tâches ({project.tasks.length})</div>
                    {isAdmin &&
                        <div ref={tasksMenu}>
                            <BiDotsVerticalRounded className="h-5 w-5 cursor-pointer" onClick={() => setOpenTasksMenu(!openTasksMenu)} />
                            {openTasksMenu && (
                                <SmallMenu>
                                    <div className="py-2 cursor-pointer" onClick={() => setCreateTask(true)}>Créer une nouvelle tâche</div>
                                </SmallMenu>
                            )}
                        </div>
                    }
                </div>
                {project.tasks.map((element, key) => {
                    return (
                        <div className="relative flex justify-between items-center py-3 px-3" key={key}>
                            <div className="flex items-center">
                                <button type="checkbox" className="mr-3" onClick={() => changeState(element)}>Button</button>
                                <div>
                                    <div className="">{element.title}</div>
                                    <div className="text-xs">{dateParser(element.end)}</div>
                                </div>
                            </div>
                            <div ref={taskMenu}>
                                {element.id !== user._id && (
                                    <div>
                                        <BiDotsVerticalRounded className="h-5 w-5 cursor-pointer" onClick={() => setOpenTaskMenu(key)} />
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
            {<CreateTask open={createTask} setOpen={setCreateTask} project={project} user={user} />}
        </>
    )
}

export default Tasks