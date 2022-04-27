import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeState, stateToBackground, isDatePassed, removeTask, stateToString, statusToBackground, statusToString, sortByCreationDate, sortByEndDate, sortByState, sortByStatus, randomizeCheckboxID } from '../../../tools/functions/task'
import { clickOn, useClickOutside } from '../../../tools/functions/useClickOutside'
import { reduceString } from '../../../tools/functions/reduceString'
import { dateParserWithoutYear, reverseArray } from '../../../Utils'
import CreateTask from './CreateTask'
import UpdateTask from './UpdateTask'
import TaskModal from './TaskModal'
import SmallMenu from '../../../tools/components/SmallMenu'
import { TextButton, ToolsBtn } from '../../../tools/components/Button'
import { DropdownInput } from '../../../tools/components/Inputs'
import { getDifference } from '../../../tools/functions/function'
import { RiCalendarTodoLine } from 'react-icons/ri'
import { MdOutlineMessage } from 'react-icons/md'
import { BiDotsVerticalRounded } from 'react-icons/bi'

const HomeTasks = ({ project, isAdmin, isManager, user, websocket }) => {
    const [tasks, setTasks] = useState(project.tasks)
    const [openTask, setOpenTask] = useState(false)
    const [createTask, setCreateTask] = useState(false)
    const [updateTask, setUpdateTask] = useState(false)
    const [getTask, setTask] = useState(null)
    const [navbar, setNavbar] = useState(1)
    const taskMenu = useRef()
    const [openTaskMenu, setOpenTaskMenu] = useState(-1)
    useClickOutside(taskMenu, setOpenTaskMenu, -1)
    const tasksMenuRef = useRef()
    const [openTasksMenu, setOpenTasksMenu] = useState(false)
    useClickOutside(tasksMenuRef, setOpenTasksMenu, false)
    const filterMenu = useRef()
    const [display, setDisplay] = useState(false)
    useClickOutside(filterMenu, setDisplay, false)
    const [filter, setFilter] = useState("")
    const dispatch = useDispatch()
    const addActive = (state, classe) => { if (state) { return classe } else { return "" } }

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
    }, [navbar, project.tasks])

    return (
        <>
            <div className="home-tasks mt-5">
                <div className="home-tasks-header">
                    <div className="home-tasks-nav-header-top">
                        <h3>Tâches <span>{tasks.length}</span></h3>
                        <div className="flex">
                            <Link to="tasks"><TextButton text="Voir tous" className="mr-2" /></Link>
                            {(isAdmin || isManager) &&
                                <div ref={taskMenu} className="flex items-center">
                                    <ToolsBtn onClick={() => setOpenTasksMenu(!openTasksMenu)}><BiDotsVerticalRounded /></ToolsBtn>
                                    {openTasksMenu && (
                                        <SmallMenu top="top-1">
                                            <div className="tools-choice" onClick={() => setCreateTask(true)}>Créer une nouvelle tâche</div>
                                        </SmallMenu>
                                    )}
                                </div>
                            }
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="home-tasks-nav">
                            <div className={`home-tasks-nav-item ${addActive(navbar === 1, "active")}`} onClick={() => setNavbar(1)}>Tous</div>
                            <div className={`home-tasks-nav-item ${addActive(navbar === 2, "active")}`} onClick={() => setNavbar(2)}>À traiter</div>
                            <div className={`home-tasks-nav-item ${addActive(navbar === 3, "active")}`} onClick={() => setNavbar(3)}>En cours</div>
                            <div className={`home-tasks-nav-item ${addActive(navbar === 4, "active")}`} onClick={() => setNavbar(4)}>Terminée</div>
                        </div>
                        <DropdownInput useRef={filterMenu} readOnly placeholder="Filtrer" value={filter} className="small right light ml-3" open={display} onClick={() => setDisplay(!display)} clean={() => { setFilter(""); setTasks(reverseArray(project.tasks)) }}>
                            <div onClick={() => sortByEndDate(tasks, setTasks, setFilter, setDisplay)}>Par date de fin</div>
                            <div onClick={() => sortByCreationDate(tasks, setTasks, setFilter, setDisplay)}>Par date de création</div>
                            <div onClick={() => sortByState(tasks, setTasks, setFilter, setDisplay)}>Par état</div>
                            <div onClick={() => sortByStatus(tasks, setTasks, setFilter, setDisplay)}>Par status</div>
                        </DropdownInput>
                    </div>
                </div>
                <div className="home-tasks-container custom-scrollbar">
                    {tasks.length > 0 ? (
                        tasks.map((element, key) => {
                            return (
                                <div className={`home-tasks-task`} key={key}>
                                    <div className="check-input mr-2">
                                        <input id={randomizeCheckboxID(key)} type="checkbox" checked={element.state === "done"} onChange={() => changeState(element, "done", project, user, websocket, dispatch)} />
                                        <label htmlFor={randomizeCheckboxID(key)}><span><svg width="12px" height="9px" viewBox="0 0 12 9"><polyline points="1 5 4 8 11 1"></polyline></svg></span></label>
                                    </div>
                                    <div className="home-tasks-task-content">
                                        <div className="home-tasks-task-content-inner">
                                            <div className="flex items-center">{reduceString(element.title, 60)}</div>
                                            <div className="home-tasks-task-tools">
                                                {element.comments.length > 0 &&
                                                    <div className="flex items-center mr-2"><MdOutlineMessage className="mr-1" /><span>{element.comments.length}</span></div>
                                                }
                                                <ToolsBtn className="ml-2" onClick={() => clickOn(openTaskMenu, setOpenTaskMenu, element._id)}><BiDotsVerticalRounded /></ToolsBtn>
                                                {openTaskMenu === element._id &&
                                                    <SmallMenu useRef={taskMenu}>
                                                        <div className="tools-choice" onClick={() => { setTask(element); setOpenTask(true) }}>Voir</div>
                                                        <div className="tools-choice" onClick={() => { setTask(element); setUpdateTask(true); setOpenTaskMenu(false) }}>Modifier</div>
                                                        {(isAdmin || isManager) && <div className="tools-choice" onClick={() => removeTask(element, project, user, websocket, dispatch)}>Supprimer</div>}
                                                    </SmallMenu>
                                                }
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className={`details ${stateToBackground(element.state)}`}>{stateToString(element.state)}</div>
                                            <div className={`details mx-2 ${statusToBackground(element.status)}`}>{statusToString(element.status)}</div>
                                            <div className={`details ${isDatePassed(element.end)}`}>{dateParserWithoutYear(element.end)}</div>
                                            <div className="home-tasks-task-members">
                                                {element.members.length <= 5 && (
                                                    <div className="flex">
                                                        {element.members.map((member, uniquekey) => {
                                                            return (
                                                                <div className="home-tasks-task-member" key={uniquekey}>
                                                                    <div className="pseudo">{member.pseudo.substring(0, 3)}</div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                )}
                                                {element.members.length > 5 && (
                                                    element.members.slice(0, 5).map((member, uniquekey) => {
                                                        return (
                                                            <div className="home-tasks-task-member" key={uniquekey}>
                                                                <div className="pseudo">{member.pseudo.substring(0, 3)}</div>
                                                            </div>
                                                        )
                                                    })
                                                )}
                                                {element.members.length > 5 && (
                                                    <div className="get-difference">{getDifference(5, element.members.length)}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="empty-array">
                            <div><RiCalendarTodoLine /></div>
                            <div>Vous n'avez aucunes tâches en cours...</div>
                        </div>
                    )}
                </div>
            </div>

            {openTask && <TaskModal task={getTask} project={project} open={openTask} setOpen={setOpenTask} setUpdateTask={setUpdateTask} user={user} />}
            {<CreateTask open={createTask} setOpen={setCreateTask} project={project} user={user} websocket={websocket} />}
            {updateTask && <UpdateTask element={getTask} open={updateTask} setOpen={setUpdateTask} project={project} user={user} websocket={websocket} />}
        </>
    )
}

export default HomeTasks