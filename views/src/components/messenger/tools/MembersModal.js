import React, { useState } from 'react'
import { IoArrowRedo, IoTrashBin } from 'react-icons/io5'
import { MdOutlineMessage } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { MediumAvatar } from '../../tools/components/Avatars'
import Modal from '../../tools/components/Modal'
import ToolsMenu from '../../tools/components/ToolsMenu'
import { addClass, dateParser } from '../../Utils'
import { leaveConversation } from '../functions/actions'

const MembersModal = ({ uid, websocket, open, setOpen, conversation, dispatch }) => {
    const [navbar, setNavbar] = useState(1)

    return (
        <Modal open={open} setOpen={setOpen} className="members-modal">
            <div className="modal_nav pb-3 border-b">
                <div className={`modal_nav-item ${addClass(navbar === 1, "active")}`} onClick={() => setNavbar(1)}>Membres</div>
                <div className={`modal_nav-item ${addClass(navbar === 2, "active")}`} onClick={() => setNavbar(2)}>Administrateurs</div>
            </div>
            <div className="conversation-members custom-scrollbar">
                {navbar === 1 &&
                    conversation.members.map((member, key) => {
                        return (
                            <div className="conversation-member" key={key}>
                                <div className="flex items-center">
                                    <MediumAvatar pic={member.picture} />
                                    <div>
                                        <p>{member.pseudo}</p>
                                        <p>
                                            {conversation.creator._id === member._id ? (
                                                "Créateur du groupe"
                                            ) : (
                                                `Ajouté(e) par ${member.requester_pseudo} le ${dateParser(member.date)}`
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <ToolsMenu>
                                    {member._id !== uid &&
                                        <div className="tools_choice"><MdOutlineMessage />Envoyer un message</div>
                                    }
                                    <div className="tools_choice"><IoArrowRedo /><Link to={"/" + member.pseudo}>Voir le profil</Link></div>
                                    {conversation.owner._id === uid && member._id !== uid &&
                                        <div className="tools_choice red" onClick={() => leaveConversation(conversation, member._id, uid, websocket, dispatch)}><IoTrashBin />Supprimer</div>
                                    }
                                </ToolsMenu>
                            </div>
                        )
                    })
                }
                {navbar === 2 &&
                    <div className="conversation-member">
                        <div className="flex items-center">
                            <MediumAvatar pic={conversation.creator.picture} />
                            <div>
                                <p>{conversation.creator.pseudo}</p>
                                <p>Créateur du groupe</p>
                            </div>
                        </div>
                        <ToolsMenu>
                            {conversation.creator._id !== uid &&
                                <div className="tools_choice"><MdOutlineMessage />Envoyer un message</div>
                            }
                            <div className="tools_choice"><IoArrowRedo /><Link to={"/" + conversation.creator.pseudo}>Voir le profil</Link></div>
                            {conversation.owner._id === uid && conversation.creator._id !== uid &&
                                <div className="tools_choice red" onClick={() => leaveConversation(conversation, conversation.creator._id, uid, websocket, dispatch)}><IoTrashBin />Supprimer</div>
                            }
                        </ToolsMenu>
                    </div>
                }
            </div>
        </Modal>
    )
}

export default MembersModal

// className={`${isInResults(member, isResults, search, "flex")} conversation-member`}