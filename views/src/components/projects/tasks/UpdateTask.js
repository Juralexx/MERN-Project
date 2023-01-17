import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeTask } from '../../../reducers/project.action'
import Icon from '../../tools/icons/Icon'
import Modal from '../../tools/global/Modal'
import { MediumAvatar, TinyAvatar } from '../../tools/global/Avatars'
import { ClassicInput, DatePickerInput, DropdownInput, Textarea } from '../../tools/global/Inputs'
import { Button } from '../../tools/global/Button'
import { addMemberToArray, removeMemberFromArray, statusToString, stateToString } from '../../tools/functions/task'
import { addClass, ISOtoNavigatorFormat, removeAccents } from '../../Utils'
import { isUserInSearchResults, isSelected } from '../../tools/functions/member'

const UpdateTask = ({ task, open, setOpen, project, user, websocket }) => {
    const [updatedTask, setUpdatedTask] = useState({
        title: task.title,
        description: task.description,
        end: task.end,
        status: task.status,
        state: task.state,
        members: task.members,
        comments: task.comments
    })
    const [end, setEnd] = useState(ISOtoNavigatorFormat(task.end))
    const [navbar, setNavbar] = useState(1)
    const dispatch = useDispatch()

    const updateTask = () => {
        const taskUpdated = {
            _id: task._id,
            title: updatedTask.title,
            description: updatedTask.description,
            state: updatedTask.state,
            status: updatedTask.status,
            end: new Date(end).toISOString(),
            members: updatedTask.members,
            creatorId: task.creatorId,
            creator: task.creator,
            creatorPicture: task.creatorPicture,
            date: task.date,
            comments: task.comments
        }
        const activity = {
            type: "update-task",
            who: user.pseudo,
            task: updatedTask.title,
            date: new Date().toISOString()
        }
        dispatch(changeTask(project._id, taskUpdated, activity))
        //const members = project.members.filter(member => member._id !== user._id)
        project.members.map(member => {
            return websocket.current.emit("updateTask", {
                receiverId: member._id,
                task: taskUpdated
            })
        })
        setOpen(false)
    }

    const [search, setSearch] = useState({
        state: false,
        query: "",
        results: []
    })
    const regexp = new RegExp(search.query, 'i')

    const searchMember = () => {
        if (!search.query || search.query.trim() === "") return
        if (search.query.length >= 2) {
            const response = project.members.filter(member => regexp.test(removeAccents(member.pseudo)))
            setSearch(data => ({ ...data, state: true, results: response }))
            if (!search.results || search.results.length === 0)
                setSearch(data => ({ ...data, state: false }))
        } else setSearch(data => ({ ...data, state: false }))
    }

    return (
        <Modal open={open} setOpen={setOpen} className="update-task-modal">
            <h2>Modifier la tâche</h2>
            <div className="modal_nav">
                <div
                    className={`modal_nav-item ${addClass(navbar === 1, "active")}`}
                    onClick={() => setNavbar(1)}
                >
                    Description
                </div>
                <div
                    className={`modal_nav-item ${addClass(navbar === 2, "active")}`}
                    onClick={() => setNavbar(2)}
                >
                    Membres
                </div>
            </div>

            {navbar === 1 ? (
                <>
                    <div className="mb-2 mt-4">Titre de la tâche</div>
                    <ClassicInput
                        type="text"
                        className="full"
                        inputClassName="w-full"
                        placeholder="Titre..."
                        value={updatedTask.title}
                        onChange={e => setUpdatedTask(prevState => ({ ...prevState, title: e.target.value }))}
                    />

                    <div className="mb-2 mt-4">Description</div>
                    <Textarea
                        type="text"
                        className="w-full"
                        placeholder="Description... "
                        value={updatedTask.description}
                        onChange={e => setUpdatedTask(prevState => ({ ...prevState, description: e.target.value }))}
                    />

                    <div className="flex items-center mt-4">
                        <div className="mb-2 mt-4 mr-4">Date de fin</div>
                        <DatePickerInput
                            className="top mt-2 full"
                            placeholder="JJ/MM/AAAA"
                            value={end}
                            selected={end}
                            onSelect={setEnd}
                        />
                    </div>

                    <div className="flex w-full mb-10">
                        <div className="w-1/2">
                            <div className="mb-2 mt-4">État</div>
                            <DropdownInput
                                className="w-full"
                                readOnly
                                value={statusToString(updatedTask.status)}
                            >
                                <div onClick={() => setUpdatedTask(prevState => ({ ...prevState, status: "normal" }))}>
                                    Normal
                                </div>
                                <div onClick={() => setUpdatedTask(prevState => ({ ...prevState, status: "important" }))}>
                                    Important
                                </div>
                                <div onClick={() => setUpdatedTask(prevState => ({ ...prevState, status: "priority" }))}>
                                    Prioritaire
                                </div>
                            </DropdownInput>
                        </div>
                        <div className="w-1/2 ml-2">
                            <div className="mb-2 mt-4">Status</div>
                            <DropdownInput
                                className="w-full"
                                readOnly
                                value={stateToString(updatedTask.state)}
                            >
                                <div onClick={() => setUpdatedTask(prevState => ({ ...prevState, state: "todo" }))}>
                                    À traiter
                                </div>
                                <div onClick={() => setUpdatedTask(prevState => ({ ...prevState, state: "in progress" }))}>
                                    En cours
                                </div>
                                <div onClick={() => setUpdatedTask(prevState => ({ ...prevState, state: "done" }))}>
                                    Terminée
                                </div>
                            </DropdownInput>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="user_in_array-container">
                        {updatedTask.members.length > 0 && (
                            updatedTask.members.map((element, key) => {
                                return (
                                    <div className="user_in_array" key={key}>
                                        <TinyAvatar pic={element.picture} />
                                        <p>{element.pseudo}</p>
                                        <Icon name="Cross" onClick={() =>
                                            setUpdatedTask(prevState => ({ ...prevState, members: removeMemberFromArray(element, updatedTask.members) }))
                                        } />
                                    </div>
                                )
                            })
                        )}
                    </div>
                    <ClassicInput
                        type="search"
                        placeholder="Rechercher un membre..."
                        className="mb-3 full"
                        value={search.query}
                        onInput={e => setSearch(data => ({ ...data, query: e.target.value }))}
                        onChange={searchMember}
                    />
                    <div className="user_selecter">
                        {project.members && (
                            <div className="user_displayer">
                                {project.members.map((element, key) => {
                                    return (
                                        <div className={`user_display_choice ${isUserInSearchResults(element, search.results, search.state, "flex")} ${isSelected(updatedTask.members, element)}`}
                                            key={key}
                                            onClick={() =>
                                                setUpdatedTask(prevState => ({ ...prevState, members: addMemberToArray(element, updatedTask.members) }))
                                            }
                                        >
                                            <MediumAvatar pic={element.picture} />
                                            <p>{element.pseudo}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </>
            )}
            <Button
                className="mt-5 w-full"
                disabled={updatedTask.title === "" || updatedTask.title === undefined}
                onClick={updateTask}
            >
                Enregistrer
            </Button>
        </Modal>
    )
}

export default UpdateTask