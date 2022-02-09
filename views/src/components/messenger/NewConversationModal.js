import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ImCross } from 'react-icons/im'

const NewConversationModal = ({ friends, currentId, changeCurrentChat }) => {
    const avatar = (props) => { return ({ backgroundImage: `url(${props})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover", width: 36, height: 36, borderRadius: 30, marginRight: 10 }) }
    const [open, setOpen] = useState(false)
    const coverClass = open ? 'modal-cover modal-cover-active' : 'modal-cover'
    const containerClass = open ? 'modal-container modal-container-active show-modal' : 'modal-container hide-modal'
    const modalOpen = () => { setOpen(true) }
    const modalClose = () => { setOpen(false) }

    const [friendsFound, setFriendsFound] = useState([])
    const [array, setArray] = useState([])
    const [propertiesArray, setPropertiesArray] = useState([])

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
        const newConversation = await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/conversations/`,
            data: {
                members: [currentId, ...array],
                owner: currentId, 
                creator: currentId
            }
        })
        setArray([])
        setPropertiesArray([])
        modalClose()
        changeCurrentChat(newConversation.data)
        console.log(newConversation.data)
    }

    const pushUserInArray = (user) => {
        var userProperties = { id: user._id, pseudo: user.pseudo, picture: user.picture }
        if (!array.includes(user._id)) {
            setArray((array) => [...array, user._id])
            setPropertiesArray((array) => [...array, userProperties])
        } else {
            var storedArray = array.slice()
            var index = storedArray.indexOf(user._id);
            storedArray.splice(index, 1)
            setArray(storedArray)

            var storedPropertiesArray = propertiesArray.slice()
            var propertiesIndex = storedPropertiesArray.indexOf(user._id);
            storedPropertiesArray.splice(propertiesIndex, 1)
            setPropertiesArray(storedPropertiesArray)
        }
    }

    const removeUserFromArray = (user) => {
        var storedArray = array.slice()
        var index = storedArray.find(id => id === user._id);
        storedArray.splice(index, 1)
        setArray(storedArray)

        var storedPropertiesArray = propertiesArray.slice()
        var propertiesIndex = storedPropertiesArray.indexOf(user);
        storedPropertiesArray.splice(propertiesIndex, 1)
        setPropertiesArray(storedPropertiesArray)
    }

    return (
        <>
            <button className="btn btn-primary" onClick={modalOpen} style={{ width: "100%", marginBottom: 10 }}>Nouvelle conversation de groupe</button>
            <div className={containerClass}>
                <div className="modal-inner">
                    <div className="close-modal" onClick={() => { modalClose(); setArray([]); setPropertiesArray([]) }}><ImCross /></div>
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
                                                style={{ display: "flex", background: array.includes(element._id) ? "blue" : "" }}>

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
                            propertiesArray.map((element, key) => {
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
