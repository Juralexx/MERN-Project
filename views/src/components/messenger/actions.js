import { addFavorite, addMember, deleteConversation, deleteFile, deleteMessage, removeFavorite, removeMember, setLastConversationSeen } from '../../reducers/messenger.action';
import axios from 'axios';
import { otherMembersIDs } from './functions';

async function doesLocationIncludesParam(param, redirection) {
    if (!window.location.pathname.includes(param)) {
        return window.location.pathname = redirection
    }
}

/**
 * Delete conversation
 * @param {*} conversation Conversation object to delete
 * @param {*} conversations All conversation of the current user
 * @param {*} user Current user
 * @param {*} websocket Websocket
 * @param {*} dispatch Redux dispatch function
 */

export const deleteConv = async (conversation, conversations, user, websocket, dispatch) => {
    let redirectionID
    if (user?.last_conversation && user.last_conversation === conversation._id) {
        if (conversations.allConversations[0]._id === conversation._id) {
            redirectionID = conversations.allConversations[1]._id
        } else {
            redirectionID = conversations.allConversations[0]._id
        }
    } else {
        redirectionID = user.last_conversation
    }
    dispatch(setLastConversationSeen(user._id, redirectionID))
    await doesLocationIncludesParam(conversation._id, '/messenger/' + redirectionID)
    otherMembersIDs(conversation, user._id).map(memberId => {
        return websocket.current.emit("deleteConversation", {
            receiverId: memberId,
            conversationId: conversation._id,
        })
    })
    dispatch(deleteConversation(conversation._id))
}

/**
 * Leave conversation
 * @param {*} conversation Conversation object to leave
 * @param {*} memberId Member ID that leaves conversation
 * @param {*} uid Current user ID
 * @param {*} websocket Websocket
 * @param {*} dispatch Redux dispatch function
 */

export const leaveConversation = async (conversation, memberId, uid, websocket, dispatch) => {
    await doesLocationIncludesParam(conversation._id, '/messenger/' + conversation._id)
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
 * Add member to conversation
 * @param {*} conversation Conversation to add member to
 * @param {*} member Member to add
 * @param {*} user Current user
 * @param {*} websocket Websocket
 * @param {*} dispatch Redux dispatch function
 */

export const addNewMember = async (conversation, member, user, websocket, dispatch) => {
    await doesLocationIncludesParam(conversation._id, '/messenger/' + conversation._id)
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
 * Remove message from conversation
 * @param {*} message Message to remove
 * @param {*} conversation Conversation to remove message from
 * @param {*} uid Current user ID
 * @param {*} websocket Websocket
 * @param {*} dispatch Redux dispatch function
 */

export const removeMessage = async (message, conversation, uid, websocket, dispatch) => {
    await doesLocationIncludesParam(conversation._id, '/messenger/' + conversation._id)
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
 * Delete file from message
 * @param {*} file File to delete
 * @param {*} user Current user
 * @param {*} websocket Websocket
 * @param {*} conversation Current conversation
 * @param {*} messageId Message ID from file to delete
 * @param {*} dispatch Redux dispatch function
 */

export const deleteFiles = async (file, user, websocket, conversation, messageId, dispatch) => {
    await doesLocationIncludesParam(conversation._id, '/messenger/' + conversation._id)
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

/**
 * Check if current conversation is in user favorite conversations
 * @param {*} conversations All user conversations
 * @param {*} currentConversation Current conversation
 */

export const isInFavorites = (conversations, currentConversation) => {
    let conversation = conversations.filter(conv => conv.id === currentConversation._id)
    if (conversation.length > 0) {
        if (conversation[0]?.favorite) {
            return true
        } else return false
    }
}

/**
 * Add conversation to favorites
 * @param {*} conversationId Conversation ID to add to favorites
 * @param {*} uid Current user ID
 * @param {*} dispatch Redux dispatch function
 */

export const setFavorite = (conversationId, uid, dispatch) => {
    dispatch(addFavorite(uid, conversationId))
}

/**
 * Remove conversation from favorites
 * @param {*} conversationId Conversation ID to remove from favorites
 * @param {*} uid Current user ID
 * @param {*} dispatch Redux dispatch function
 */

export const setUnfavorite = (conversationId, uid, dispatch) => {
    dispatch(removeFavorite(uid, conversationId))
}