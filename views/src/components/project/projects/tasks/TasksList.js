import React from 'react'
import { changeState, checkState, checkStatus, isDatePassed, removeTask, stateToString, statusToString } from '../../../tools/functions/task'
import { clickOn } from '../../../tools/functions/useClickOutside'
import { reduceString } from '../../../tools/functions/reduceString'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import SmallMenu from '../../../tools/components/SmallMenu'
import { dateParser } from '../../../Utils'
import { avatar } from '../../../tools/functions/useAvatar'
import { getDifference } from '../../../tools/functions/function'

const TasksList = ({ project, user, isAdmin, isManager, setNavbar, tasks, showTask, setShowTask, websocket, dispatch, openTaskMenu, setOpenTaskMenu, taskMenu, setUpdateTask, setTask }) => {
    return (
        <>
            <div className="relative flex items-center mt-3 mb-2 border-b border-b-slate-300/30">
                <div className="px-3 py-2 cursor-pointer" onClick={() => setNavbar(1)}>Tous</div>
                <div className="px-3 py-2 cursor-pointer" onClick={() => setNavbar(2)}>À traiter</div>
                <div className="px-3 py-2 cursor-pointer" onClick={() => setNavbar(3)}>En cours</div>
                <div className="px-3 py-2 cursor-pointer" onClick={() => setNavbar(4)}>Terminées</div>
            </div>
            {tasks.map((element, key) => {
                return (
                    showTask !== key ? (
                        <div className={`relative flex justify-between items-center py-3 px-3 cursor-pointer hover:bg-background_primary_x_light rounded-lg ${element.state === "done" ? "line-through" : ""}`} key={key}>
                            <div className="flex items-center w-full">
                                <input type="checkbox" checked={element.state === "done"} className="mr-3" onChange={() => changeState(element, project, user, websocket, dispatch)} />
                                <div className="flex justify-between items-center w-full mr-5" onClick={() => clickOn(showTask, setShowTask, key)}>
                                    <div className="flex flex-col">{reduceString(element.title, 40)}
                                    </div>
                                    <div className="text-xs" style={{ background: element.state !== "done" && isDatePassed(element.end) }}>{dateParser(element.end)}</div>
                                </div>
                            </div>
                            {(isAdmin || isManager) && (
                                <div>
                                    <BiDotsVerticalRounded className="h-5 w-5 cursor-pointer" onClick={() => clickOn(openTaskMenu, setOpenTaskMenu, key)} />
                                    {openTaskMenu === key && (
                                        <SmallMenu useRef={taskMenu}>
                                            <div className="py-2 cursor-pointer" onClick={() => { setTask(element); setUpdateTask(true) }}>Modifier</div>
                                            <div className="py-2 cursor-pointer" onClick={() => removeTask(element, project, user, websocket, dispatch)}>Supprimer</div>
                                        </SmallMenu>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col dark:bg-background_primary rounded-lg cursor-pointer" key={key}>
                            <div className="relative flex justify-between items-center px-3 py-3">
                                <div className="flex items-center w-full" onClick={() => clickOn(showTask, setShowTask, key)}>
                                    <input type="checkbox" checked={element.state === "done"} className="mr-3" onChange={() => changeState(element, project, user, websocket, dispatch)} />
                                    <div className="flex justify-between items-center w-full mr-5">
                                        <div className="flex flex-col">{reduceString(element.title, 40)}
                                            <div className="text-xs">Créée par {element.creator} le {dateParser(element.date)}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="text-xs" style={{ background: isDatePassed(element.end) }}>{dateParser(element.end)}</div>
                                            <div className="text-xs mx-2" style={{ background: checkStatus(element.status) }}>{statusToString(element.status)}</div>
                                            <div className="text-xs" style={{ background: checkState(element.state) }}>{stateToString(element.state)}</div>
                                        </div>
                                    </div>
                                </div>
                                {(isAdmin || isManager) && (
                                    <div>
                                        <BiDotsVerticalRounded className="h-5 w-5 cursor-pointer" onClick={() => clickOn(openTaskMenu, setOpenTaskMenu, key)} />
                                        {openTaskMenu === key && (
                                            <SmallMenu useRef={taskMenu}>
                                                <div className="py-2 cursor-pointer" onClick={() => { setTask(element); setUpdateTask(true) }}>Modifier</div>
                                                <div className="py-2 cursor-pointer" onClick={() => removeTask(element, project, user, websocket, dispatch)}>Supprimer</div>
                                            </SmallMenu>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="text-xs py-3 pl-9 pr-3">
                                {element.description}
                            </div>
                            {element.members.length > 0 && (
                                <div className="pl-9 pr-3 pb-3 mt-2 flex">
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
                )
            })}
        </>
    )
}

export default TasksList