import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeTask } from '../../../../actions/project.action'
import Modal from '../../../tools/components/Modal'
import { ClassicInput, DropdownInput, Textarea } from '../../../tools/components/Inputs'
import { Button } from '../../../tools/components/Button'
import { addMemberToArray, removeMemberFromArray, statusToString, stateToString } from '../../../tools/functions/task'
import { highlightIt } from '../../../tools/functions/function'
import { ISOtoNavFormat } from '../../../Utils'
import { MediumAvatar, TinyAvatar } from '../../../tools/components/Avatars'
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
    const addActive = (state, classe) => { if (state) { return classe } else { return "" } }
    const dispatch = useDispatch()

    const updateTask = () => {
        const task = { _id: element._id, title: title, description: description, state: state, status: status, creatorId: element.creatorId, end: end, members: array, creator: element.creator, creatorPicture: element.creatorPicture, date: element.date }
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
    const handleInputChange = (e) => { setSearchQuery(e.target.value) }
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
        <Modal open={open} setOpen={setOpen} css="w-[500px]">
            <h2>Créer une nouvelle tâche</h2>

            <div className="modal-nav">
                <div className={`modal-nav-item ${addActive(navbar === 1, "active")}`} onClick={() => setNavbar(1)}>Description</div>
                <div className={`modal-nav-item ${addActive(navbar === 2, "active")}`} onClick={() => setNavbar(2)}>Membres</div>
            </div>

            {navbar === 1 ? (
                <>
                    <div className="mb-2">Titre de la tâche</div>
                    <ClassicInput type="text" className="w-full" placeholder="Titre..." value={title} onChange={(e) => setTitle(e.target.value)} />

                    <div className="mb-2 mt-4">Description</div>
                    <Textarea type="text" className="w-full" placeholder="Description... " value={description} onChange={(e) => setDescription(e.target.value)} />

                    <div className="flex items-center mt-4">
                        <div className="mb-2 mt-4 mr-4">Date de fin</div>
                        <ClassicInput type="date" className="mt-2" value={end} onChange={(e) => setEnd(e.target.value)} />
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
                    <div className="user-in-array-container">
                        {array.length > 0 && (
                            array.map((element, key) => {
                                return (
                                    <div className="user-in-array" key={key}>
                                        <TinyAvatar pic={element.picture} />
                                        <p>{element.pseudo}</p>
                                        <IoClose onClick={() => removeMemberFromArray(element, array, setArray)} />
                                    </div>
                                )
                            })
                        )}
                    </div>
                    <ClassicInput placeholder="Rechercher un membre..." className="mb-3 w-full" value={searchQuery} onInput={handleInputChange} onChange={searchMember} type="search" />
                    <div className="user-selecter">
                        {project.members && (
                            <div className="user-displayer">
                                {project.members.map((element, key) => {
                                    return (
                                        <div className="user-display-choice" key={key} onClick={() => addMemberToArray(element, array, setArray)} style={highlightIt(array, element, isMemberInResult, search)}>
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
            <Button text="Ajouter" className="mt-5 w-full" disabled={title === "" || title === undefined} onClick={updateTask} />
        </Modal>
    )
}

export default UpdateTask