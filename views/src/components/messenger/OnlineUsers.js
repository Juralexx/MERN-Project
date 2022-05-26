import React from 'react';
import { NavLink } from 'react-router-dom'
import { avatar } from '../tools/functions/useAvatar';
import ToolsMenu from '../tools/components/ToolsMenu';
import { IconToggle } from '../tools/components/Button';
import { BiSearchAlt } from 'react-icons/bi';
import { isConversation, isOnline } from './tools/function';
import { OnlineUserLoader } from './tools/Loaders';

const OnlineUsers = ({ uid, user, onlineUsers, friendsArr, fetchedFriends, conversations, setConversations, setCurrentChat, changeCurrentChat, dispatch }) => {

    const handleClick = (receiver) => {
        let isConv = isConversation(conversations, [receiver, user])
        if (isConv !== false)
            changeCurrentChat(isConv)
        else {
            const conversation = {
                type: 'dialog',
                members: [{ _id: user._id, pseudo: user.pseudo, picture: user.picture }, { _id: receiver._id, pseudo: receiver.pseudo, picture: receiver.picture }],
                creator: { _id: user._id, pseudo: user.pseudo, picture: user.picture },
                messages: [],
                createdAt: new Date().toISOString()
            }
            setConversations(convs => [conversation, ...convs])
            setCurrentChat(conversation)
        }
    }

    return (
        <div className="online-users-container">
            <div className="flex justify-between pb-3 mb-3 border-b">
                <h2 className="bold">Contact</h2>
                <div className="flex">
                    <IconToggle icon={<BiSearchAlt />} />
                </div>
            </div>
            {!fetchedFriends ? (
                friendsArr.length > 0 ? (
                    friendsArr.map((element, key) => {
                        let online = isOnline(element, onlineUsers)
                        return (
                            <div className="online-users" key={key}>
                                <div className="online-user">
                                    <div className={`${online ? "online-user-img connected" : "online-user-img"}`} style={avatar(element.picture)}></div>
                                    <div className="online-user-name">
                                        <div className="online-user-pseudo">{element.pseudo}</div>
                                        <div className="online-user-status"><em>{online ? "Actif" : "Déconnecté"}</em></div>
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
                    <div className="no-conversation-yet !mt-10">
                        <p>Aucun contact à afficher...</p>
                    </div>
                )
            ) : (
                <OnlineUserLoader />
            )}
        </div>
    )
}

export default OnlineUsers;