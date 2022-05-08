import React, { useState } from 'react'
import axios from 'axios'
import { avatar } from '../tools/functions/useAvatar'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { getMembers } from './tools/function'
import ConversationModal from './ConversationModal'
import ToolsMenu from '../tools/components/ToolsMenu'

const ConversationHeader = ({ currentChat, uid, friends, deleteConversation, leaveConversation, addNewMember }) => {
    const [openConvModal, setOpenConvModal] = useState(false)
    const [favorite, setFavorite] = useState(false)

    const addFavorite = async () => {
        const data = { conversationId: currentChat._id }
        await axios.put(`${process.env.REACT_APP_API_URL}api/user/conversation/add-favorite/${uid}`, data)
            .then((res) => res.data)
            .catch((err) => console.error(err))
        setFavorite(true)
    }

    const removeFavorite = async () => {
        const data = { conversationId: currentChat._id }
        await axios.put(`${process.env.REACT_APP_API_URL}api/user/conversation/remove-favorite/${uid}`, data)
            .then((res) => res.data)
            .catch((err) => console.error(err))
        setFavorite(false)
    }

    return (
        <>
            {currentChat.type === 'dialog' &&
                <div className="conversation-box-top">
                    <div className="conversation-box-members">
                        <div className="conversation-img-container">
                            {getMembers(currentChat, uid).map((element, key) => {
                                return <div className="conversation-img" key={key} style={avatar(element.picture)}></div>
                            })}
                        </div>
                        <div className="conversation-name">
                            <div>{getMembers(currentChat, uid)[0].pseudo}</div>
                            <MdOutlineKeyboardArrowDown />
                        </div>
                    </div>
                    <ToolsMenu>
                        {favorite ? (
                            <div className="tools_choice" onClick={removeFavorite}>Retirer des favoris</div>
                        ) : (
                            <div className="tools_choice" onClick={addFavorite}>Ajouter aux favoris</div>
                        )}
                        {currentChat.owner === uid && <div className="tools_choice" onClick={() => deleteConversation(currentChat)}>Supprimer la conversation</div>}
                    </ToolsMenu>
                </div>
            }
            {openConvModal &&
                <ConversationModal
                    setOpen={setOpenConvModal}
                    open={openConvModal} avatar={avatar}
                    uid={uid}
                    conversation={currentChat}
                    deleteConversation={deleteConversation}
                    leaveConversation={leaveConversation}
                    addNewMember={addNewMember}
                    friends={friends}
                />
            }
            {currentChat.type === "group" &&
                <div className="conversation-box-top">
                    <div className="conversation-box-members" onClick={() => setOpenConvModal(!openConvModal)}>
                        <div className="conversation-img-container">
                            {getMembers(currentChat).map((element, key) => {
                                return (
                                    <div className="conversation-img" key={key} style={avatar(element.picture)}></div>
                                )
                            })}
                        </div>
                        <div className="conversation-name">
                            {currentChat.members.length === 2 &&
                                getMembers(currentChat)[0].pseudo
                            }
                            {currentChat.members.length === 3 &&
                                getMembers(currentChat)[0].pseudo + ", " + getMembers(currentChat)[1].pseudo
                            }
                            {currentChat.members.length === 4 &&
                                getMembers(currentChat)[0].pseudo + ", " + getMembers(currentChat)[1].pseudo + ", " + getMembers(currentChat)[2].pseudo
                            }
                            {currentChat.members.length > 5 &&
                                getMembers(currentChat)[0].pseudo + ", " + getMembers(currentChat)[1].pseudo + ", " + getMembers(currentChat)[2].pseudo + " et " + (getMembers(currentChat).length - 3) + " autres"
                            }
                            <MdOutlineKeyboardArrowDown />
                        </div>
                    </div>
                    <ToolsMenu>
                        {favorite ? (
                            <div className="tools_choice" onClick={removeFavorite}>Retirer des favoris</div>
                        ) : (
                            <div className="tools_choice" onClick={addFavorite}>Ajouter aux favoris</div>
                        )}
                        {currentChat.owner === uid && <div className="tools_choice" onClick={() => deleteConversation(currentChat)}>Supprimer la conversation</div>}
                    </ToolsMenu>
                </div>
            }
        </>
    )
}

export default ConversationHeader