import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ImCross } from 'react-icons/im'
import { useSelector } from 'react-redux';

const NewConversationModal = ({ friends, currentId, changeCurrentChat }) => {
    const userData = useSelector((state) => state.userReducer)
    const avatar = (props) => { return ({ backgroundImage: `url(${props})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover", width: 36, height: 36, borderRadius: 30, marginRight: 10 }) }
    const [open, setOpen] = useState(false)
    const coverClass = open ? 'modal-cover modal-cover-active' : 'modal-cover'
    const containerClass = open ? 'modal-container modal-container-active show-modal' : 'modal-container hide-modal'
    const modalOpen = () => { setOpen(true) }
    const modalClose = () => { setOpen(false) }

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
    }, [friends])

    const createNewConversation = async () => {
        var user = { id: userData._id, pseudo: userData.pseudo, picture: userData.picture }
        const newConversation = await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/conversations/`,
            data: {
                members: [user, ...array],
                owner: currentId, 
                creator: currentId
            }
        })
        setArray([])
        modalClose()
        changeCurrentChat(newConversation.data)
    }

    const pushUserInArray = (user) => {
        var userProperties = { id: user._id, pseudo: user.pseudo, picture: user.picture }
        if (!array.some((element) => element.id === user._id)) {
            setArray((array) => [...array, userProperties])
        } else {
            var storedArray = array.slice()
            var index = storedArray.findIndex(element => element.id === user._id && element.pseudo === user.pseudo)
            storedArray.splice(index, 1)
            setArray(storedArray)
        }
    }

    const removeUserFromArray = (user) => {
        var storedArray = array.slice()
        var index = storedArray.findIndex(element => element.id === user.id)
        storedArray.splice(index, 1)
        setArray(storedArray)
    }

    return (
        <>
            <button className="btn btn-primary" onClick={modalOpen} style={{ width: "100%", marginBottom: 10 }}>Nouvelle conversation de groupe</button>
            <div className={containerClass}>
                <div className="modal-inner">
                    <div className="close-modal" onClick={() => { modalClose(); setArray([]) }}><ImCross /></div>
                    <div className='header'>
                    </div>
                    <div className='body'>
                        <div>
                            {open && friendsFound && (
                                <>
                                    <input placeholder="Rechercher un ami..." className="conversation-menu-input" />
                                    {friendsFound.map((element, key) => {
                                        return (
                                            <div
                                                key={key}
                                                onClick={() => pushUserInArray(element)}
                                                style={{ display: "flex", background: array.some(user => user.id === element._id) ? "blue" : "" }}>

                                                <div style={avatar(element.picture)}></div>
                                                <p>{element.pseudo}</p>
                                            </div>
                                        )
                                    })}
                                </>
                            )}
                        </div>
                    </div>
                    <div style={{ marginTop: 30 }}>
                        {array.length > 0 && (
                            array.map((element, key) => {
                                return (
                                    <div key={key} style={{ display: "flex" }}>
                                        <div style={avatar(element.picture)}></div>
                                        <p>{element.pseudo}</p>
                                        <ImCross onClick={() => removeUserFromArray(element)}/>
                                    </div>
                                )
                            })
                        )}
                    </div>
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
