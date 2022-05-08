import React, { useEffect, useState } from 'react'
import { avatar } from '../tools/functions/useAvatar'
import { getMembers } from './tools/function'
import { addFavorite, removeFavorite } from '../../actions/messenger.action'
import ConversationModal from './ConversationModal'
import ToolsMenu from '../tools/components/ToolsMenu'

const ConversationHeader = ({ uid, user, currentChat, friendsArr, deleteConversation, leaveConversation, addNewMember, dispatch }) => {
    const [openConvModal, setOpenConvModal] = useState(false)
    const [isFavorite, setFavorite] = useState(null)
    const members = getMembers(currentChat, uid)

    const favorite = () => {
        dispatch(addFavorite(uid, currentChat._id))
        setFavorite(true)
    }

    const unfavorite = () => {
        dispatch(removeFavorite(uid, currentChat._id))
        setFavorite(false)
    }

    useEffect(() => {
        if (user.conversations && currentChat) {
            let c = user.conversations.filter(e => e.id === currentChat._id)
            c && c.favorite === true ? setFavorite(true) : setFavorite(false)
        }
    }, [user.conversations, currentChat])

    return (
        <>
            {currentChat.type === "dialog" &&
                <div className="conversation-box-top">
                    <div className="conversation-box-members">
                        <div className="conversation-img-container">
                            <div className="conversation-img" style={avatar(getMembers(currentChat, uid)[0].picture)}></div>
                        </div>
                        <div className="conversation-name">{getMembers(currentChat, uid)[0].pseudo}</div>
                    </div>
                    <ToolsMenu>
                        {isFavorite ? (
                            <div className="tools_choice" onClick={unfavorite}>Retirer des favoris</div>
                        ) : (
                            <div className="tools_choice" onClick={favorite}>Ajouter aux favoris</div>
                        )}
                        {currentChat.owner === uid && <div className="tools_choice" onClick={() => deleteConversation(currentChat)}>Supprimer la conversation</div>}
                    </ToolsMenu>
                </div>
            }
            {openConvModal &&
                <ConversationModal
                    uid={uid}
                    setOpen={setOpenConvModal}
                    open={openConvModal}
                    conversation={currentChat}
                    deleteConversation={deleteConversation}
                    leaveConversation={leaveConversation}
                    addNewMember={addNewMember}
                    friendsArr={friendsArr}
                />
            }
            {currentChat.type === "group" &&
                <div className="conversation-box-top">
                    <div className="conversation-box-members" onClick={() => setOpenConvModal(!openConvModal)}>
                        <div className="conversation-img-container">
                            {members.map((element, key) => {
                                return (
                                    <div className="conversation-img" key={key} style={avatar(element.picture)}></div>
                                )
                            })}
                        </div>
                        <div className="conversation-name">
                            {currentChat.members.length === 2 &&
                                members[0].pseudo
                            }
                            {currentChat.members.length === 3 &&
                                members[0].pseudo + ", " + members[1].pseudo
                            }
                            {currentChat.members.length === 4 &&
                                members[0].pseudo + ", " + members[1].pseudo + ", " + members[2].pseudo
                            }
                            {currentChat.members.length > 5 &&
                                members[0].pseudo + ", " + members[1].pseudo + ", " + members[2].pseudo + " et " + (members.length - 3) + " autres"
                            }
                        </div>
                    </div>
                    <ToolsMenu>
                        {isFavorite ? (
                            <div className="tools_choice" onClick={unfavorite}>Retirer des favoris</div>
                        ) : (
                            <div className="tools_choice" onClick={favorite}>Ajouter aux favoris</div>
                        )}
                        {currentChat.owner === uid && <div className="tools_choice" onClick={() => deleteConversation(currentChat)}>Supprimer la conversation</div>}
                    </ToolsMenu>
                </div>
            }
        </>
    )
}

export default ConversationHeader