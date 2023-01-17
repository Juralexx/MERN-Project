import axios from "axios";

/**
 * Get conversation
 */

export const GET_CONVERSATION = "GET_CONVERSATION"

export const getConversation = (conversationId) => {
    return async (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/conversation/${conversationId}`)
            .then(res => {
                dispatch({ type: GET_CONVERSATION, payload: res.data })
                return res
            })
            .catch(err => console.error(err))
    }
}

/**
 * Receive conversation creation
 */

export const RECEIVE_CREATE_CONVERSATION = "RECEIVE_CREATE_CONVERSATION"

export const receiveCreateConversation = (conversationId) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_CREATE_CONVERSATION, payload: { conversationId } })
    }
}

/**
 * Upload conversation image
 */

export const UPLOAD_CONVERSATION_PICTURE = "UPLOAD_CONVERSATION_PICTURE"

export const uploadConversationPicture = (conversationId, picture) => {
    return async (dispatch) => {
        return await axios
            .put(`${process.env.REACT_APP_API_URL}api/conversation/${conversationId}/upload`, picture)
            .then(res => {
                console.log(res.data.picture)
                dispatch({ type: UPLOAD_CONVERSATION_PICTURE, payload: res.data.picture })
            })
            .catch(err => console.log(err))
    }
}

/**
 * Receive upload conversation image
 */

export const receiveUploadConversationPicture = (picture) => {
    return async (dispatch) => {
        dispatch({ type: UPLOAD_CONVERSATION_PICTURE, payload: { picture } })
    }
}

/**
 * Remove conversation image
 */

export const REMOVE_CONVERSATION_PICTURE = "REMOVE_CONVERSATION_PICTURE"

export const removeConversationPicture = (conversationId) => {
    return async (dispatch) => {
        return await axios
            .put(`${process.env.REACT_APP_API_URL}api/conversation/${conversationId}/upload/delete/`)
            .then(() => {
                dispatch({ type: REMOVE_CONVERSATION_PICTURE, payload: '' })
            })
            .catch(err => console.log(err))
    }
}

/**
 * Receive remove conversation image
 */

export const receiveRemoveConversationPicture = () => {
    return async (dispatch) => {
        dispatch({ type: REMOVE_CONVERSATION_PICTURE, payload: '' })
    }
}

/**
 * Update conversation owner
 */

export const UPDATE_CONVERSATION_OWNER = "UPDATE_CONVERSATION_OWNER"

export const updateConversationOwner = (conversationId, owner) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/conversation/${conversationId}`,
            data: { owner }
        })
            .then(() => {
                dispatch({ type: UPDATE_CONVERSATION_OWNER, payload: { owner } })
            })
            .catch(err => console.error(err))
    }
}

export const receiveUpdateConversationOwner = (owner) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_CONVERSATION_OWNER, payload: { owner } })
    }
}

/**
* Update conversation name and description
*/

export const UPDATE_CONVERSATION_INFOS = "UPDATE_CONVERSATION_INFOS"

export const updateConversationInfos = (conversationId, name, description) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/conversation/${conversationId}`,
            data: { name, description }
        })
            .then(() => {
                dispatch({ type: UPDATE_CONVERSATION_INFOS, payload: { name, description } })
            })
            .catch(err => console.error(err))
    }
}

export const receiveUpdateConversationInfos = (name, description) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_CONVERSATION_INFOS, payload: { name, description } })
    }
}

/**
* Update conversation name
*/

export const CUSTOMIZE_USER_PSEUDO = "CUSTOMIZE_USER_PSEUDO"

export const customizeUserPseudo = (conversationId, userId, pseudo) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/conversation/${conversationId}/pseudo/update/${userId}`,
            data: { pseudo }
        })
            .then(() => {
                dispatch({ type: CUSTOMIZE_USER_PSEUDO, payload: { userId, pseudo } })
            })
            .catch(err => console.error(err))
    }
}

export const receiveCustomizeUserPseudo = (userId, pseudo) => {
    return async (dispatch) => {
        dispatch({ type: CUSTOMIZE_USER_PSEUDO, payload: { userId, pseudo } })
    }
}

/**
 * Delete conversation
 */

export const DELETE_CONVERSATION = "DELETE_CONVERSATION"

export const deleteConversation = (conversationId) => {
    return async (dispatch) => {
        return axios
            .delete(`${process.env.REACT_APP_API_URL}api/conversation/${conversationId}`)
            .then(() => {
                dispatch({ type: DELETE_CONVERSATION, payload: { conversationId } })
            })
            .catch(err => console.error(err))
    }
}

export const RECEIVE_DELETE_CONVERSATION = "RECEIVE_DELETE_CONVERSATION"

export const receiveDeleteConversation = (conversationId) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_CONVERSATION, payload: { conversationId } })
    }
}

/**
 * Add member to conversation
 */

export const ADD_MEMBER_CONVERSATION = "ADD_MEMBER_CONVERSATION"

export const addMember = (conversationId, newMember) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/conversation/${conversationId}/members/add/`,
            data: { newMember }
        })
            .then(() => {
                dispatch({ type: ADD_MEMBER_CONVERSATION, payload: { newMember } })
            })
            .catch(err => console.error(err))
    }
}

export const receiveNewMember = (newMember) => {
    return async (dispatch) => {
        dispatch({ type: ADD_MEMBER_CONVERSATION, payload: { newMember } })
    }
}

export const RECEIVE_ADD_MEMBER_CONVERSATION = "RECEIVE_ADD_MEMBER_CONVERSATION"

export const receiveAddMember = (conversationId) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_ADD_MEMBER_CONVERSATION, payload: { conversationId } })
    }
}

/**
 * Remove member from conversation
 */
export const REMOVE_MEMBER_CONVERSATION = "REMOVE_MEMBER_CONVERSATION"

export const removeMember = (conversationId, memberId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/conversation/${conversationId}/members/remove/`,
            data: { memberId }
        })
            .then(() => {
                dispatch({ type: REMOVE_MEMBER_CONVERSATION, payload: { conversationId, memberId } })
            })
            .catch(err => console.error(err))
    }
}

export const receiveRemovedMember = (memberId) => {
    return async (dispatch) => {
        dispatch({ type: REMOVE_MEMBER_CONVERSATION, payload: { memberId } })
    }
}

export const RECEIVE_REMOVE_MEMBER_CONVERSATION = "RECEIVE_REMOVE_MEMBER_CONVERSATION"

export const receiveRemoveMember = (conversationId) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_REMOVE_MEMBER_CONVERSATION, payload: { conversationId } })
    }
}

/**
 * Post new message
 */

export const POST_MESSAGE = "POST_MESSAGE"

export const sendMessage = (conversationId, message) => {
    return async (dispatch) => {
        await axios
            .put(`${process.env.REACT_APP_API_URL}api/conversation/${conversationId}/messages/add/`, { message: message })
            .then(res => {
                dispatch({ type: POST_MESSAGE, payload: { message } })
            })
            .catch(err => console.error(err))
    }
}

export const RECEIVE_POST_MESSAGE = "RECEIVE_POST_MESSAGE"

export const receiveNewMessage = (message) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_POST_MESSAGE, payload: { message } })
    }
}

/**
 * Update message
 */

export const UPDATE_MESSAGE = "UPDATE_MESSAGE"

export const updateMessage = (conversationId, messageId, text) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/conversation/${conversationId}/messages/update/`,
            data: { messageId, text }
        })
            .then(() => {
                dispatch({ type: UPDATE_MESSAGE, payload: { messageId, text } })
            })
            .catch(err => console.error(err))
    }
}

export const receiveUpdateMessage = (messageId, text) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_MESSAGE, payload: { messageId, text } })
    }
}

/**
 * Delete message
 */

export const DELETE_MESSAGE = "DELETE_MESSAGE"

export const deleteMessage = (conversationId, messageId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/conversation/${conversationId}/messages/remove/${messageId}`,
            data: { messageId }
        })
            .then(() => {
                dispatch({ type: DELETE_MESSAGE, payload: { messageId } })
            })
            .catch(err => console.error(err))
    }
}

export const receiveDeleteMessage = (messageId) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_MESSAGE, payload: { messageId } })
    }
}

/**
 * Set the last message user seen
 */

export const SET_LAST_MESSAGE_SEEN = "SET_LAST_MESSAGE_SEEN"

export const setLastMessageSeen = (userId, conversationId, messageId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/${userId}/conversations/last-message-seen/`,
            data: { conversationId, messageId }
        })
            .then(() => {
                dispatch({ type: SET_LAST_MESSAGE_SEEN, payload: { conversationId, messageId } })
            })
            .catch(err => console.error(err))
    }
}

/**
 * Set the last conversation user seen
 */

export const SET_LAST_CONVERSATION_SEEN = "SET_LAST_CONVERSATION_SEEN"

export const setLastConversationSeen = (userId, conversationId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/${userId}/conversations/last-conversation-seen/`,
            data: { conversationId }
        })
            .then(() => {
                dispatch({ type: SET_LAST_CONVERSATION_SEEN, payload: { conversationId } })
            })
            .catch(err => console.error(err))
    }
}

/**
 * Add emoji to message
 */

export const ADD_EMOJI = "ADD_EMOJI"

export const addEmoji = (conversationId, messageId, emoji) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/conversation/${conversationId}/emojis/add/`,
            data: { messageId, emoji }
        })
            .then(() => {
                dispatch({ type: ADD_EMOJI, payload: { messageId, emoji } })
            })
            .catch(err => console.error(err))
    }
}

export const receiveAddEmoji = (messageId, emoji) => {
    return async (dispatch) => {
        dispatch({ type: ADD_EMOJI, payload: { messageId, emoji } })
    }
}

/**
 * Remove uploaded file
 */

export const DELETE_FILE = "DELETE_FILE"

export const deleteFile = (conversationId, messageId, file) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/conversation/${conversationId}/messages/upload/delete/${messageId}`,
            data: { file }
        })
            .then(() => {
                dispatch({ type: DELETE_FILE, payload: { messageId, file } })
            })
            .catch(err => console.error(err))
    }
}

export const receiveRemoveFile = (messageId, file) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_FILE, payload: { messageId, file } })
    }
}

/**
 * Remove emoji from message
 */

export const REMOVE_EMOJI = "REMOVE_EMOJI"

export const removeEmoji = (conversationId, messageId, emojiId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/conversation/${conversationId}/emojis/remove/`,
            data: { messageId, emojiId }
        })
            .then(() => {
                dispatch({ type: REMOVE_EMOJI, payload: { messageId, emojiId } })
            })
            .catch(err => console.error(err))
    }
}

export const receiveRemoveEmoji = (messageId, emojiId) => {
    return async (dispatch) => {
        dispatch({ type: REMOVE_EMOJI, payload: { messageId, emojiId } })
    }
}

/**
 * Add conversation to favorites
 */

export const ADD_FAVORITE_CONVERSATION = "ADD_FAVORITE_CONVERSATION"

export const addFavorite = (userId, conversationId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/${userId}/conversations/favorites/add/`,
            data: { conversationId }
        })
            .then(() => {
                dispatch({ type: ADD_FAVORITE_CONVERSATION, payload: { conversationId } })
            })
            .catch(err => console.error(err))
    }
}

/**
 * Add conversation to favorites
 */

export const REMOVE_FAVORITE_CONVERSATION = "REMOVE_FAVORITE_CONVERSATION"

export const removeFavorite = (userId, conversationId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/${userId}/conversations/favorites/remove/`,
            data: { conversationId }
        })
            .then(() => {
                dispatch({ type: REMOVE_FAVORITE_CONVERSATION, payload: { conversationId } })
            })
            .catch(err => console.error(err))
    }
}