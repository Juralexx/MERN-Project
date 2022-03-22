import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTask } from '../../../../actions/project.action'
import Modal from '../../../tools/components/Modal'
import { BasicInput, Textarea } from '../../../tools/components/Inputs'
import { Button } from '../../../tools/components/Button'
import { avatar } from '../../../tools/functions/useAvatar'
import { ImCross } from 'react-icons/im'
import { addMemberToArray, removeMemberFromArray } from '../../../tools/functions/task'
import { highlightIt } from '../../../tools/functions/function'

const CreateTask = ({ open, setOpen, project, user, websocket }) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [end, setEnd] = useState("")
    const [array, setArray] = useState([])
    const dispatch = useDispatch()

    const newTask = async () => {
        const task = { title: title, description: description, state: "undone", creatorId: user._id, creator: user.pseudo, creatorPicture: user.picture, end: end, members: array, date: new Date().toISOString() }
        dispatch(createTask(project._id, task))
        const members = project.members.filter(member => member.id !== user._id)
        members.map(member => {
            return websocket.current.emit("createTask", {
                receiverId: member.id,
                task: task
            })
        })
        setOpen(false);
        setTitle(null)
        setDescription(null)
        setEnd(null)
        setArray([])
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
        <Modal open={open} setOpen={setOpen} css="w-[420px] bg-white dark:bg-background_primary shadow-custom dark:shadow-lg">
            <div className="text-lg pb-2 px-3 mb-4 border-b border-b-gray-500 dark:border-b-slate-300/30">Créer une nouvelle tâche</div>

            <BasicInput type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea type="text" placeholder="Description" className="mt-2" value={description} onChange={(e) => setDescription(e.target.value)} />
            <BasicInput type="date" className="mt-2" value={end} onChange={(e) => setEnd(e.target.value)} />

            {project.members && searchQuery && (
                <div className="w-full bottom-[60px] max-h-[200px] mt-2 bg-white dark:bg-background_primary overflow-auto">
                    {project.members.map((element, key) => {
                        return (
                            <div className="flex items-center p-2 my-1 cursor-pointer rounded-lg" key={key} onClick={() => addMemberToArray(element, array, setArray)} style={highlightIt(array, element, isMemberInResult, search)}>
                                <div className="w-9 h-9 mr-3 rounded-full" style={avatar(element.picture)}></div>
                                <p>{element.pseudo}</p>
                            </div>
                        )
                    })}
                </div>
            )}
            <BasicInput placeholder="Rechercher un membre..." className="mb-3 mt-2" value={searchQuery} onInput={handleInputChange} onChange={searchMember} type="search" />

            {array.length > 0 && (
                <div className="flex py-3">
                    {array.map((element, key) => {
                        return (
                            <div className="flex items-center p-2 mr-1 dark:bg-background_primary_light rounded-lg cursor-pointer" key={key}>
                                <div className="conversation-user-avatar" style={avatar(element.picture)}></div>
                                <p>{element.pseudo}</p>
                                <ImCross className="ml-2 h-3 w-3" onClick={() => removeMemberFromArray(element, array, setArray)} />
                            </div>
                        )
                    })}
                </div>
            )}
            <Button text="Ajouter" className="mt-5" disabled={title === "" || title === undefined} onClick={newTask} />
        </Modal>
    )
}

export default CreateTask