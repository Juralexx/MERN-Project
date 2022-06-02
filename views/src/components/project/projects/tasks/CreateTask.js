import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addClass } from '../../../Utils'
import { createTask } from '../../../../actions/project.action'
import { isInResults, isSelected } from '../../../tools/functions/member'
import Modal from '../../../tools/components/Modal'
import { ClassicInput, DatePicker, DropdownInput, Textarea } from '../../../tools/components/Inputs'
import { Button } from '../../../tools/components/Button'
import { addMemberToArray, removeMemberFromArray, stateToString, statusToString } from '../../../tools/functions/task'
import { MediumAvatar, TinyAvatar } from '../../../tools/components/Avatars'
import { IoClose } from 'react-icons/io5'

const CreateTask = ({ open, setOpen, project, user, websocket, title, setTitle, description, setDescription, end, setEnd, status, setStatus, state, setState, array, setArray }) => {
    const [displayStatus, setDisplayStatus] = useState(false)
    const [displayState, setDisplayState] = useState(false)
    const [navbar, setNavbar] = useState(1)
    const dispatch = useDispatch()

    const newTask = () => {
        const task = { title: title, description: description, state: state, status: status, creatorId: user._id, creator: user.pseudo, creatorPicture: user.picture, end: end, members: array, date: new Date().toISOString(), comments: [] }
        const activity = { type: "create-task", date: new Date().toISOString(), who: user.pseudo, task: title }
        dispatch(createTask(project._id, task, activity))
        const members = project.members.filter(member => member.id !== user._id)
        members.map(member => {
            return websocket.current.emit("createTask", {
                receiverId: member.id,
                task: task,
                activity: activity
            })
        })
        setOpen(false)
        setTitle("")
        setDescription("")
        setEnd("")
        setArray([])
    }

    const [search, setSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isMemberInResult, setMemberInResult] = useState([])
    const isEmpty = !isMemberInResult || isMemberInResult.length === 0
    const regexp = new RegExp(searchQuery, 'i')
    const searchMember = () => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        if (searchQuery.length >= 2) {
            const response = project.members.filter(member => regexp.test(member.pseudo))
            setMemberInResult(response)
            setSearch(true)
            if (isEmpty) { setSearch(false) }
        } else { setSearch(false) }
    }

    return (
        <Modal open={open} setOpen={setOpen} className="create-task-modal">
            <h2>Créer une nouvelle tâche</h2>

            <div className="modal_nav">
                <div className={`modal_nav-item ${addClass(navbar === 1, "active")}`} onClick={() => setNavbar(1)}>Description</div>
                <div className={`modal_nav-item ${addClass(navbar === 2, "active")}`} onClick={() => setNavbar(2)}>Membres</div>
            </div>

            {navbar === 1 ? (
                <>
                    <div className="mb-2">Titre de la tâche</div>
                    <ClassicInput type="text" className="full" placeholder="Titre..." value={title} onChange={e => setTitle(e.target.value)} />

                    <div className="mb-2 mt-4">Description</div>
                    <Textarea type="text" className="full" placeholder="Description... " value={description} onChange={e => setDescription(e.target.value)} />

                    <div className="flex items-center mt-4">
                        <div className="mb-2 mt-4 mr-4">Date de fin</div>
                        <DatePicker className="top mt-2" placeholder="JJ/MM/AAAA" value={end} selected={end} onSelect={setEnd} />
                    </div>

                    <div className="flex w-full">
                        <div className="w-1/2">
                            <div className="mb-2 mt-4">État</div>
                            <DropdownInput className="w-full" readOnly open={displayStatus} value={statusToString(status)} onClick={() => setDisplayStatus(!displayStatus)}>
                                <div onClick={() => { setStatus("normal"); setDisplayStatus(false) }}>Normal</div>
                                <div onClick={() => { setStatus("important"); setDisplayStatus(false) }}>Important</div>
                                <div onClick={() => { setStatus("priority"); setDisplayStatus(false) }}>Prioritaire</div>
                            </DropdownInput>
                        </div>
                        <div className="w-1/2 ml-2">
                            <div className="mb-2 mt-4">Status</div>
                            <DropdownInput className="w-full" readOnly open={displayState} value={stateToString(state)} onClick={() => setDisplayState(!displayState)}>
                                <div onClick={() => { setState("todo"); setDisplayState(!displayState) }}>À traiter</div>
                                <div onClick={() => { setState("in progress"); setDisplayState(!displayState) }}>En cours</div>
                                <div onClick={() => { setState("done"); setDisplayState(!displayState) }}>Terminée</div>
                            </DropdownInput>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {array.length > 0 && (
                        <div className="user_in_array-container">
                            {array.map((element, key) => {
                                return (
                                    <div className="user_in_array" key={key}>
                                        <TinyAvatar pic={element.picture} />
                                        <p>{element.pseudo}</p>
                                        <IoClose onClick={() => removeMemberFromArray(element, array, setArray)} />
                                    </div>
                                )
                            })}
                        </div>
                    )}
                    <ClassicInput placeholder="Rechercher un membre..." className="full" value={searchQuery} onInput={e => setSearchQuery(e.target.value)} onChange={searchMember} type="search" />
                    <div className="user_selecter">
                        {project.members && (
                            <div className="user_displayer">
                                {project.members.map((element, key) => {
                                    return (
                                        <div className={`user_display_choice ${isInResults(element, isMemberInResult, search, "flex")} ${isSelected(array, element)}`} key={key} onClick={() => addMemberToArray(element, array, setArray)}>
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
            <Button text="Ajouter" className="mt-5 w-full" disabled={title === "" || title === undefined} onClick={newTask} />
        </Modal>
    )
}

export default CreateTask