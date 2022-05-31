import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'
import ToolsMenu from '../tools/components/ToolsMenu';
import Tools from './conversation-tools/Tools';
import { IconToggle } from '../tools/components/Button';
import { isConversation, isOnline } from './functions/function';
import { OnlineUserLoader } from './tools/Loaders';
import { avatar } from '../tools/functions/useAvatar';
import { BiSearchAlt } from 'react-icons/bi';
import { MessengerContext } from '../AppContext';

const ConversationTools = ({ onlineUsers, fetchedFriends, currentChat, members, conversations, setConversations, setCurrentChat, changeCurrentChat, tools, setTools }) => {
    const { uid, user, websocket, friendsArr, dispatch } = useContext(MessengerContext)

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
        <div className="conversation-tools">
            {!tools ? (
                <>
                    <div className="flex items-center justify-between p-1 mb-3">
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
                </>
            ) : (
                <Tools
                    uid={uid}
                    user={user}
                    websocket={websocket}
                    members={members}
                    open={tools}
                    setOpen={setTools}
                    conversation={currentChat}
                    friendsArr={friendsArr}
                    dispatch={dispatch}
                />
            )}
        </div>
    )
}

export default ConversationTools;