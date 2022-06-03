import React, { useState } from 'react'
import { changeState, stateToBackground, isDatePassed, removeTask, stateToString, statusToString, statusToBackground, randomizeCheckboxID } from '../../../tools/functions/task'
import { clickOn } from '../../../tools/hooks/useClickOutside'
import { addClass, dateParser, getDifference, reduceString } from '../../../Utils'
import ToolsMenu from '../../../tools/global/ToolsMenu'
import { IoCaretDownOutline } from 'react-icons/io5'
import { RiCalendarTodoLine } from 'react-icons/ri'
import { MdOutlineMessage } from 'react-icons/md'

const TasksList = ({ project, user, isAdmin, isManager, navbar, setNavbar, tasks, showTask, setShowTask, websocket, dispatch, setUpdateTask, setTask }) => {
    const todo = tasks.filter(element => element.state === "todo")
    const inProgress = tasks.filter(element => element.state === "in progress")
    const done = tasks.filter(element => element.state === "done")
    const array = [todo, inProgress, done]
    const [display, setDisplay] = useState([0, 1, 2])

    const isOpen = (array, key) => {
        if (array.includes(key)) return ""
        else return "closed"
    }

    const closeArray = (array, setArray, key) => {
        if (array.includes(key)) return setArray(array.filter(element => element !== key))
        else return setArray([...array, key])
    }

    const returnTitle = (key) => {
        if (key === 0) return "à traiter"
        else if (key === 1) return "en cours"
        else return "terminée"
    }

    return (
        <>
            <div className="content_nav !my-4">
                <div className={`${addClass(navbar === 1, "active")}`} onClick={() => setNavbar(1)}>Tous</div>
                <div className={`${addClass(navbar === 2, "active")}`} onClick={() => setNavbar(2)}>À traiter</div>
                <div className={`${addClass(navbar === 3, "active")}`} onClick={() => setNavbar(3)}>En cours</div>
                <div className={`${addClass(navbar === 4, "active")}`} onClick={() => setNavbar(4)}>Terminées</div>
            </div>
            {navbar === 1 ? (
                array.map((arr, uniquekey) => {
                    return (
                        <div className={`tasklist-table ${isOpen(display, uniquekey)}`} key={uniquekey}>
                            <div className="tasklist-table-header" onClick={() => closeArray(display, setDisplay, uniquekey)}>
                                <div className="flex">
                                    <p>{returnTitle(uniquekey)} <span>{arr.length}</span></p>
                                </div>
                                <div><IoCaretDownOutline /></div>
                            </div>
                            {arr.length > 0 ? (
                                arr.map((element, key) => {
                                    return (
                                        <div className="tasklist-table-item" key={key}>
                                            <div className="check-input mr-2">
                                                <input id={randomizeCheckboxID(key)} type="checkbox" checked={element.state === "done"} onChange={() => changeState(element, "done", project, user, websocket, dispatch)} />
                                                <label htmlFor={randomizeCheckboxID(key)}><span><svg width="12px" height="9px" viewBox="0 0 12 9"><polyline points="1 5 4 8 11 1"></polyline></svg></span></label>
                                            </div>
                                            <div className="tasklist-table-item-body" onClick={() => clickOn(showTask, setShowTask, element._id)}>
                                                <div className="tasklist-table-item-top">
                                                    <div className="flex items-center">{reduceString(element.title, 60)}</div>
                                                    <div className="tasklist-table-item-tools">
                                                        {element.comments.length > 0 &&
                                                            <div className="flex items-center mr-2"><MdOutlineMessage className="mr-1" /><span>{element.comments.length}</span></div>
                                                        }
                                                        <ToolsMenu>
                                                            <div className="tools_choice" onClick={() => setTask(element)}>Voir</div>
                                                            <div className="tools_choice" onClick={() => { setTask(element); setUpdateTask(true) }}>Modifier</div>
                                                            {(isAdmin || isManager) && <div className="tools_choice" onClick={() => removeTask(element, project, user, websocket, dispatch)}>Supprimer</div>}
                                                        </ToolsMenu>
                                                    </div>
                                                </div>
                                                <div className="tasklist-table-item-bottom">
                                                    <div className={`details ${stateToBackground(element.state)}`}>{stateToString(element.state)}</div>
                                                    <div className={`details mx-2 ${statusToBackground(element.status)}`}>{statusToString(element.status)}</div>
                                                    <div className={`details ${isDatePassed(element.end)}`}>{dateParser(element.end)}</div>
                                                    <div className="tasklist-table-item-members">
                                                        {element.members.length <= 5 && (
                                                            <div className="flex">
                                                                {element.members.map((member, uniquekey) => {
                                                                    return (
                                                                        <div className="tasklist-table-item-member" key={uniquekey}>
                                                                            <div className="pseudo">{member.pseudo.substring(0, 3)}</div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        )}
                                                        {element.members.length > 5 && (
                                                            element.members.slice(0, 5).map((member, uniquekey) => {
                                                                return (
                                                                    <div className="tasklist-table-item-member" key={uniquekey}>
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
                                    <div>Vous n'avez aucunes tâches <span>{returnTitle(uniquekey)}...</span></div>
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
                                <div className="check-input mr-2">
                                    <input id={randomizeCheckboxID(key)} type="checkbox" checked={element.state === "done"} onChange={() => changeState(element, "done", project, user, websocket, dispatch)} />
                                    <label htmlFor={randomizeCheckboxID(key)}><span><svg width="12px" height="9px" viewBox="0 0 12 9"><polyline points="1 5 4 8 11 1"></polyline></svg></span></label>
                                </div>
                                <div className="tasklist-table-item-body" onClick={() => clickOn(showTask, setShowTask, element._id)}>
                                    <div className="tasklist-table-item-top">
                                        <div className="flex items-center">{reduceString(element.title, 60)}</div>
                                        <div className="tasklist-table-item-tools">
                                            {element.comments.length > 0 &&
                                                <div className="flex items-center mr-2"><MdOutlineMessage className="mr-1" /><span>{element.comments.length}</span></div>
                                            }
                                            <ToolsMenu>
                                                <div className="tools_choice" onClick={() => setTask(element)}>Voir</div>
                                                <div className="tools_choice" onClick={() => { setTask(element); setUpdateTask(true) }}>Modifier</div>
                                                {(isAdmin || isManager) && <div className="tools_choice" onClick={() => removeTask(element, project, user, websocket, dispatch)}>Supprimer</div>}
                                            </ToolsMenu>
                                        </div>
                                    </div>
                                    <div className="tasklist-table-item-bottom">
                                        <div className={`details ${stateToBackground(element.state)}`}>{stateToString(element.state)}</div>
                                        <div className={`details mx-2 ${statusToBackground(element.status)}`}>{statusToString(element.status)}</div>
                                        <div className={`details ${isDatePassed(element.end)}`}>{dateParser(element.end)}</div>
                                        <div className="tasklist-table-item-members">
                                            {element.members.length <= 5 && (
                                                <div className="flex">
                                                    {element.members.map((member, uniquekey) => {
                                                        return (
                                                            <div className="tasklist-table-item-member" key={uniquekey}>
                                                                <div className="pseudo">{member.pseudo.substring(0, 3)}</div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                            {element.members.length > 5 && (
                                                element.members.slice(0, 5).map((member, uniquekey) => {
                                                    return (
                                                        <div className="tasklist-table-item-member" key={uniquekey}>
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
                        </div>
                    )
                })
            )}
        </>
    )
}

export default TasksList