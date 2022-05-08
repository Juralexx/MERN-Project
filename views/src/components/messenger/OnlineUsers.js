import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom'
import ToolsMenu from '../tools/components/ToolsMenu';
import { avatar } from '../tools/functions/useAvatar';

const OnlineUsers = ({ user, onlineUsers, currentId, changeCurrentChat, setConversations }) => {
    const [friends, setFriends] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        if (user.friends) {
            const fetchFriends = () => {
                try {
                    const friendsArr = user.friends.map(async (element) => {
                        return await axios
                            .get(`${process.env.REACT_APP_API_URL}api/user/${element.friend}`)
                            .then(res => res.data)
                            .catch(err => console.error(err))
                    })
                    Promise.all(friendsArr).then(res => {
                        setFriends(res)
                        setLoading(false)
                    })
                } catch (err) {
                    console.log(err)
                }
            }
            fetchFriends()
        }
    }, [user])

    const handleClick = async (receiver) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}api/conversation/${currentId}`)
            let isConversation = response.data.filter(element => element.members.length === 2)
            isConversation = isConversation.filter(element => element.members[0].id === currentId || element.members[1].id === currentId)
            isConversation = isConversation.find(element => element.members[0].id === receiver._id || element.members[1].id === receiver._id)

            if (isConversation) {
                changeCurrentChat(isConversation)
            } else {
                const createNewConversation = async () => {
                    const user = { id: user._id, pseudo: user.pseudo, picture: user.picture }
                    const friend = { id: receiver._id, pseudo: receiver.pseudo, picture: receiver.picture }
                    const data = { type: 'dialog', owner: user, creator: user, members: [user, friend], waiter: receiver._id }
                    await axios.post(`${process.env.REACT_APP_API_URL}api/conversation/`, data)
                        .then((res) => {
                            changeCurrentChat(res.data)
                            setConversations(conversations => [...conversations, res.data])
                        })
                }
                createNewConversation()
            }
        } catch (err) {
            console.log(err)
        }
    }

    const isOnline = (friend) => {
        let online = onlineUsers.some(item => item.friend === friend._id)
        return online
    }

    return (
        !isLoading ? (
            friends.map((element, key) => {
                return (
                    <div className="online-users" key={key}>
                        <div className="online-user">
                            <div className={`${isOnline() ? "online-user-img connected" : "online-user-img"}`} style={avatar(element.picture)}></div>
                            <div className="online-user-name">
                                <div className="online-user-pseudo">{element.pseudo}</div>
                                <div className="online-user-status"><em>{isOnline() ? "Actif" : "Déconnecté"}</em></div>
                            </div>
                        </div>
                        <ToolsMenu>
                            <div className="tools_choice" onClick={() => handleClick(element)}>Conversation</div>
                            <div className="tools_choice"><NavLink to={"/" + element.pseudo}>Voir le profil</NavLink></div>
                        </ToolsMenu>
                    </div>
                )
            })
        ) : (
            [...Array(3)].map((_, key) => {
                return (
                    <div className="online-users" key={key}>
                        <div className="online-user">
                            <div className="loading-circle-36 loading"></div>
                            <div className="online-user-name">
                                <div className="loading-small-title loading"></div>
                                <div className="loading-short-text mt-2 pulse loading"></div>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    )
}

export default OnlineUsers;