import axios from 'axios'
import React, { useState } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { FaTrashAlt } from 'react-icons/fa'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { avatar } from '../tools/functions/useAvatar'
import ConversationModal from './ConversationModal'
import UserModal from './UserModal'

const ConversationHeader = ({ getMembers, currentChat, uid, friends, deleteConversation, leaveConversation, addNewMember }) => {
    const [openConvMenu, setOpenConvMenu] = useState(false)
    const [friend, setFriend] = useState({})
    const [openUserModal, setOpenUserModal] = useState(false)
    const [openConvModal, setOpenConvModal] = useState(false)

    const getFriend = async () => {
        const member = getMembers(currentChat)
        await axios.get(`${process.env.REACT_APP_API_URL}api/user/${member[0].id}`)
            .then((res) => setFriend(res.data))
            .catch((err) => console.error(err))
        setOpenUserModal(!openUserModal)
    }

    return (
        <>
            {openUserModal && <UserModal setOpen={setOpenUserModal} open={openUserModal} avatar={avatar} friend={friend} />}
            {currentChat.type === 'dialog' && (
                <div className="conversation-box-top">
                    <div className="conversation-box-members" onClick={getFriend}>
                        <div className="conversation-img-container">
                            {getMembers(currentChat).map((element, key) => {
                                return (
                                    <div className="conversation-img" key={key} style={avatar(element.picture)}></div>
                                )
                            })}
                        </div>
                        <div className="conversation-name">
                            <strong>{getMembers(currentChat)[0].pseudo} <MdOutlineKeyboardArrowDown /></strong>
                        </div>
                    </div>
                    <div className="conversation-box-menu">
                        <div role="button" onClick={() => setOpenConvMenu(!openConvMenu)}><AiOutlineInfoCircle /></div>
                    </div>
                    {openConvMenu && (
                        currentChat.owner === uid && (
                            <div className="conversation-tools">
                                <button onClick={() => deleteConversation(currentChat)}><FaTrashAlt /> Supprimer</button>
                            </div>
                        )
                    )}
                </div>
            )}

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
            {currentChat.type === "group" && (
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
                            {currentChat.members.length === 2 && (
                                <strong>{getMembers(currentChat)[0].pseudo}</strong>
                            )}
                            {currentChat.members.length === 3 && (
                                <strong>{getMembers(currentChat)[0].pseudo + ", " + getMembers(currentChat)[1].pseudo}</strong>
                            )}
                            {currentChat.members.length === 4 && (
                                <strong>{getMembers(currentChat)[0].pseudo + ", " + getMembers(currentChat)[1].pseudo + ", " + getMembers(currentChat)[2].pseudo}</strong>
                            )}
                            {currentChat.members.length > 5 && (
                                <strong>{getMembers(currentChat)[0].pseudo + ", " + getMembers(currentChat)[1].pseudo + ", " + getMembers(currentChat)[2].pseudo + " et " + (getMembers(currentChat).length - 3) + " autres"}</strong>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ConversationHeader