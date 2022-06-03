import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeTask } from '../../../../actions/project.action'
import Modal from '../../../tools/global/Modal'
import { ClassicInput, DatePicker, DropdownInput, Textarea } from '../../../tools/global/Inputs'
import { Button } from '../../../tools/global/Button'
import { addMemberToArray, removeMemberFromArray, statusToString, stateToString } from '../../../tools/functions/task'
import { addClass, ISOtoNavFormat } from '../../../Utils'
import { isInResults, isSelected } from '../../../tools/functions/member'
import { MediumAvatar, TinyAvatar } from '../../../tools/global/Avatars'
import { IoClose } from 'react-icons/io5'

const UpdateTask = ({ element, open, setOpen, project, user, websocket }) => {
    const [title, setTitle] = useState(element.title)
    const [description, setDescription] = useState(element.description)
    const [end, setEnd] = useState(ISOtoNavFormat(element.end))
    const [status, setStatus] = useState(element.status)
    const [state, setState] = useState(element.state)
    const [array, setArray] = useState(element.members)
    const [displayStatus, setDisplayStatus] = useState(false)
    const [displayState, setDisplayState] = useState(false)
    const [navbar, setNavbar] = useState(1)
    const dispatch = useDispatch()

    const updateTask = () => {
        const task = {
            _id: element._id,
            title: title,
            description: description,
            state: state,
            status: status,
            creatorId: element.creatorId,
            end: new Date(end).toISOString(),
            members: array,
            creator: element.creator,
            creatorPicture: element.creatorPicture,
            date: element.date
        }
        const activity = { type: "update-task", who: user.pseudo, task: title, date: new Date().toISOString() }
        dispatch(changeTask(project._id, task, activity))
        const members = project.members.filter(member => member.id !== user._id)
        members.map(member => {
            return websocket.current.emit("updateTask", {
                receiverId: member.id,
                task: task
            })
        })
        setOpen(false)
    }

    const [search, setSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isMemberInResult, setMemberInResult] = useState([])
    const isEmpty = !isMemberInResult || isMemberInResult.length === 0
    const regexp = new RegExp(searchQuery, 'i');
    const handleInputChange = e => { setSearchQuery(e.target.value) }
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
        <Modal open={open} setOpen={setOpen} className="update-task-modal">
            <h2>Modifier la tâche</h2>

            <div className="modal_nav">
                <div className={`modal_nav-item ${addClass(navbar === 1, "active")}`} onClick={() => setNavbar(1)}>Description</div>
                <div className={`modal_nav-item ${addClass(navbar === 2, "active")}`} onClick={() => setNavbar(2)}>Membres</div>
            </div>

            {navbar === 1 ? (
                <>
                    <div className="mb-2">Titre de la tâche</div>
                    <ClassicInput type="text" className="full" inputClassName="w-full" placeholder="Titre..." value={title} onChange={e => setTitle(e.target.value)} />

                    <div className="mb-2 mt-4">Description</div>
                    <Textarea type="text" className="w-full" placeholder="Description... " value={description} onChange={e => setDescription(e.target.value)} />

                    <div className="flex items-center mt-4">
                        <div className="mb-2 mt-4 mr-4">Date de fin</div>
                        {/* <ClassicInput type="date" className="mt-2" value={end} onChange={e => setEnd(e.target.value)} /> */}
                        <DatePicker className="top mt-2" placeholder="JJ/MM/AAAA" value={end} selected={end} onSelect={setEnd} />
                    </div>

                    <div className="flex w-full mb-10">
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
                    <div className="user_in_array-container">
                        {array.length > 0 && (
                            array.map((element, key) => {
                                return (
                                    <div className="user_in_array" key={key}>
                                        <TinyAvatar pic={element.picture} />
                                        <p>{element.pseudo}</p>
                                        <IoClose onClick={() => removeMemberFromArray(element, array, setArray)} />
                                    </div>
                                )
                            })
                        )}
                    </div>
                    <ClassicInput placeholder="Rechercher un membre..." className="mb-3 full" value={searchQuery} onInput={handleInputChange} onChange={searchMember} type="search" />
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
            <Button text="Enregistrer" className="mt-5 w-full" disabled={title === "" || title === undefined} onClick={updateTask} />
        </Modal>
    )
}

export default UpdateTask