import React, { useState } from 'react'
import { changeState, stateToBackground, isDatePassed, removeTask, stateToString, statusToString, statusToBackground, randomizeCheckboxID } from '../../../tools/functions/task'
import { clickOn } from '../../../tools/functions/useClickOutside'
import { reduceString } from '../../../tools/functions/reduceString'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import SmallMenu from '../../../tools/components/SmallMenu'
import { dateParser } from '../../../Utils'
import { IoCaretDownOutline } from 'react-icons/io5'
import { RiCalendarTodoLine } from 'react-icons/ri'

const TasksList = ({ project, user, isAdmin, isManager, navbar, setNavbar, tasks, setOpenTask, showTask, setShowTask, websocket, dispatch, openTaskMenu, setOpenTaskMenu, taskMenu, setUpdateTask, setTask }) => {
    const addActive = (state, classe) => { if (state) { return classe } else { return "" } }
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
            <div className="tasklist-nav">
                <div className={`tasklist-nav-item ${addActive(navbar === 1, "active")}`} onClick={() => setNavbar(1)}>Tous</div>
                <div className={`tasklist-nav-item ${addActive(navbar === 2, "active")}`} onClick={() => setNavbar(2)}>À traiter</div>
                <div className={`tasklist-nav-item ${addActive(navbar === 3, "active")}`} onClick={() => setNavbar(3)}>En cours</div>
                <div className={`tasklist-nav-item ${addActive(navbar === 4, "active")}`} onClick={() => setNavbar(4)}>Terminées</div>
            </div>
            {navbar === 1 ? (
                array.map((arr, uniquekey) => {
                    return (
                        <div className={`tasklist-table ${isOpen(display, uniquekey)}`} key={uniquekey}>
                            <div className="tasklist-table-header" onClick={() => closeArray(display, setDisplay, uniquekey)}>
                                <div className="flex">
                                    <p>{returnTitle(uniquekey)}</p>
                                    <span>{arr.length}</span>
                                </div>
                                <div><IoCaretDownOutline /></div>
                            </div>
                            {arr.length > 0 ? (
                                arr.map((element, key) => {
                                    return (
                                        <div className="tasklist-table-item" key={key}>
                                            <div className="tasklist-table-item-left">
                                                <div className="check-input mr-2">
                                                    <input id={randomizeCheckboxID(key)} type="checkbox" checked={element.state === "done"} onChange={() => changeState(element, "done", project, user, websocket, dispatch)} />
                                                    <label htmlFor={randomizeCheckboxID(key)}>
                                                        <span><svg width="12px" height="9px" viewBox="0 0 12 9"><polyline points="1 5 4 8 11 1"></polyline></svg></span>
                                                    </label>
                                                </div>
                                                <div className="flex justify-between items-center w-full mr-5" onClick={() => clickOn(showTask, setShowTask, element._id)}>
                                                    <div className="flex flex-col">{reduceString(element.title, 60)}</div>
                                                    <div className="flex">
                                                        <div className={`details ${stateToBackground(element.state)}`}>{stateToString(element.state)}</div>
                                                        <div className={`details mx-2 ${statusToBackground(element.status)}`}>{statusToString(element.status)}</div>
                                                        <div className={`details ${isDatePassed(element.end)}`}>{dateParser(element.end)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {(isAdmin || isManager) && (
                                                <div>
                                                    <BiDotsVerticalRounded className="h-5 w-5 cursor-pointer" onClick={() => clickOn(openTaskMenu, setOpenTaskMenu, element._id)} />
                                                    {openTaskMenu === element._id && (
                                                        <SmallMenu useRef={taskMenu}>
                                                            <div className="tools-choice" onClick={() => { setTask(element); setOpenTask(true) }}>Voir</div>
                                                            <div className="tools-choice" onClick={() => { setTask(element); setUpdateTask(true); setOpenTaskMenu(false) }}>Modifier</div>
                                                            <div className="tools-choice" onClick={() => removeTask(element, project, user, websocket, dispatch)}>Supprimer</div>
                                                        </SmallMenu>
                                                    )}
                                                </div>
                                            )}
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
                            <div className="tasklist-table-item">
                                <div className="tasklist-table-item-left">
                                    <div className="check-input mr-2">
                                        <input id={randomizeCheckboxID(key)} type="checkbox" checked={element.state === "done"} onChange={() => changeState(element, "done", project, user, websocket, dispatch)} />
                                        <label htmlFor={randomizeCheckboxID(key)}>
                                            <span>
                                                <svg width="12px" height="9px" viewBox="0 0 12 9">
                                                    <polyline points="1 5 4 8 11 1"></polyline>
                                                </svg>
                                            </span>
                                        </label>
                                    </div>
                                    <div className="flex justify-between items-center w-full mr-5" onClick={() => clickOn(showTask, setShowTask, key)}>
                                        <div className="flex flex-col">{reduceString(element.title, 60)}</div>
                                        <div className="flex">
                                            <div className={`details ${stateToBackground(element.state)}`}>{stateToString(element.state)}</div>
                                            <div className={`details mx-2 ${statusToBackground(element.status)}`}>{statusToString(element.status)}</div>
                                            <div className={`details ${isDatePassed(element.end)}`}>{dateParser(element.end)}</div>
                                        </div>
                                    </div>
                                </div>
                                {(isAdmin || isManager) && (
                                    <div>
                                        <BiDotsVerticalRounded className="h-5 w-5 cursor-pointer" onClick={() => clickOn(openTaskMenu, setOpenTaskMenu, key)} />
                                        {openTaskMenu === key && (
                                            <SmallMenu useRef={taskMenu}>
                                                <div className="tools-choice" onClick={() => { setTask(element); setUpdateTask(true) }}>Modifier</div>
                                                <div className="tools-choice" onClick={() => removeTask(element, project, user, websocket, dispatch)}>Supprimer</div>
                                            </SmallMenu>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })
            )}
        </>
    )
}

export default TasksList