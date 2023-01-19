import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import Icon from '../../tools/icons/Icon';
import ToolsMenu from '../../tools/global/ToolsMenu'
import Warning from '../../tools/global/Warning';
import { getDifference, numericDateParser } from '../../Utils'
import { stateToBackground, statusToBorder, isDatePassed, stateToString, statusToString, statusToBackground, updateTaskState, removeTask } from '../../tools/functions/task'

const Kanban = ({ project, user, websocket, names, sortedTasks }) => {
    const [selectedTask, setSelectedTask] = useState({})
    const [toState, setToState] = useState("")

    const [dragged, setDragged] = useState(false)
    const [warning, setWarning] = useState(-1)

    const getState = index => { if (dragged) setToState(names[index]) }

    return (
        <div className="kanban row">
            <DragDropContext
                onDragStart={() => setDragged(true)}
                onDragUpdate={() => updateTaskState(selectedTask, toState, project, user, websocket)}
                onDragEnd={() => setDragged(false)}
            >
                {sortedTasks.map((arr, i) => {
                    return (
                        <Droppable
                            droppableId={names[i]}
                            index={i}
                            key={i}
                        >
                            {(provided) => (
                                <div className={`col-12 col-lg-4 ${dragged && toState === names[i] ? 'highlighted' : 'normal'}`}
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    onMouseEnter={() => getState(i)}
                                >
                                    <div className="kanban-header-title" key={i}>
                                        <div className="col-title">
                                            {stateToString(names[i])} <span>{arr.length}</span>
                                        </div>
                                    </div>
                                    {arr.length > 0 ? (
                                        arr.map((element, key) => {
                                            return (
                                                <Draggable
                                                    draggableId={element._id}
                                                    index={key}
                                                    key={element._id}
                                                >
                                                    {(provided, snapshot) => {
                                                        return (
                                                            <div className={`kanban-ticket ${statusToBorder(element.status)}`}
                                                                onMouseDown={() => setSelectedTask(element)}
                                                                ref={provided.innerRef}
                                                                snapshot={snapshot}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <div className="kanban-ticket-title">
                                                                    <Link className="two_lines" to={`${element._id}`}>
                                                                        {element.title}
                                                                    </Link>
                                                                    {element.comments.length > 0 &&
                                                                        <div className="kanban-ticket-comments">
                                                                            <Icon name="Message" className="mr-1 w-4 h-4" />{element.comments.length}
                                                                        </div>
                                                                    }
                                                                    <ToolsMenu>
                                                                        <Link className="tools_choice" to={`/projects/${project.URLID}/${project.URL}/tasks/${element._id}`}>
                                                                            Voir
                                                                        </Link>
                                                                        <Link className="tools_choice" to={`/projects/${project.URLID}/${project.URL}/tasks/${element._id}/update`}>
                                                                            Modifier
                                                                        </Link>
                                                                        <div className="tools_choice" onClick={() => setWarning('' + i + key)}>
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
                                                                        {numericDateParser(element.end)}
                                                                    </div>
                                                                    {element.members.length > 0 && (
                                                                        <div className="kanban-ticket-members">
                                                                            <div className="flex">
                                                                                {element.members.slice(0, 3).map((member, uniquekey) => {
                                                                                    return (
                                                                                        <div className="kanban-ticket-member" key={uniquekey}>
                                                                                            <div className="pseudo">
                                                                                                {member.pseudo.substring(0, 3)}
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                                {element.members.length > 3 &&
                                                                                    <div className="get_difference">
                                                                                        {getDifference(3, element.members.length)}
                                                                                    </div>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {Object.keys(selectedTask).length > 0 &&
                                                                    <Warning
                                                                        title={`Supprimer la tâche suivante : ${selectedTask.title} ?`}
                                                                        text="Cette action est irréversible."
                                                                        validateBtn="Supprimer"
                                                                        className="delete"
                                                                        open={warning === '' + i + key}
                                                                        setOpen={setWarning}
                                                                        onValidate={() => removeTask(selectedTask, project, user, websocket)}
                                                                    />
                                                                }
                                                            </div>
                                                        )
                                                    }}
                                                </Draggable>
                                            )
                                        })
                                    ) : (
                                        <div className="empty-content">
                                            <Icon name="Clipboard" className="w-9 h-9 mb-2" />
                                            <div>Vous n'avez aucunes tâches <span>{stateToString(names[i])}.</span></div>
                                        </div>
                                    )}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    )
                })}
            </DragDropContext>
            <Outlet />
        </div>
    )
}

export default Kanban