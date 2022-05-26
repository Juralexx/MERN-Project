import React, { useState, useMemo } from 'react'
import { addActive } from '../../Utils'
import Modal from '../../tools/components/Modal'
import { getMembers, returnMembers } from '../tools/function'
import { avatar } from '../../tools/functions/useAvatar'
import Files from './Files'
import Members from './Members'
import Main from './Main'

const ConversationModal = ({ uid, websocket, dispatch, open, setOpen, conversation, friendsArr }) => {
    const [navbar, setNavbar] = useState(1)
    const members = useMemo(() => getMembers(conversation, uid), [conversation, uid])

    return (
        <Modal open={open} setOpen={setOpen} className="conversation-modal">
            <div className="flex items-center pb-2">
                {conversation.picture ? (
                    <div className="conversation-img" style={avatar(conversation.picture)}></div>
                ) : (
                    <div className="conversation-img-container">
                        {members.slice(0, 3).map((element, key) => {
                            return (
                                <div className="conversation-img" key={key} style={avatar(element.picture)}></div>
                            )
                        })}
                    </div>
                )}
                {conversation.name ? (
                    <div className="bold text-lg">{conversation.name}</div>
                ) : (
                    <div className="flex items-center pb-3">
                        <div className="conversation-name">{returnMembers(members)}</div>
                    </div>
                )}
            </div>
            <div className="modal_nav">
                <div className={`modal_nav-item ${addActive(navbar === 1, "active")}`} onClick={() => setNavbar(1)}>À propos</div>
                <div className={`modal_nav-item ${addActive(navbar === 2, "active")}`} onClick={() => setNavbar(2)}>Membres <span>{members.length + 1}</span></div>
                {conversation.files.length > 0 && <div className={`modal_nav-item ${addActive(navbar === 3, "active")}`} onClick={() => setNavbar(3)}>Fichiers</div>}
            </div>

            {navbar === 1 &&
                <Main
                    uid={uid}
                    websocket={websocket}
                    conversation={conversation}
                    dispatch={dispatch}
                    setOpen={setOpen}
                />
            }

            {navbar === 2 &&
                <Members
                    uid={uid}
                    websocket={websocket}
                    members={members}
                    friendsArr={friendsArr}
                    conversation={conversation}
                    dispatch={dispatch}
                />
            }

            {conversation.files.length > 0 &&
                navbar === 3 &&
                <Files
                    uid={uid}
                    websocket={websocket}
                    conversation={conversation}
                    dispatch={dispatch}
                />
            }
        </Modal>
    )
}

export default ConversationModal