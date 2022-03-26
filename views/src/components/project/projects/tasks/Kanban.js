import React, { useState, useRef } from 'react'
import { getDifference } from '../../../tools/functions/function'
import { stateToBackground, statusToBorder, isDatePassed, stateToString, statusToString, statusToBackground, removeTask } from '../../../tools/functions/task'
import { dateParser } from '../../../Utils'
import { HiPlus } from 'react-icons/hi'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { ToolsBtn } from '../../../tools/components/Button'
import { clickOn } from '../../../tools/functions/useClickOutside'
import SmallMenu from '../../../tools/components/SmallMenu'
import { SmallAvatar } from '../../../tools/components/Avatars'

const Kanban = ({ project, user, isAdmin, isManager, setNavbar, tasks, showTask, setShowTask, websocket, dispatch, openTaskMenu, setOpenTaskMenu, taskMenu, setCreateTask, setUpdateTask, setTask, layout, setState }) => {
    const [openMenu, setOpenMenu] = useState(-1)
    const ticketMenu = useRef()
    const todo = tasks.filter(element => element.state === "todo")
    const inProgress = tasks.filter(element => element.state === "in progress")
    const done = tasks.filter(element => element.state === "done")
    const array = [todo, inProgress, done]

    return (
        <>
            <div className="dashboard-kanban-header">
                <div className="dashboard-kanban-header-title">
                    <div className="title">À Traiter <span>{todo.length}</span></div>
                    <HiPlus onClick={() => { setState("todo"); setCreateTask(true) }} />
                </div>
                <div className="dashboard-kanban-header-title">
                    <div className="title">En cours <span>{inProgress.length}</span></div>
                    <HiPlus onClick={() => { setState("in progress"); setCreateTask(true) }} />
                </div>
                <div className="dashboard-kanban-header-title">
                    <div className="title">Terminée <span>{done.length}</span></div>
                    <HiPlus onClick={() => { setState("done"); setCreateTask(true) }} />
                </div>
            </div>
            <div className="dashboard-kanban">
                {array.map((arr, i) => {
                    return (
                        <div className="dashboard-kanban-col" key={i}>
                            {arr.map((element, key) => {
                                return (
                                    <div className={`dashboard-kanban-ticket ${statusToBorder(element.status)}`} key={element._id}>
                                        <div className="dashboard-kanban-ticket-title" ref={ticketMenu}>
                                            <div className="two-lines">{element.title}</div>
                                            <ToolsBtn onClick={() => clickOn(openMenu, setOpenMenu, element._id)}><BiDotsHorizontalRounded /></ToolsBtn>
                                            {openMenu === element._id &&
                                                <SmallMenu>
                                                    <div className="tools-choice">Voir</div>
                                                    <div className="tools-choice" onClick={() => { setTask(element); setUpdateTask(true) }}>Modifier</div>
                                                    <div className="tools-choice" onClick={() => removeTask(element, project, user, websocket, dispatch)}>Supprimer</div>
                                                    <div className="tools-choice">Archiver</div>
                                                </SmallMenu>
                                            }
                                        </div>
                                        <div className="dashboard-kanban-ticket-status">
                                            <div className={`details mr-2 ${stateToBackground(element.state)}`}>{stateToString(element.state)}</div>
                                            <div className={`details ${statusToBackground(element.status)}`}>{statusToString(element.status)}</div>
                                        </div>
                                        <div className="dashboard-kanban-ticket-description">{element?.description}</div>
                                        <div className="dashboard-kanban-ticket-bottom">
                                            <div className={`details ${isDatePassed(element.end)}`}>{dateParser(element.end)}</div>
                                            {element.members.length > 0 && (
                                                <div className="dashboard-kanban-ticket-members">
                                                    {element.members.length <= 2 && (
                                                        <div className="flex">
                                                            {element.members.map((member, uniquekey) => {
                                                                return (
                                                                    <div className="dashboard-kanban-ticket-member" key={uniquekey}>
                                                                        <SmallAvatar pic={member.picture} />
                                                                        <div className="pseudo">{member.pseudo}</div>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    )}
                                                    {element.members.length > 2 && element.members.length < 5 && (
                                                        element.members.map((member, uniquekey) => {
                                                            return <SmallAvatar pic={member.picture} key={uniquekey} />
                                                        })
                                                    )}
                                                    {element.members.length >= 5 && (
                                                        element.members.slice(0, 5).map((member, uniquekey) => {
                                                            return <SmallAvatar pic={member.picture} key={uniquekey} />
                                                        })
                                                    )}
                                                    {element.members.length >= 5 && (
                                                        <div className="get-difference">{getDifference(5, element.members.length)}</div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Kanban