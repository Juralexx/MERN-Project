import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ImCross } from 'react-icons/im'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import { avatar } from '../tools/functions/useAvatar';
import { IconButton } from '../tools/components/Button';

const NewConversationModal = ({ friends, currentId, changeCurrentChat, websocket }) => {
    const userData = useSelector((state) => state.userReducer)
    const [open, setOpen] = useState(false)
    const coverClass = open ? 'modal-cover modal-cover-active' : 'modal-cover'
    const containerClass = open ? 'modal-container modal-container-active show-modal' : 'modal-container hide-modal'
    const modalOpen = () => { setOpen(true) }
    const modalClose = () => { setOpen(false) }

    const [displayInfos, setDisplayInfos] = useState(false)
    const [displayMembers, setDisplayMembers] = useState(true)
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
                Promise.all(friendsArray).then((res) => {
                    setFriendsFound(res)
                })
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
            setDisplayMembers(true)
            setDisplayInfos(false)
            setName()
            setDescription()
            modalClose()
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
        <>
            <IconButton text="Nouvelle conversation" endIcon={<AiOutlinePlusCircle />} fullwidth className="mb-[10px] ml-[5px]" onClick={modalOpen}></IconButton>
            <div className={containerClass + " add-conversation-modal bg-white dark:bg-background_primary shadow-custom dark:shadow-lg" }>
                <div className="modal-inner">
                    <div className="close-modal" onClick={() => { modalClose(); setArray([]) }}><ImCross /></div>
                    <div className='header'>
                        <ul>
                            <li onClick={() => { setDisplayMembers(true); setDisplayInfos(false) }}>Membres</li>
                            <li onClick={() => { setDisplayInfos(true); setDisplayMembers(false) }}>À propos</li>
                        </ul>
                    </div>
                    {displayMembers && (
                        <div className='body'>
                            <div className="display-conversation-users">
                                {array.length > 0 && (
                                    array.map((element, key) => {
                                        return (
                                            <div className="conversation-user" key={key}>
                                                <div className="conversation-user-avatar" style={avatar(element.picture)}></div>
                                                <p>{element.pseudo}</p>
                                                <ImCross onClick={() => removeUserFromArray(element)} />
                                            </div>
                                        )
                                    })
                                )}
                            </div>
                            <div>
                                {open && friendsFound && (
                                    <>
                                        <input placeholder="Rechercher un ami..." className="conversation-menu-input" value={searchQuery} onInput={handleInputChange} onChange={searchFriends} type="search" />
                                        <div className="display-selection">
                                            {friendsFound.map((element, key) => {
                                                return (
                                                    <div className="selected-users"
                                                        key={key}
                                                        onClick={() => pushUserInArray(element)}
                                                        style={{
                                                            background: array.some(user => user.id === element._id) ? "#6366f1" : "",
                                                            display: search ? (isFriendInResult.includes(element) ? "flex" : "none") : ("flex")
                                                        }}>

                                                        <div className="selected-users-avatar" style={avatar(element.picture)}></div>
                                                        <p>{element.pseudo}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                    {displayInfos && (
                        <div className="body">
                            <div className="left">
                                <div className="title">Nom</div>
                                <div className="info">
                                    <input className="conversation-menu-input" onChange={(e) => setName(e.target.value)} placeholder="Nom de la conversation..." />
                                </div>
                            </div>
                            <div className="left">
                                <div className="title">Description</div>
                                <div className="info">
                                    <textarea className="conversation-menu-input" onChange={(e) => setDescription(e.target.value)} placeholder="Description de la conversation..."></textarea>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className='footer'>
                        <button className="btn btn-primary" disabled={array.length < 1} onClick={createNewConversation}>Créer la conversation</button>
                    </div>
                </div>
            </div>
            <div className={coverClass} onClick={modalClose}></div>
        </>
    );
};

export default NewConversationModal;