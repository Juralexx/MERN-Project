import React, { useState } from 'react'
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import Icon from '../../tools/icons/Icon';
import ToolsMenu from '../../tools/global/ToolsMenu'
import { dateParser, getDifference } from '../../Utils'
import { stateToBackground, statusToBorder, isDatePassed, stateToString, statusToString, statusToBackground, removeTask, updateState } from '../../tools/functions/task'

const Kanban = ({ project, user, tasks, websocket, dispatch, setUpdateTask, setTask, setOpenTask }) => {
    const names = ["todo", "in progress", "done"]
    const sortedTasks = [
        tasks.filter(element => element.state === "todo"),
        tasks.filter(element => element.state === "in progress"),
        tasks.filter(element => element.state === "done")
    ]
    const [dragged, setDragged] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)
    const [toState, setToState] = useState("")

    const getState = index => {
        if (dragged) setToState(names[index])
    }

    const onDragEnd = () => {
        if (selectedTask.state !== toState) {
            updateState(selectedTask, toState, project, user, websocket, dispatch)
            setDragged(false)
        }
    }

    return (
        <div className="kanban row">
            <DragDropContext
                onDragStart={() => setDragged(true)}
                onDragEnd={onDragEnd}
            >
                {sortedTasks.map((arr, i) => {
                    return (
                        <Droppable
                            droppableId={names[i]}
                            index={i}
                            key={i}
                        >
                            {(provided) => (
                                <div
                                    className="col-12 col-md-4"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    onMouseEnter={() => getState(i)}
                                >
                                    <div className="kanban-header-title" key={i}>
                                        <div className="col-title">
                                            {stateToString(names[i])} <span>{arr.length}</span>
                                        </div>
                                    </div>
                                    {arr.map((element, key) => {
                                        return (
                                            <Draggable
                                                draggableId={element._id}
                                                index={key}
                                                key={element._id}
                                            >
                                                {(provided, snapshot) => {
                                                    return (
                                                        <div
                                                            className={`kanban-ticket ${statusToBorder(element.status)}`}
                                                            onMouseDown={() => setSelectedTask(element)}
                                                            ref={provided.innerRef}
                                                            snapshot={snapshot}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <div className="kanban-ticket-title">
                                                                <div className="two_lines">
                                                                    {element.title}
                                                                </div>
                                                                {element.comments.length > 0 &&
                                                                    <div className="flex items-center mr-2">
                                                                        <Icon name="Chat" className="mr-1" />{element.comments.length}
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
                                                            <div className="kanban-ticket-status">
                                                                <div className={`details mr-2 ${stateToBackground(element.state)}`}>
                                                                    {stateToString(element.state)}
                                                                </div>
                                                                <div className={`details ${statusToBackground(element.status)}`}>
                                                                    {statusToString(element.status)}
                                                                </div>
                                                            </div>
                                                            <div className="kanban-ticket-description">
                                                                {element.description ? element.description : <em>Aucune description</em>}
                                                            </div>
                                                            <div className="kanban-ticket-bottom">
                                                                <div className={`details ${isDatePassed(element.end)}`}>
                                                                    {dateParser(element.end)}
                                                                </div>
                                                                {element.members.length > 0 && (
                                                                    <div className="kanban-ticket-members">
                                                                        {element.members.length <= 5 && (
                                                                            <div className="flex">
                                                                                {element.members.map((member, uniquekey) => {
                                                                                    return (
                                                                                        <div className="kanban-ticket-member" key={uniquekey}>
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
                                                                                    <div className="kanban-ticket-member" key={uniquekey}>
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
    )
}

export default Kanban