import React, { useState } from 'react'
import Icon from '../../tools/icons/Icon'
import Checkbox from '../../tools/global/Checkbox'
import ToolsMenu from '../../tools/global/ToolsMenu'
import { updateState, stateToBackground, isDatePassed, removeTask, stateToString, statusToString, statusToBackground } from '../../tools/functions/task'
import { addClass, dateParser, getDifference, reduceString, reverseArray } from '../../Utils'

const TasksList = ({ project, user, tasks, setTasks, setTask, websocket, dispatch, setOpenTask, setUpdateTask }) => {
    const names = ["todo", "in progress", "done"]
    const sortedTasks = [
        tasks.filter(element => element.state === "todo"),
        tasks.filter(element => element.state === "in progress"),
        tasks.filter(element => element.state === "done")
    ]
    const [navbar, setNavbar] = useState(1)
    const [display, setDisplay] = useState([0, 1, 2])

    const actionOnClick = (key) => {
        if (display.includes(key))
            return setDisplay(display.filter(element => element !== key))
        else return setDisplay([...display, key])
    }

    return (
        <>
            <div className="tasks_nav !my-4">
                <div
                    className={`${addClass(navbar === 1, "active")}`}
                    onClick={() => {
                        setTasks(reverseArray(project.tasks))
                        setNavbar(1)
                    }}>
                    Tous
                </div>
                <div
                    className={`${addClass(navbar === 2, "active")}`}
                    onClick={() => {
                        setTasks(reverseArray(project.tasks.filter(e => e.state === "todo")))
                        setNavbar(2)
                    }}>
                    À traiter
                </div>
                <div
                    className={`${addClass(navbar === 3, "active")}`}
                    onClick={() => {
                        setTasks(reverseArray(project.tasks.filter(e => e.state === "in progress")))
                        setNavbar(3)
                    }}>
                    En cours
                </div>
                <div
                    className={`${addClass(navbar === 4, "active")}`}
                    onClick={() => {
                        setTasks(reverseArray(project.tasks.filter(e => e.state === "done")))
                        setNavbar(4)
                    }}>
                    Terminées
                </div>
            </div>
            {navbar === 1 ? (
                sortedTasks.map((arr, key) => {
                    return (
                        <div className={`tasklist-table ${addClass(!display.includes(key), 'closed')}`} key={key}>
                            <div className="tasklist-table-header" onClick={() => actionOnClick(key)}>
                                <div className="flex">
                                    <p>{stateToString(names[key])} <span>{arr.length}</span></p>
                                </div>
                                <Icon name="CaretDown" />
                            </div>
                            {arr.length > 0 ? (
                                arr.map((element, uniqueKey) => {
                                    return (
                                        <div className="tasklist-table-item" key={uniqueKey}>
                                            <Checkbox
                                                uniqueKey={uniqueKey}
                                                className="mr-2 mt-1"
                                                checked={element.state === "done"}
                                                onChange={() => updateState(element, "done", project, user, websocket, dispatch)}
                                            />
                                            <div className="tasklist-table-item-body">
                                                <div className="tasklist-table-item-top">
                                                    <div className="flex items-center">{reduceString(element.title, 60)}</div>
                                                    <div className="tasklist-table-item-tools">
                                                        {element.comments.length > 0 &&
                                                            <div className="flex items-center mr-2" onClick={() => {
                                                                setTask(element)
                                                                setOpenTask(true)
                                                            }}>
                                                                <Icon name="Chat" className="mr-1" />
                                                                <span>{element.comments.length}</span>
                                                            </div>
                                                        }
                                                        <ToolsMenu>
                                                            <div className="tools_choice" onClick={() => {
                                                                setTask(element)
                                                                setOpenTask(true)
                                                            }}>
                                                                Voir
                                                            </div>
                                                            <div className="tools_choice">
                                                                Commenter
                                                            </div>
                                                            <div className="tools_choice" onClick={() => {
                                                                setTask(element)
                                                                setUpdateTask(true)
                                                            }}>
                                                                Modifier
                                                            </div>
                                                            <div
                                                                className="tools_choice"
                                                                onClick={() => removeTask(element, project, user, websocket, dispatch)}
                                                            >
                                                                Supprimer
                                                            </div>
                                                        </ToolsMenu>
                                                    </div>
                                                </div>
                                                <div className='tasklist-item-description two_lines'>
                                                    {element.description ? element.description : <span>Aucune description</span>}
                                                </div>
                                                <div className="tasklist-table-item-bottom">
                                                    <div className='flex'>
                                                        <div className={`details ${stateToBackground(element.state)}`}>
                                                            {stateToString(element.state)}
                                                        </div>
                                                        <div className={`details mx-2 ${statusToBackground(element.status)}`}>
                                                            {statusToString(element.status)}
                                                        </div>
                                                        <div className={`details ${isDatePassed(element.end)}`}>
                                                            {dateParser(element.end)}
                                                        </div>
                                                    </div>
                                                    <div className="tasklist-table-item-members">
                                                        {element.members.length <= 5 && (
                                                            <div className="flex">
                                                                {element.members.map((member, i) => {
                                                                    return (
                                                                        <div className="tasklist-table-item-member" key={i}>
                                                                            <div className="pseudo">
                                                                                {member.pseudo.substring(0, 3)}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        )}
                                                        {element.members.length > 5 && (
                                                            element.members.slice(0, 5).map((member, i) => {
                                                                return (
                                                                    <div className="tasklist-table-item-member" key={i}>
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
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="empty-array">
                                    <Icon name="Calendar" />
                                    <div>Vous n'avez aucunes tâches <span>{stateToString(names[key])}...</span></div>
                                </div>
                            )}
                        </div>
                    )
                })
            ) : (
                tasks.map((element, key) => {
                    return (
                        <div className="tasklist-table" key={key}>
                            <div className="tasklist-table-item" key={key}>
                                <Checkbox
                                    uniqueKey={key}
                                    className="mr-2 mt-1"
                                    checked={element.state === "done"}
                                    onChange={() => updateState(element, "done", project, user, websocket, dispatch)}
                                />
                                <div className="tasklist-table-item-body">
                                    <div className="tasklist-table-item-top">
                                        <div className="flex items-center">
                                            {reduceString(element.title, 60)}
                                        </div>
                                        <div className="tasklist-table-item-tools">
                                            {element.comments.length > 0 &&
                                                <div className="flex items-center mr-2">
                                                    <Icon name="Chat" className="mr-1" />
                                                    <span>{element.comments.length}</span>
                                                </div>
                                            }
                                            <ToolsMenu>
                                                <div className="tools_choice" onClick={() => {
                                                    setTask(element)
                                                    setOpenTask(true)
                                                }}>
                                                    Voir
                                                </div>
                                                <div className="tools_choice">
                                                    Commenter
                                                </div>
                                                <div className="tools_choice" onClick={() => {
                                                    setTask(element)
                                                    setUpdateTask(true)
                                                }}>
                                                    Modifier
                                                </div>
                                                <div
                                                    className="tools_choice"
                                                    onClick={() => removeTask(element, project, user, websocket, dispatch)}
                                                >
                                                    Supprimer
                                                </div>
                                            </ToolsMenu>
                                        </div>
                                    </div>
                                    <div className='tasklist-item-description two_lines'>
                                        {element.description ? element.description : <span>Aucune description</span>}
                                    </div>
                                    <div className="tasklist-table-item-bottom">
                                        <div className='flex'>
                                            <div className={`details ${stateToBackground(element.state)}`}>
                                                {stateToString(element.state)}
                                            </div>
                                            <div className={`details mx-2 ${statusToBackground(element.status)}`}>
                                                {statusToString(element.status)}
                                            </div>
                                            <div className={`details ${isDatePassed(element.end)}`}>
                                                {dateParser(element.end)}
                                            </div>
                                        </div>
                                        <div className="tasklist-table-item-members">
                                            {element.members.length <= 5 && (
                                                <div className="flex">
                                                    {element.members.map((member, uniquekey) => {
                                                        return (
                                                            <div className="tasklist-table-item-member" key={uniquekey}>
                                                                <div className="pseudo">
                                                                    {member.pseudo.substring(0, 3)}
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                            {element.members.length > 5 && (
                                                element.members.slice(0, 5).map((member, uniquekey) => {
                                                    return (
                                                        <div className="tasklist-table-item-member" key={uniquekey}>
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
                            </div>
                        </div>
                    )
                })
            )}
        </>
    )
}

export default TasksList