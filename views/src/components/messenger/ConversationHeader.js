import React, { useContext, useState } from 'react'
import { MessengerContext } from '../AppContext'
import { Link } from 'react-router-dom'
import MembersModal from './tools/MembersModal'
import Icon from '../tools/icons/Icon'
import { isOnline, returnMembersPseudos } from './functions'
import { fullImage } from '../Utils'
import { ToolsBtn } from '../tools/global/Button'

const ConversationHeader = ({ setRightbar, onlineUsers, members }) => {
    const { uid, websocket, conversations, dispatch } = useContext(MessengerContext)
    const [membersModal, setMembersModal] = useState(false)

    return (
        <>
            {conversations.currentChat.type === "dialog" &&
                <div className="conversation-box-top">
                    <div className="go-back">
                        <Link to="/messenger/">
                            <Icon name="ArrowLeft" />
                        </Link>
                    </div>
                    <Link to={'/' + members[0].pseudo}>
                        <div className="conversation-box-members">
                            <div className="conversation-img-container">
                                <div className={`${isOnline(members[0], onlineUsers) ? "conversation-img connected" : "conversation-img"}`} style={fullImage(members[0].picture)}></div>
                            </div>
                            <div className="conversation-name">
                                {members[0].pseudo}
                            </div>
                        </div>
                    </Link>
                    <div className="conversation-box-tools">
                        <ToolsBtn onClick={() => setRightbar({ state: 'open', displayed: 'tools' })}>
                            <Icon name="Settings" />
                        </ToolsBtn>
                    </div>
                </div>
            }

            {conversations.currentChat.type === "group" &&
                <div className="conversation-box-top">
                    <div className="go-back">
                        <Link to="/messenger/">
                            <Icon name="ArrowLeft" />
                        </Link>
                    </div>
                    <div className="conversation-box-members" onClick={() => setMembersModal(true)}>
                        <div className="conversation-img-container">
                            {conversations.currentChat.picture ? (
                                <div className="conversation-img" style={fullImage(conversations.currentChat.picture)}></div>
                            ) : (
                                members.slice(0, 3).map((element, key) => {
                                    return (
                                        <div className="conversation-img" key={key} style={fullImage(element.picture)}></div>
                                    )
                                })
                            )}
                        </div>
                        {conversations.currentChat.name ? (
                            <div className="conversation-name">
                                {conversations.currentChat.name}
                            </div>
                        ) : (
                            <div className="conversation-name">
                                {returnMembersPseudos(members)}
                            </div>
                        )}
                    </div>
                    <div className="conversation-box-tools">
                        <ToolsBtn onClick={() => setRightbar({ state: 'open', displayed: 'members' })} className="mr-2">
                            <Icon name="Group" />
                        </ToolsBtn>
                        <ToolsBtn onClick={() => setRightbar({ state: 'open', displayed: 'tools' })}>
                            <Icon name="Settings" />
                        </ToolsBtn>
                    </div>
                </div>
            }
            <MembersModal
                uid={uid}
                websocket={websocket}
                open={membersModal}
                setOpen={setMembersModal}
                conversation={conversations.currentChat}
                dispatch={dispatch}
            />
        </>
    )
}

export default ConversationHeader