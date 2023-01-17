import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Modal from '../../tools/global/Modal'
import { MediumAvatar, TinyAvatar } from '../../tools/global/Avatars'
import { ClassicInput, DatePickerInput, DropdownInput, Textarea } from '../../tools/global/Inputs'
import { Button } from '../../tools/global/Button'
import Icon from '../../tools/icons/Icon'
import { addClass, removeAccents } from '../../Utils'
import { createTask } from '../../../reducers/project.action'
import { isUserInSearchResults, isSelected } from '../../tools/functions/member'
import { addMemberToArray, removeMemberFromArray, stateToString, statusToString } from '../../tools/functions/task'

const CreateTask = ({ open, setOpen, project, user, websocket, }) => {
    const [navbar, setNavbar] = useState(1)
    const dispatch = useDispatch()

    const [end, setEnd] = useState("")
    const [datas, setDatas] = useState({
        title: "",
        description: "",
        end: end,
        state: "todo",
        status: "normal",
        members: []
    })

    const newTask = () => {
        const task = {
            title: datas.title,
            description: datas.description,
            state: datas.state,
            status: datas.status,
            creatorId: user._id,
            creator: user.pseudo,
            creatorPicture: user.picture,
            end: datas.end,
            members: datas.members,
            date: new Date().toISOString(),
            comments: []
        }
        const activity = {
            type: "create-task",
            date: new Date().toISOString(),
            who: user.pseudo,
            task: datas.title
        }
        dispatch(createTask(project._id, task, activity))
        const members = project.members.filter(member => member._id !== user._id)
        members.map(member => {
            return websocket.current.emit("createTask", {
                receiverId: member._id,
                task: task,
                activity: activity
            })
        })
        setOpen(false)
        setEnd('')
        setDatas(datas => ({
            ...datas,
            title: "",
            description: "",
            end: "",
            members: []
        }))
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
        <Modal open={open} setOpen={setOpen} className="create-task-modal">
            <h2>Créer une nouvelle tâche</h2>
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
                        placeholder="Titre..."
                        value={datas.title}
                        onChange={e => setDatas(data => ({ ...data, title: e.target.value }))}
                    />

                    <div className="mb-2 mt-4">Description</div>
                    <Textarea
                        type="text"
                        className="w-full"
                        placeholder="Description... "
                        value={datas.description}
                        onChange={e => setDatas(data => ({ ...data, description: e.target.value }))}
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

                    <div className="flex w-full">
                        <div className="w-1/2">
                            <div className="mb-2 mt-4">État</div>
                            <DropdownInput
                                className="w-full"
                                readOnly
                                value={statusToString(datas.status)}
                            >
                                <div onClick={() => setDatas(data => ({ ...data, status: "normal" }))}>
                                    Normal
                                </div>
                                <div onClick={() => setDatas(data => ({ ...data, status: "important" }))}>
                                    Important
                                </div>
                                <div onClick={() => setDatas(data => ({ ...data, status: "priority" }))}>
                                    Prioritaire
                                </div>
                            </DropdownInput>
                        </div>
                        <div className="w-1/2 ml-2">
                            <div className="mb-2 mt-4">Status</div>
                            <DropdownInput
                                className="w-full"
                                readOnly
                                value={stateToString(datas.state)}
                            >
                                <div onClick={() => setDatas(data => ({ ...data, state: "todo" }))}>
                                    À traiter
                                </div>
                                <div onClick={() => setDatas(data => ({ ...data, state: "in progress" }))}>
                                    En cours
                                </div>
                                <div onClick={() => setDatas(data => ({ ...data, state: "done" }))}>
                                    Terminée
                                </div>
                            </DropdownInput>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {datas.members.length > 0 && (
                        <div className="user_in_array-container">
                            {datas.members.map((element, key) => {
                                return (
                                    <div className="user_in_array" key={key}>
                                        <TinyAvatar pic={element.picture} />
                                        <p>{element.pseudo}</p>
                                        <Icon name="Cross" onClick={() => setDatas(data => ({ ...data, members: removeMemberFromArray(element, datas.members) }))} />
                                    </div>
                                )
                            })}
                        </div>
                    )}
                    <ClassicInput
                        type="search"
                        placeholder="Rechercher un membre..."
                        className="full"
                        value={search.query}
                        onInput={e => setSearch(data => ({ ...data, query: e.target.value }))}
                        onChange={searchMember}
                    />
                    <div className="user_selecter">
                        {project.members && (
                            <div className="user_displayer">
                                {project.members.map((element, key) => {
                                    return (
                                        <div
                                            key={key}
                                            className={`user_display_choice ${isUserInSearchResults(element, search.results, search.state, "flex")} ${isSelected(datas.members, element)}`}
                                            onClick={() => setDatas(data => ({ ...data, members: addMemberToArray(element, datas.members) }))}
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
                disabled={datas.title === "" || datas.title === undefined}
                onClick={newTask}
            >
                Ajouter
            </Button>
        </Modal>
    )
}

export default CreateTask