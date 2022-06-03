import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import Modal from '../../../tools/global/Modal'
import { ClassicInput } from '../../../tools/global/Inputs'
import { Button } from '../../../tools/global/Button'
import { MediumAvatar, TinyAvatar } from '../../../tools/global/Avatars'
import { isInResults, isSelected, sendProjectMemberRequest } from '../../../tools/functions/member';
import { addMemberToArray, removeMemberFromArray } from '../../../tools/functions/member';
import { SmallLoader } from '../../../tools/global/Loader';
import { IoClose } from 'react-icons/io5'

const AddMember = ({ open, setOpen, project, user, websocket, isAdmin, isManager }) => {
    const [friendsFound, setFriendsFound] = useState([])
    const [array, setArray] = useState([])
    const [isLoading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        if (open && user.friends.length > 0 && (isAdmin || isManager)) {
            const getFriends = async () => {
                const friendsArray = user.friends.map(async (element) => {
                    return await axios.get(`${process.env.REACT_APP_API_URL}api/user/${element.friend}`)
                        .then((res) => res.data)
                        .catch((err) => console.error(err))
                })
                Promise.all(friendsArray).then((res) => {
                    setFriendsFound(res)
                    setLoading(false)
                })
            }
            getFriends()
        }
    }, [open, user.friends, user._id, isAdmin, isManager])

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
        <Modal open={open} setOpen={setOpen} className="add-members-modal">
            <h2 className="title_border">Nouveaux membres</h2>
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
            <ClassicInput placeholder="Rechercher un ami..." className="w-full mb-3" value={searchQuery} onInput={handleInputChange} onChange={searchFriends} type="search" />
            <div className="user_selecter">
                {friendsFound ? (
                    !isLoading ? (
                        <div className="user_displayer">
                            {friendsFound.map((element, key) => {
                                return (
                                    <div className={`user_display_choice ${isInResults(element, isFriendInResult, search, "flex")} ${isSelected(array, element)}`} key={key} onClick={() => addMemberToArray(element, user, array, setArray)}>
                                        <MediumAvatar pic={element.picture} />
                                        <p>{element.pseudo}</p>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="user_selecter">
                            <SmallLoader />
                        </div>
                    )
                ) : (
                    <p>Vous n'avez pas de contact a ajouter à ce projet</p>
                )}
            </div>
            <Button text="Ajouter" className="mt-5 w-full" disabled={array.length === 0} onClick={() => { sendProjectMemberRequest(array, user, project, websocket, dispatch); setArray([]); setOpen(false) }} />
        </Modal>
    )
}

export default AddMember