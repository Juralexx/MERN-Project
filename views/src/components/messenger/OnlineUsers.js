import React from 'react';
import { NavLink } from 'react-router-dom'
import { avatar } from '../tools/functions/useAvatar';
import { createConversation } from '../../actions/messenger.action';
import ToolsMenu from '../tools/components/ToolsMenu';
import { IconToggle } from '../tools/components/Button';
import { BiSearchAlt } from 'react-icons/bi';

const OnlineUsers = ({ uid, user, onlineUsers, friendsArr, fetchedFriends, conversations, setConversations, changeCurrentChat, dispatch }) => {

    const handleClick = (receiver) => {
        const isConversation = conversations.filter(conv =>
            conv.members.length === 2
            && (conv.members[0].id === uid || conv.members[1].id === uid)
            && (conv.members[0].id === receiver._id || conv.members[1].id === receiver._id)
        )

        if (isConversation) changeCurrentChat(isConversation)
        else {
            const conversation = {
                type: 'dialog',
                members: [{ id: user._id, pseudo: user.pseudo, picture: user.picture }, { id: receiver._id, pseudo: receiver.pseudo, picture: receiver.picture }],
                creator: { id: user._id, pseudo: user.pseudo, picture: user.picture },
                waiter: receiver._id,
                messages: []
            }
            dispatch(createConversation(conversation))
                .then(() => {
                    changeCurrentChat(conversation)
                    setConversations(convs => [...convs, conversation])
                })
        }
    }

    const isOnline = (friend) => {
        let online = onlineUsers.some(item => item.friend === friend._id)
        return online
    }

    return (
        <div className="online-users-container">
            <div className="flex justify-between pb-3">
                <h2 className="bold">Contact</h2>
                <div className="flex">
                    <IconToggle icon={<BiSearchAlt />} />
                </div>
            </div>
            {!fetchedFriends ? (
                friendsArr.map((element, key) => {
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
                [...Array(5)].map((_, key) => {
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
            )}
        </div>
    )
}

export default OnlineUsers;