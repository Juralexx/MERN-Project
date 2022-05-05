import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button } from '../tools/components/Button';
import Modal from '../tools/components/Modal';
import { ClassicInput, Textarea } from '../tools/components/Inputs';
import { MediumAvatar, TinyAvatar } from '../tools/components/Avatars';
import { highlightIt } from '../tools/functions/member';
import { IoClose } from 'react-icons/io5'

const NewConversationModal = ({ friends, currentId, changeCurrentChat, websocket }) => {
    const userData = useSelector((state) => state.userReducer)
    const [open, setOpen] = useState(false)

    const [navbar, setNavbar] = useState(1)
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [friendsFound, setFriendsFound] = useState([])
    const [array, setArray] = useState([])

    useEffect(() => {
        const getFriends = async () => {
            if (friends.length > 0) {
                const friendsArray = friends.map(async (element) => {
                    return await axios.get(`${process.env.REACT_APP_API_URL}api/user/${element.friend}`)
                        .then((res) => res.data)
                        .catch((err) => console.error(err))
                })
                Promise.all(friendsArray).then((res) => setFriendsFound(res))
            }
        }
        getFriends()
    }, [friends.length])

    const createNewConversation = async () => {
        if (array.length === 1) var type = 'dialog'
        else type = 'group'

        let user = { id: userData._id, pseudo: userData.pseudo, picture: userData.picture }
        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/conversations/`,
            data: {
                type: type,
                description: description,
                name: name,
                members: [user, ...array],
                owner: {
                    id: currentId,
                    pseudo: userData.pseudo,
                    picture: userData.picture
                },
                creator: {
                    id: currentId,
                    pseudo: userData.pseudo,
                    picture: userData.picture
                }
            }
        }).then((res) => {
            let ids = []
            res.data.members.map(member => { return ids = [...ids, member.id] })
            ids.map(memberId => {
                return websocket.current.emit("addConversation", {
                    receiverId: memberId,
                    conversation: res.data
                })
            })
            setArray([])
            setNavbar(1)
            setName()
            setDescription()
            setOpen(false)
        })
    }

    const pushUserInArray = (user) => {
        let userProperties = { id: user._id, pseudo: user.pseudo, picture: user.picture }
        if (!array.some((element) => element.id === user._id)) {
            setArray((array) => [...array, userProperties])
        } else {
            let storedArray = array.slice()
            let index = storedArray.findIndex(element => element.id === user._id && element.pseudo === user.pseudo)
            storedArray.splice(index, 1)
            setArray(storedArray)
        }
    }

    const removeUserFromArray = (user) => {
        let storedArray = array.slice()
        let index = storedArray.findIndex(element => element.id === user.id)
        storedArray.splice(index, 1)
        setArray(storedArray)
    }

    const [search, setSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isFriendInResult, setFriendInResult] = useState([])
    const isEmpty = !isFriendInResult || isFriendInResult.length === 0
    const regexp = new RegExp(searchQuery, 'i')

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
        <>
            <Button text="Nouvelle conversation" className="mb-[10px] ml-[5px]" onClick={() => setOpen(true)} />
            <Modal open={open} setOpen={setOpen} className=" add-conversation-modal">
                <div className='header'>
                    <ul>
                        <li onClick={() => setNavbar(1)}>Membres</li>
                        <li onClick={() => setNavbar(2)}>À propos</li>
                    </ul>
                </div>
                <div className='body'>
                    {navbar === 1 ? (
                        <>
                            <div className="user_in_array-container">
                                {array.length > 0 && (
                                    array.map((element, key) => {
                                        return (
                                            <div className="user_in_array" key={key}>
                                                <TinyAvatar pic={element.picture} />
                                                <p>{element.pseudo}</p>
                                                <IoClose onClick={() => removeUserFromArray(element)} />
                                            </div>
                                        )
                                    })
                                )}
                            </div>
                            <ClassicInput placeholder="Rechercher un ami..." className="full mb-2" value={searchQuery} onInput={e => setSearchQuery(e.target.value)} onChange={searchFriends} type="search" />
                            <div className="user_selecter">
                                {open && friendsFound &&
                                    <>
                                        <div className="user_displayer">
                                            {friendsFound.map((element, key) => {
                                                return (
                                                    <div className="user_display_choice" key={key} onClick={() => pushUserInArray(element)} style={highlightIt(array, element, isFriendInResult, search)}>
                                                        <MediumAvatar pic={element.picture} />
                                                        <p>{element.pseudo}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </>
                                }
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="add-conversation-bloc">
                                <div className="title">Nom</div>
                                <div className="info">
                                    <ClassicInput className="full" onChange={(e) => setName(e.target.value)} placeholder="Nom de la conversation..." />
                                </div>
                            </div>
                            <div className="add-conversation-bloc">
                                <div className="title">Description</div>
                                <div className="info">
                                    <Textarea className="full" onChange={(e) => setDescription(e.target.value)} placeholder="Description de la conversation..." />
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className='conversation-btn_container'>
                    <Button text="Créer la conversation" disabled={array.length < 1} onClick={createNewConversation} />
                </div>
            </Modal>
        </>
    );
};

export default NewConversationModal;