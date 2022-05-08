import React, { useState } from 'react'
import { stateToBackground, statusToBorder, isDatePassed, stateToString, statusToString, statusToBackground, removeTask, changeState } from '../../../tools/functions/task'
import { dateParser, getDifference } from '../../../Utils'
import { HiPlus } from 'react-icons/hi'
import { DragDropContext } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { MdOutlineMessage } from 'react-icons/md'
import ToolsMenu from '../../../tools/components/ToolsMenu'

const Kanban = ({ project, user, isAdmin, isManager, tasks, websocket, dispatch, setCreateTask, setUpdateTask, setTask, setOpenTask, setState }) => {
    const todo = tasks.filter(element => element.state === "todo")
    const inProgress = tasks.filter(element => element.state === "in progress")
    const done = tasks.filter(element => element.state === "done")
    const array = [todo, inProgress, done]
    const names = ["todo", "in progress", "done"]
    const [dragged, setDragged] = useState(false)
    const [selected, setSelected] = useState(null)
    const [toState, setToState] = useState("")

    const getState = (index) => { if (dragged) setToState(names[index]) }

    const onDragEnd = () => {
        if (selected.state !== toState) {
            changeState(selected, toState, project, user, websocket, dispatch)
            setDragged(false)
        }
    }

    return (
        <>
            <div className="kanban-header">
                {names.map((element, key) => {
                    return (
                        <div className="kanban-header-title" key={key}>
                            <div className="col-title">{stateToString(element)} <span>{array[key].length}</span></div>
                            <HiPlus onClick={() => { setState(element); setCreateTask(true) }} />
                        </div>
                    )
                })}
            </div>
            <div className="kanban">
                <DragDropContext onDragStart={() => setDragged(true)} onDragEnd={onDragEnd}>
                    {array.map((arr, i) => {
                        return (
                            <Droppable droppableId={names[i]} index={i} key={i}>
                                {(provided) => (
                                    <div className="kanban-col" {...provided.droppableProps} ref={provided.innerRef} onMouseEnter={() => getState(i)}>
                                        {arr.map((element, key) => {
                                            return (
                                                <Draggable draggableId={element._id} index={key} key={element._id}>
                                                    {(provided, snapshot) => {
                                                        return (
                                                            <div className={`kanban-ticket ${statusToBorder(element.status)}`}
                                                                onMouseDown={() => setSelected(element)}
                                                                ref={provided.innerRef}
                                                                snapshot={snapshot}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <div className="kanban-ticket-title">
                                                                    <div className="two_lines">{element.title}</div>
                                                                    {element.comments.length > 0 && <div className="flex items-center mr-2"><MdOutlineMessage className="mr-1" />{element.comments.length}</div>}
                                                                    <ToolsMenu>
                                                                        <div className="tools_choice" onClick={() => { setTask(element); setOpenTask(true) }}>Voir</div>
                                                                        <div className="tools_choice">Commenter</div>
                                                                        <div className="tools_choice" onClick={() => { setTask(element); setUpdateTask(true) }}>Modifier</div>
                                                                        <div className="tools_choice" onClick={() => removeTask(element, project, user, websocket, dispatch) }>Supprimer</div>
                                                                    </ToolsMenu>
                                                                </div>
                                                                <div className="kanban-ticket-status">
                                                                    <div className={`details mr-2 ${stateToBackground(element.state)}`}>{stateToString(element.state)}</div>
                                                                    <div className={`details ${statusToBackground(element.status)}`}>{statusToString(element.status)}</div>
                                                                </div>
                                                                <div className="kanban-ticket-description">{element?.description}</div>
                                                                <div className="kanban-ticket-bottom">
                                                                    <div className={`details ${isDatePassed(element.end)}`}>{dateParser(element.end)}</div>
                                                                    {element.members.length > 0 && (
                                                                        <div className="kanban-ticket-members">
                                                                            {element.members.length <= 5 && (
                                                                                <div className="flex">
                                                                                    {element.members.map((member, uniquekey) => {
                                                                                        return (
                                                                                            <div className="kanban-ticket-member" key={uniquekey}>
                                                                                                <div className="pseudo">{member.pseudo.substring(0, 3)}</div>
                                                                                            </div>
                                                                                        )
                                                                                    })}
                                                                                </div>
                                                                            )}
                                                                            {element.members.length > 5 && (
                                                                                element.members.slice(0, 5).map((member, uniquekey) => {
                                                                                    return (
                                                                                        <div className="kanban-ticket-member" key={uniquekey}>
                                                                                            <div className="pseudo">{member.pseudo.substring(0, 3)}</div>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            )}
                                                                            {element.members.length > 5 && (
                                                                                <div className="get_difference">{getDifference(5, element.members.length)}</div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )
                                                    }}
                                                </Draggable>
                                            )
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        )
                    })}
                </DragDropContext>
            </div>
        </>
    )
}

export default Kanban