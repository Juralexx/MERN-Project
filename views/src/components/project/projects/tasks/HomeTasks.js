import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeState, stateToBackground, isDatePassed, removeTask, stateToString, statusToBackground, statusToString, sortByCreationDate, sortByEndDate, sortByState, sortByStatus, randomizeCheckboxID } from '../../../tools/functions/task'
import { addClass, dateParserWithoutYear, getDifference, reverseArray } from '../../../Utils'
import CreateTask from './CreateTask'
import UpdateTask from './UpdateTask'
import TaskModal from './TaskModal'
import ToolsMenu from '../../../tools/global/ToolsMenu'
import { StringButton } from '../../../tools/global/Button'
import { DropdownInput } from '../../../tools/global/Inputs'
import { RiCalendarTodoLine } from 'react-icons/ri'
import { MdOutlineMessage } from 'react-icons/md'
import Checkbox from '../../../tools/global/Checkbox'

const HomeTasks = ({ project, isAdmin, isManager, user, websocket }) => {
    const [tasks, setTasks] = useState(project.tasks)
    const [openTask, setOpenTask] = useState(false)
    const [createTask, setCreateTask] = useState(false)
    const [updateTask, setUpdateTask] = useState(false)
    const [getTask, setTask] = useState(null)
    const [navbar, setNavbar] = useState(1)
    const [filter, setFilter] = useState("")
    const dispatch = useDispatch()

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
            <div className="dashboard-card home-tasks">
                <div className="home-tasks-header">
                    <div className="home-tasks-nav-header-top">
                        <h3>Tâches <span>{tasks.length}</span></h3>
                        <div className="flex items-center">
                            <StringButton className="mr-4">
                                <Link to="tasks">Voir tous</Link>
                            </StringButton>
                            {(isAdmin || isManager) &&
                                <ToolsMenu>
                                    <div className="tools_choice" onClick={() => setCreateTask(true)}>Créer une nouvelle tâche</div>
                                </ToolsMenu>
                            }
                        </div>
                    </div>
                    <div className="home-tasks-nav-header-bottom">
                        <div className="tasks_nav">
                            <div className={`${addClass(navbar === 1, "active")}`} onClick={() => setNavbar(1)}>Tous</div>
                            <div className={`${addClass(navbar === 2, "active")}`} onClick={() => setNavbar(2)}>À traiter</div>
                            <div className={`${addClass(navbar === 3, "active")}`} onClick={() => setNavbar(3)}>En cours</div>
                            <div className={`${addClass(navbar === 4, "active")}`} onClick={() => setNavbar(4)}>Terminée</div>
                        </div>
                        <DropdownInput
                            className="small md:ml-3"
                            placeholder="Filtrer"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            cross
                            onClean={() => { setFilter(""); setTasks(reverseArray(project.tasks)) }}
                        >
                            <div onClick={() => { setTasks(sortByEndDate(tasks)); setFilter("Par date de fin") }}>Par date de fin</div>
                            <div onClick={() => { setTasks(sortByCreationDate(tasks)); setFilter("Par date de création") }}>Par date de création</div>
                            <div onClick={() => { setTasks(sortByState(tasks)); setFilter("Par état") }}>Par état</div>
                            <div onClick={() => { setTasks(sortByStatus(tasks)); setFilter("Par status") }}>Par status</div>
                        </DropdownInput>
                    </div>
                </div>
                <div className="dashboard-card-container home-tasks-container custom-scrollbar">
                    {tasks.length > 0 ? (
                        tasks.map((element, key) => {
                            return (
                                <div className={`home-tasks-task`} key={key}>
                                    <Checkbox
                                        uniqueKey={key}
                                        className="mr-2 mt-1"
                                        checked={element.state === "done"}
                                        onChange={() => changeState(element, "done", project, user, websocket, dispatch)}
                                    />
                                    <div className="home-tasks-task-content">
                                        <div className="home-tasks-task-content-inner">
                                            <div className="flex items-center one_line">{element.title}</div>
                                            <div className="home-tasks-task-tools">
                                                {element.comments.length > 0 &&
                                                    <div className="flex items-center mr-2">
                                                        <MdOutlineMessage className="mr-1" /><span>{element.comments.length}</span>
                                                    </div>
                                                }
                                                <ToolsMenu>
                                                    <div className="tools_choice" onClick={() => { setTask(element); setOpenTask(true) }}>Voir</div>
                                                    <div className="tools_choice" onClick={() => { setTask(element); setUpdateTask(true) }}>Modifier</div>
                                                    {(isAdmin || isManager) &&
                                                        <div className="tools_choice" onClick={() => removeTask(element, project, user, websocket, dispatch)}>Supprimer</div>
                                                    }
                                                </ToolsMenu>
                                            </div>
                                        </div>
                                        <div className="home-tasks-task-content-bottom">
                                            <div className="flex">
                                                <div className={`details ${stateToBackground(element.state)}`}>{stateToString(element.state)}</div>
                                                <div className={`details mx-2 ${statusToBackground(element.status)}`}>{statusToString(element.status)}</div>
                                                <div className={`details ${isDatePassed(element.end)}`}>{dateParserWithoutYear(element.end)}</div>
                                            </div>
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
                                                    <div className="get_difference">{getDifference(5, element.members.length)}</div>
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

            {openTask &&
                <TaskModal
                    task={getTask}
                    open={openTask}
                    setOpen={setOpenTask}
                    setUpdateTask={setUpdateTask}
                    project={project}
                    user={user}
                />}
            {<CreateTask
                open={createTask}
                setOpen={setCreateTask}
                project={project}
                user={user}
                websocket={websocket}
            />
            }
            {updateTask &&
                <UpdateTask
                    element={getTask}
                    open={updateTask}
                    setOpen={setUpdateTask}
                    project={project}
                    user={user}
                    websocket={websocket}
                />
            }
        </>
    )
}

export default HomeTasks