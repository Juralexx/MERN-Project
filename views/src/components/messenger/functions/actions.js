import { addFavorite, addMember, deleteConversation, deleteFile, deleteMessage, removeFavorite, removeMember } from '../../../actions/messenger.action';
import axios from 'axios';
import { otherMembersIDs } from './function';

/**
* Delete conversation
 */

 export const deleteConv = async (conversation, uid, websocket, dispatch, isParam) => {
    await isParam(conversation._id, '/messenger/' + conversation._id)
    otherMembersIDs(conversation, uid).map(memberId => {
        return websocket.current.emit("deleteConversation", {
            receiverId: memberId,
            conversationId: conversation._id,
        })
    })
    dispatch(deleteConversation(conversation._id))
}

/**
 * Leave conversation
 */

export const leaveConversation = async (conversation, memberId, uid, websocket, dispatch, isParam) => {
    await isParam(conversation._id, '/messenger/' + conversation._id)
    dispatch(removeMember(conversation._id, memberId))
    otherMembersIDs(conversation, uid).map(member => {
        return websocket.current.emit("removeConversationMember", {
            receiverId: member,
            conversationId: conversation._id,
            memberId: memberId,
        })
    })
    return websocket.current.emit("leaveConversation", {
        receiverId: memberId,
        conversationId: conversation._id,
    })
}

/**
 * Add onversation member
 */

export const addNewMember = async (conversation, member, user, websocket, dispatch, isParam) => {
    await isParam(conversation._id, '/messenger/' + conversation._id)
    let newMember = {
        id: member._id,
        pseudo: member.pseudo,
        picture: member.picture,
        date: new Date().toISOString(),
        requester: user._id,
        requester_pseudo: user.pseudo
    }
    dispatch(addMember(conversation._id, newMember))
    otherMembersIDs(conversation, user._id).map(member => {
        return websocket.current.emit("addConversationMember", {
            receiverId: member,
            conversationId: conversation._id,
            newMember: newMember,
        })
    })
    return websocket.current.emit("joinConversation", {
        receiverId: newMember._id,
        conversationId: conversation._id,
    })
}

/**
 * Remove message
 */

export const removeMessage = async (message, conversation, uid, websocket, dispatch, isParam) => {
    await isParam(conversation._id, '/messenger/' + conversation._id)
    otherMembersIDs(conversation, uid).map(memberId => {
        return websocket.current.emit("deleteMessage", {
            receiverId: memberId,
            conversationId: conversation._id,
            messageId: message._id
        })
    })
    dispatch(deleteMessage(conversation._id, message._id))
}

/**
 * Delete file
 */

export const deleteFiles = async (file, user, websocket, conversation, messageId, dispatch, isParam) => {
    await isParam(conversation._id, '/messenger/' + conversation._id)
    let message = conversation.messages.find(mess => mess._id === messageId)
    otherMembersIDs(conversation, user._id).map(memberId => {
        return websocket.current.emit("deleteFile", {
            receiverId: memberId,
            conversationId: conversation._id,
            messageId: message._id,
            file: file
        })
    })
    dispatch(deleteFile(conversation._id, message._id, file))
    if (message.text) {
        if (message.text.length === 0 && message.files.length - 1 <= 0) {
            removeMessage(message, conversation, user._id, websocket, dispatch)
        }
    } else {
        const fecthMessage = async () => {
            await axios.get(`${process.env.REACT_APP_API_URL}api/conversation/${conversation._id}/${message}`)
                .then(res => {
                    if (res.data.text.length === 0 && res.data.files.length - 1 <= 0) {
                        removeMessage(message, conversation, user._id, websocket, dispatch)
                    }
                })
        }
        fecthMessage()
    }
}

export const setFavorite = (conversationId, uid, dispatch) => {
    dispatch(addFavorite(uid, conversationId))
}

export const setUnfavorite = (conversationId, uid, dispatch) => {
    dispatch(removeFavorite(uid, conversationId))
}