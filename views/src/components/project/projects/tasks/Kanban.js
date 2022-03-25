import React from 'react'
import { getDifference } from '../../../tools/functions/function'
import { checkState, checkStatus, isDatePassed, stateToString, statusToString } from '../../../tools/functions/task'
import { avatar } from '../../../tools/functions/useAvatar'
import { dateParser } from '../../../Utils'

const Kanban = ({ project, user, isAdmin, isManager, setNavbar, tasks, showTask, setShowTask, websocket, dispatch, openTaskMenu, setOpenTaskMenu, taskMenu, setUpdateTask, setTask, layout }) => {
    const todo = tasks.filter(element => element.state === "todo")
    const inProgress = tasks.filter(element => element.state === "in progress")
    const done = tasks.filter(element => element.state === "done")
    const array = [todo, inProgress, done]

    return (
        <>
            <div className="dashboard-kanban-header">
                <div className="dashboard-kanban-header-title"><p>À Traiter</p></div>
                <div className="dashboard-kanban-header-title"><p>En cours</p></div>
                <div className="dashboard-kanban-header-title"><p>Terminée</p></div>
            </div>
            <div className="flex w-full py-2">
                {array.map((arr, i) => {
                    return (
                        <div className="w-1/3 px-2" key={i}>
                            {arr.map((element, key) => {
                                return (
                                    <div className="relative p-3 bg-background_primary_x_light my-3 rounded-lg" key={key} style={{ borderLeft: "3px solid", borderLeftColor: checkStatus(element.status) }}>
                                        <div className="mb-2">{element.title}</div>
                                        <div className="flex py-2">
                                            <div className="text-xs" style={{ background: isDatePassed(element.end) }}>{dateParser(element.end)}</div>
                                            <div className="text-xs mx-2" style={{ background: checkStatus(element.status) }}>{statusToString(element.status)}</div>
                                            <div className="text-xs" style={{ background: checkState(element.state) }}>{stateToString(element.state)}</div>
                                        </div>
                                        <div className=" py-2">
                                            {element.description}
                                        </div>
                                        {element.members.length > 0 && (
                                            <div className="mt-2 flex">
                                                {element.members.length === 1 && (
                                                    <div className="flex">
                                                        <div className="task-avatar" style={avatar(element.members[0].picture)}></div>
                                                        <div className="text-xs flex items-center ml-2">{element.members[0].pseudo}</div>
                                                    </div>
                                                )}
                                                {element.members.length > 1 && element.members.length < 5 && (
                                                    element.members.map((member, uniquekey) => {
                                                        return <div className="task-avatar" style={avatar(member.picture)} key={uniquekey}></div>
                                                    })
                                                )}
                                                {element.members.length >= 5 && (
                                                    element.members.slice(0, 5).map((member, uniquekey) => {
                                                        return <div className="task-avatar" style={avatar(member.picture)} key={uniquekey}></div>
                                                    })
                                                )}
                                                {element.members.length >= 5 && (
                                                    <div className="relative dark:bg-background_primary_light rounded-full flex items-center justify-center w-[30px] h-[30px] left-[-10px] text-xs p-1">{getDifference(5, element.members.length)}</div>
                                                )}
                                            </div>
                                        )}
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