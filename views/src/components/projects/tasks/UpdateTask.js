import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Icon from '../../tools/icons/Icon'
import Modal from '../../tools/global/Modal'
import { MediumAvatar, TinyAvatar } from '../../tools/global/Avatars'
import { ClassicInput, DatePickerInput, DropdownInput, Textarea } from '../../tools/global/Inputs'
import { Button, TextButton } from '../../tools/global/Button'
import { addMemberToArray, removeMemberFromArray, statusToString, stateToString } from '../../tools/functions/task'
import { addClass, goBack, removeAccents } from '../../Utils'
import { isUserInSearchResults, isSelected } from '../../tools/functions/member'

const UpdateTask = ({ task, project, user, websocket }) => {
    const navigate = useNavigate()
    const [navbar, setNavbar] = useState(1)

    const [updatedTask, setUpdatedTask] = useState({
        _id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        state: task.state,
        end: task.end,
        members: task.members,
        date: task.date,
        comments: task.comments,
        poster: {
            _id: task.poster._id,
            pseudo: task.poster.pseudo,
            picture: task.poster.picture,
        }
    })

    /**
     * 
     */

    const updateTask = async () => {
        const activity = {
            type: "update-task",
            who: user.pseudo,
            task: updatedTask.title,
            date: new Date().toISOString()
        }
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/${project._id}/tasks/${task._id}/update/`,
            data: {
                task: updatedTask,
                activity: activity
            }
        })
            .then(async () => {
                await project.members.map(member => {
                    return websocket.current.emit("updateTask", {
                        receiverId: member._id,
                        task: updatedTask,
                        activity: activity
                    })
                })
                navigate(`/projects/${project.URLID}/${project.URL}/tasks`)
            })
            .catch(err => console.log(err))
    }

    /**
     * 
     */

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

    /**
     * 
     */

    const onClose = () => {
        let location = window.location.pathname
        if (location.includes('/tasks/list'))
            navigate(`/projects/${project.URLID}/${project.URL}/tasks/list`)
        else if (location.includes('/tasks'))
            navigate(`/projects/${project.URLID}/${project.URL}/tasks`)
        else
            navigate(`/projects/${project.URLID}/${project.URL}/`)
    }

    /**
     * 
     */

    return (
        <Modal open={true} onClose={() => onClose()} className="update-task-modal">
            <h2>Modifier la tâche</h2>
            <div className="modal_nav">
                <div className={`modal_nav-item ${addClass(navbar === 1, "active")}`}
                    onClick={() => setNavbar(1)}
                >
                    Description
                </div>
                <div className={`modal_nav-item ${addClass(navbar === 2, "active")}`}
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
                            value={updatedTask.end}
                            selected={updatedTask.end}
                            onSelect={date => setUpdatedTask(prevState => ({ ...prevState, end: new Date(date).toISOString() }))}
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
            <div className='btn-container'>
                <TextButton onClick={() => goBack()}>
                    Annuler
                </TextButton>
                <Button className="sm:ml-2"
                    disabled={updatedTask.title === "" || updatedTask.title === undefined}
                    onClick={updateTask}
                >
                    Enregistrer
                </Button>
            </div>
        </Modal>
    )
}

export default UpdateTask