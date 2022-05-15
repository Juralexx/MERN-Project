import React, { useEffect, useState } from 'react'
import { avatar } from '../tools/functions/useAvatar'
import { deleteConv, getMembers, leaveConversation, returnMembers } from './tools/function'
import { addFavorite, removeFavorite } from '../../actions/messenger.action'
import ConversationModal from './ConversationModal'
import ToolsMenu from '../tools/components/ToolsMenu'
import { IoTrashOutline } from 'react-icons/io5'
import { BsStar, BsStarFill } from 'react-icons/bs'
import { HiLogout } from 'react-icons/hi'

const ConversationHeader = ({ uid, user, websocket, currentChat, friendsArr, dispatch }) => {
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
            let conv = user.conversations.filter(e => e.id === currentChat._id)
            conv && conv.favorite === true ? setFavorite(true) : setFavorite(false)
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
                    <ToolsMenu placement="bottom">
                        {isFavorite ? (
                            <div className="tools_choice" onClick={unfavorite}><BsStarFill />Retirer des favoris</div>
                        ) : (
                            <div className="tools_choice" onClick={favorite}><BsStar />Ajouter aux favoris</div>
                        )}
                        {currentChat.owner === uid && <div className="tools_choice" onClick={() => deleteConv(currentChat, uid, websocket, dispatch)}><IoTrashOutline /> Supprimer la conversation</div>}
                    </ToolsMenu>
                </div>
            }
            {openConvModal &&
                <ConversationModal
                    uid={uid}
                    websocket={websocket}
                    setOpen={setOpenConvModal}
                    open={openConvModal}
                    conversation={currentChat}
                    leaveConversation={leaveConversation}
                    friendsArr={friendsArr}
                    dispatch={dispatch}
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
                        <div className="conversation-name">{returnMembers(members)}</div>
                    </div>
                    <ToolsMenu placement="bottom">
                        {isFavorite ? (
                            <div className="tools_choice" onClick={unfavorite}><BsStarFill />Retirer des favoris</div>
                        ) : (
                            <div className="tools_choice" onClick={favorite}><BsStar />Ajouter aux favoris</div>
                        )}
                        <div className="tools_choice" onClick={() => leaveConversation(currentChat, uid, uid, websocket, dispatch)}><HiLogout /> Quitter la conversation</div>
                        {currentChat.owner === uid &&
                            <div className="tools_choice" onClick={() => deleteConv(currentChat, uid, websocket, dispatch)}><IoTrashOutline /> Supprimer la conversation</div>
                        }
                    </ToolsMenu>
                </div>
            }
        </>
    )
}

export default ConversationHeader