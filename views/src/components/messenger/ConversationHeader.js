import React, { useContext, useState } from 'react'
import { avatar } from '../tools/functions/useAvatar'
import { isOnline, returnMembers } from './functions/function'
import { HiMenuAlt3 } from 'react-icons/hi'
import MembersModal from './tools/MembersModal'
import { MessengerContext } from '../AppContext'

const ConversationHeader = ({ setTools, onlineUsers }) => {
    const { uid, websocket, currentChat, members, dispatch } = useContext(MessengerContext)
    const [membersModal, setMembersModal] = useState(false)

    return (
        <>
            {currentChat.type === "dialog" &&
                <div className="conversation-box-top">
                    <div className="conversation-box-members">
                        <div className="conversation-img-container">
                            <div className={`${isOnline(members[0], onlineUsers) ? "conversation-img connected" : "conversation-img"}`} style={avatar(members[0].picture)}></div>
                        </div>
                        <div className="conversation-name">{members[0].pseudo}</div>
                    </div>
                </div>
            }

            {currentChat.type === "group" &&
                <div className="conversation-box-top">
                    <div className="conversation-box-members" onClick={() => setMembersModal(true)}>
                        <div className="conversation-img-container">
                            {currentChat.picture ? (
                                <div className="conversation-img" style={avatar(currentChat.picture)}></div>
                            ) : (
                                members.slice(0, 3).map((element, key) => {
                                    return (
                                        <div className="conversation-img" key={key} style={avatar(element.picture)}></div>
                                    )
                                })
                            )}
                        </div>
                        {currentChat.name ? (
                            <div className="conversation-name">{currentChat.name}</div>
                        ) : (
                            <div className="conversation-name">{returnMembers(members)}</div>
                        )}
                    </div>
                    <button className="tools_btn" onClick={() => setTools(true)}>
                        <HiMenuAlt3 />
                    </button>
                </div>
            }
            <MembersModal
                uid={uid}
                websocket={websocket}
                open={membersModal}
                setOpen={setMembersModal}
                conversation={currentChat}
                dispatch={dispatch}
            />
        </>
    )
}

export default ConversationHeader