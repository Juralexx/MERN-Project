import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import Modal from '../../../tools/components/Modal'
import { ImCross } from 'react-icons/im'
import { avatar } from '../../../tools/functions/useAvatar';
import { BasicInput } from '../../../tools/components/Inputs'
import { Button } from '../../../tools/components/Button'
import { sendProjectMemberRequest } from '../../../tools/functions/member';
import { addMemberToArray, removeMemberFromArray, highlightIt } from '../../../tools/functions/member';

const AddMember = ({ open, setOpen, project, user, websocket, isAdmin, isManager }) => {
    const [friendsFound, setFriendsFound] = useState([])
    const [array, setArray] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        if (user.friends.length > 0 && (isAdmin || isManager)) {
            const getFriends = async () => {
                const friendsArray = user.friends.map(async (element) => {
                    return await axios.get(`${process.env.REACT_APP_API_URL}api/user/${element.friend}`)
                        .then((res) => res.data)
                        .catch((err) => console.error(err))
                })
                Promise.all(friendsArray).then((res) => { setFriendsFound(res) })
            }
            getFriends()
        }
    }, [user.friends, user._id, isAdmin, isManager])
    
    const [search, setSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isFriendInResult, setFriendInResult] = useState([])
    const isEmpty = !isFriendInResult || isFriendInResult.length === 0
    const regexp = new RegExp(searchQuery, 'i');
    const handleInputChange = (e) => { setSearchQuery(e.target.value) }
    const searchFriends = () => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        if (searchQuery.length >= 2) {
            const response = friendsFound?.filter(friend => regexp.test(friend.pseudo))
            setFriendInResult(response)
            setSearch(true)
            if (isEmpty) {
                setSearch(false)
            }
        } else { setSearch(false) }
    }

    return (
        <Modal open={open} setOpen={setOpen} css="bg-white dark:bg-background_primary shadow-custom dark:shadow-lg">
            <div className="close-modal" onClick={() => { setOpen(false); setArray([]) }}><ImCross /></div>
            <div className="relative">
                <div className="flex py-3">
                    {array.length > 0 && (
                        array.map((element, key) => {
                            return (
                                <div className="flex items-center p-2 mr-1 dark:bg-background_primary_light rounded-lg cursor-pointer" key={key}>
                                    <div className="conversation-user-avatar" style={avatar(element.picture)}></div>
                                    <p>{element.pseudo}</p>
                                    <ImCross className="ml-2 h-3 w-3" onClick={() => removeMemberFromArray(element, array, setArray)} />
                                </div>
                            )
                        })
                    )}
                </div>
                <div className="h-full">
                    {open && friendsFound && (
                        <>
                            <BasicInput placeholder="Rechercher un ami..." className="mb-3" value={searchQuery} onInput={handleInputChange} onChange={searchFriends} type="search" />
                            <div className="h-full overflow-auto">
                                {friendsFound.map((element, key) => {
                                    return (
                                        <div className="flex items-center p-2 my-1 cursor-pointer rounded-lg" key={key} onClick={() => addMemberToArray(element, user, array, setArray)} style={highlightIt(array, element, isFriendInResult, search)}>
                                            <div className="w-9 h-9 mr-3 rounded-full" style={avatar(element.picture)}></div>
                                            <p>{element.pseudo}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    )}
                </div>
                <Button text="Ajouter" className="mt-5" disabled={array.length === 0} onClick={() => { sendProjectMemberRequest(array, user, project, websocket, dispatch); setArray([]); setOpen(false) }} />
            </div>
        </Modal>
    )
}

export default AddMember