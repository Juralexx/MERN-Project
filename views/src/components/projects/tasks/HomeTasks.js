import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../tools/icons/Icon'
import Checkbox from '../../tools/global/Checkbox'
import { DropdownInput } from '../../tools/global/Inputs'
import { StringButton } from '../../tools/global/Button'
import CreateTask from './CreateTask'
import ToolsMenu from '../../tools/global/ToolsMenu'
import { updateTaskState, stateToBackground, isDatePassed, removeTask, stateToString, statusToBackground, statusToString, sortByCreationDate, sortByEndDate, sortByState, sortByStatus } from '../../tools/functions/task'
import { addClass, dateParserWithoutYear, getDifference, reverseArray } from '../../Utils'
import Warning from '../../tools/global/Warning'

const HomeTasks = ({ project, isAdmin, isManager, user, websocket }) => {
    const [tasks, setTasks] = useState(project.tasks)

    const [createTask, setCreateTask] = useState(false)

    const [navbar, setNavbar] = useState(1)
    const [filter, setFilter] = useState("")

    const [warning, setWarning] = useState(-1)

    return (
        <>
            <div className="dashboard-card home-tasks">
                <div className="home-tasks-header">
                    <div className="home-tasks-nav-header-top">
                        <h3>Tâches <span>{tasks.length}</span></h3>
                        <div className="flex items-center">
                            <StringButton>
                                <Link to="tasks">Voir tous</Link>
                            </StringButton>
                            {(isAdmin || isManager) &&
                                <ToolsMenu btnClassName="ml-4">
                                    <div className="tools_choice" onClick={() => setCreateTask(true)}>
                                        Créer une nouvelle tâche
                                    </div>
                                </ToolsMenu>
                            }
                        </div>
                    </div>
                    <div className="home-tasks-nav-header-bottom">
                        <div className="tasks_nav">
                            <div className={`${addClass(navbar === 1, "active")}`} onClick={() => {
                                setNavbar(1)
                                setTasks(reverseArray(project.tasks))
                            }}>
                                Tous
                            </div>
                            <div className={`${addClass(navbar === 2, "active")}`} onClick={() => {
                                setNavbar(2)
                                setTasks(reverseArray(project.tasks.filter(element => element.state === "todo")))
                            }}>
                                À traiter
                            </div>
                            <div className={`${addClass(navbar === 3, "active")}`} onClick={() => {
                                setNavbar(3)
                                setTasks(reverseArray(project.tasks.filter(element => element.state === "in progress")))
                            }}>
                                En cours
                            </div>
                            <div className={`${addClass(navbar === 4, "active")}`} onClick={() => {
                                setNavbar(4)
                                setTasks(reverseArray(project.tasks.filter(element => element.state === "done")))
                            }}>
                                Terminée
                            </div>
                        </div>
                        <DropdownInput
                            className="small md:ml-3"
                            placeholder="Filtrer"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            cross
                            onClean={() => {
                                setFilter("")
                                setTasks(reverseArray(project.tasks))
                            }}
                        >
                            <div onClick={() => {
                                setTasks(sortByEndDate(tasks))
                                setFilter("Par date de fin")
                            }}>
                                Par date de fin
                            </div>
                            <div onClick={() => {
                                setTasks(sortByCreationDate(tasks))
                                setFilter("Par date de création")
                            }}>
                                Par date de création
                            </div>
                            <div onClick={() => {
                                setTasks(sortByState(tasks))
                                setFilter("Par état")
                            }}>
                                Par état
                            </div>
                            <div onClick={() => {
                                setTasks(sortByStatus(tasks))
                                setFilter("Par status")
                            }}>
                                Par status
                            </div>
                        </DropdownInput>
                    </div>
                </div>
                <div className="dashboard-card-container home-tasks-container custom-scrollbar">
                    {tasks.length > 0 ? (
                        reverseArray(tasks).map((element, key) => {
                            return (
                                <div className={`home-tasks-task`} key={key}>
                                    <Checkbox
                                        uniqueKey={key}
                                        className="mr-2 mt-1"
                                        checked={element.state === "done"}
                                        onChange={() => updateTaskState(element, "done", project, user, websocket)}
                                    />
                                    <div className="home-tasks-task-content">
                                        <div className="home-tasks-task-content-inner">
                                            <div className="flex items-center font-normal one_line">{element.title}</div>
                                            <div className="flex items-center">
                                                {element.comments.length > 0 &&
                                                    <div className="flex items-center mx-3">
                                                        <Icon name="Message" className="w-5 h-5 mr-1" />
                                                        <span>{element.comments.length}</span>
                                                    </div>
                                                }
                                                <ToolsMenu>
                                                    <Link className="tools_choice" to={`/projects/${project.URLID}/${project.URL}/tasks/${element._id}`}>
                                                        Voir
                                                    </Link>
                                                    <Link className="tools_choice" to={`/projects/${project.URLID}/${project.URL}/tasks/${element._id}/update`}>
                                                        Modifier
                                                    </Link>
                                                    {(isAdmin || isManager) &&
                                                        <div className="tools_choice" onClick={() => setWarning(key)}>
                                                            Supprimer
                                                        </div>
                                                    }
                                                </ToolsMenu>
                                            </div>
                                        </div>
                                        <div className='home-tasks-task-description two_lines'>
                                            {element.description ? element.description : <em>Aucune description</em>}
                                        </div>
                                        <div className="home-tasks-task-content-bottom">
                                            <div className="flex">
                                                <div className={`details ${stateToBackground(element.state)}`}>
                                                    {stateToString(element.state)}
                                                </div>
                                                <div className={`details mx-2 ${statusToBackground(element.status)}`}>
                                                    {statusToString(element.status)}
                                                </div>
                                                <div className={`details ${isDatePassed(element.end)}`}>
                                                    {dateParserWithoutYear(element.end)}
                                                </div>
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
                                                                <div className="pseudo">
                                                                    {member.pseudo.substring(0, 3)}
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                )}
                                                {element.members.length > 5 && (
                                                    <div className="get_difference">
                                                        {getDifference(5, element.members.length)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <Warning
                                        title={`Supprimer la tâche suivante : ${element.title} ?`}
                                        text="Cette action est irréversible."
                                        validateBtn="Supprimer"
                                        className="delete"
                                        open={warning === key}
                                        setOpen={setWarning}
                                        onValidate={() => removeTask(element, project, user, websocket)}
                                    />
                                </div>
                            )
                        })
                    ) : (
                        <div className="empty-array">
                            <Icon name="Calendar" />
                            <div>Vous n'avez aucunes tâches en cours...</div>
                        </div>
                    )}
                </div>
            </div>

            {/*openTask &&
                <TaskModal
                    task={task}
                    open={openTask}
                    setOpen={setOpenTask}
                    setUpdateTask={setUpdateTask}
                    project={project}
                    user={user}
                    websocket={websocket}
                />
            }*/}
            <CreateTask
                open={createTask}
                setOpen={setCreateTask}
                project={project}
                user={user}
                websocket={websocket}
            />
            {/* {updateTask &&
                <UpdateTask
                    task={task}
                    open={updateTask}
                    setOpen={setUpdateTask}
                    project={project}
                    user={user}
                    websocket={websocket}
                />
            } */}
        </>
    )
}

export default HomeTasks