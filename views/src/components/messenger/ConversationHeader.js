import React, { useContext, useState } from 'react'
import { MessengerContext } from '../AppContext'
import { Link } from 'react-router-dom'
import MembersModal from './tools/MembersModal'
import Tooltip from '../tools/global/Tooltip'
import { avatar } from '../tools/hooks/useAvatar'
import { isOnline, returnMembers } from './functions/function'
import { HiArrowSmLeft } from 'react-icons/hi'
import { AiOutlineInfo, AiOutlineTeam } from 'react-icons/ai'

const ConversationHeader = ({ setRightbar, onlineUsers, members }) => {
    const { uid, websocket, currentChat, dispatch } = useContext(MessengerContext)
    const [membersModal, setMembersModal] = useState(false)

    return (
        <>
            {currentChat.type === "dialog" &&
                <div className="conversation-box-top">
                    <div className="go-back absolute">
                        <Link to="/messenger/"><HiArrowSmLeft /></Link>
                    </div>
                    <Link to={'/' + members[0].pseudo}>
                        <div className="conversation-box-members">
                            <div className="conversation-img-container">
                                <div className={`${isOnline(members[0], onlineUsers) ? "conversation-img connected" : "conversation-img"}`} style={avatar(members[0].picture)}></div>
                            </div>
                            <div className="conversation-name">{members[0].pseudo}</div>
                        </div>
                    </Link>
                    <div className="conversation-box-tools">
                        <Tooltip content={<p>Paramètres</p>} placement="bottom">
                            <button className="tools_btn" onClick={() => setRightbar({ state: 'open', displayed: 'tools' })}>
                                <AiOutlineInfo />
                            </button>
                        </Tooltip>
                    </div>
                </div>
            }

            {currentChat.type === "group" &&
                <div className="conversation-box-top">
                    <div className="go-back absolute">
                        <Link to="/messenger/"><HiArrowSmLeft /></Link>
                    </div>
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
                    <div className="conversation-box-tools">
                        <Tooltip content={<p>Membres en ligne</p>} placement="bottom">
                            <button className="tools_btn" onClick={() => setRightbar({ state: 'open', displayed: 'members' })}>
                                <AiOutlineTeam />
                            </button>
                        </Tooltip>
                        <Tooltip content={<p>Paramètres</p>} placement="bottom">
                            <button className="tools_btn" onClick={() => setRightbar({ state: 'open', displayed: 'tools' })}>
                                <AiOutlineInfo />
                            </button>
                        </Tooltip>
                    </div>
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