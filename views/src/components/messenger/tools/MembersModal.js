import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../tools/icons/Icon'
import Modal from '../../tools/global/Modal'
import ToolsMenu from '../../tools/global/ToolsMenu'
import Warning from '../../tools/global/Warning'
import { MediumAvatar } from '../../tools/global/Avatars'
import { addClass, dateParser } from '../../Utils'
import { leaveConversation } from '../actions'

const MembersModal = ({ uid, websocket, open, setOpen, conversation, dispatch }) => {
    const [navbar, setNavbar] = useState(1)
    const [warning, setWarning] = useState({})

    return (
        <>
            <Modal open={open} setOpen={setOpen} className="members-modal">
                <div className="modal_nav pb-3 border-b">
                    <div className={`modal_nav-item ${addClass(navbar === 1, "active")}`} onClick={() => setNavbar(1)}>
                        Membres
                    </div>
                    <div className={`modal_nav-item ${addClass(navbar === 2, "active")}`} onClick={() => setNavbar(2)}>
                        Administrateurs
                    </div>
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
                                    <ToolsMenu mobile mobileFull>
                                        {member._id !== uid &&
                                            <div className="tools_choice">
                                                <Icon name="Message" />Envoyer un message
                                            </div>
                                        }
                                        <div className="tools_choice"><Icon name="Redo" />
                                            <Link to={"/" + member.pseudo}>Voir le profil</Link>
                                        </div>
                                        {conversation.owner._id === uid && member._id !== uid &&
                                            <div className="tools_choice red" onClick={() => {
                                                setWarning({ type: 'exclude', member: member })
                                                setOpen(false)
                                            }}>
                                                <Icon name="Trash" />Supprimer
                                            </div>
                                        }
                                    </ToolsMenu>
                                </div>
                            )
                        })
                    }
                    {navbar === 2 &&
                        <div className="conversation-member px-[15px]">
                            <div className="flex items-center">
                                <MediumAvatar pic={conversation.creator.picture} />
                                <div>
                                    <p>{conversation.owner.pseudo}</p>
                                    <p>Proriétaire du groupe</p>
                                </div>
                            </div>
                            <ToolsMenu mobile mobileFull>
                                {conversation.owner._id !== uid &&
                                    <div className="tools_choice">
                                        <Icon name="Message" />Envoyer un message
                                    </div>
                                }
                                <div className="tools_choice">
                                    <Link to={"/" + conversation.creator.pseudo}>
                                        <Icon name="Redo" />Voir le profil
                                    </Link>
                                </div>
                            </ToolsMenu>
                        </div>
                    }
                </div>
            </Modal>

            <Warning
                title={`Exclusion de ${warning?.member?.pseudo}`}
                text={`Voulez-vous vraiment exclure ${warning?.member?.pseudo} de cette conversation ?`}
                validateBtn={`Exclure ${warning?.member?.pseudo}`}
                className="delete"
                open={warning?.type === 'exclude'}
                setOpen={setWarning}
                onValidate={() => leaveConversation(conversation, warning.member._id, uid, websocket, dispatch)}
                onClose={() => {
                    setWarning(null)
                    setOpen(true)
                }}
            >
            </Warning>
        </>
    )
}

export default MembersModal