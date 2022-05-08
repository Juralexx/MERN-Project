import axios from "axios";

export const GET_CONVERSATION = "GET_CONVERSATION"
export const CREATE_CONVERSATION = "CREATE_CONVERSATION"
export const RECEIVE_CREATE_CONVERSATION = "RECEIVE_CREATE_CONVERSATION"
export const UPDATE_CONVERSATION = "UPDATE_CONVERSATION"
export const RECEIVE_UPDATE_CONVERSATION = "RECEIVE_UPDATE_CONVERSATION"
export const DELETE_CONVERSATION = "DELETE_CONVERSATION"
export const RECEIVE_DELETE_CONVERSATION = "RECEIVE_DELETE_CONVERSATION"

export const ADD_MEMBER_CONVERSATION = "ADD_MEMBER_CONVERSATION"
export const RECEIVE_ADD_MEMBER_CONVERSATION = "RECEIVE_ADD_MEMBER_CONVERSATION"
export const REMOVE_MEMBER_CONVERSATION = "REMOVE_MEMBER_CONVERSATION"
export const RECEIVE_REMOVE_MEMBER_CONVERSATION = "RECEIVE_REMOVE_MEMBER_CONVERSATION"

export const POST_MESSAGE = "POST_MESSAGE"
export const RECEIVE_POST_MESSAGE = "RECEIVE_POST_MESSAGE"
export const UPDATE_MESSAGE = "UPDATE_MESSAGE"
export const RECEIVE_UPDATE_MESSAGE = "RECEIVE_UPDATE_MESSAGE"
export const DELETE_MESSAGE = "DELETE_MESSAGE"
export const RECEIVE_DELETE_MESSAGE = "RECEIVE_DELETE_MESSAGE"
export const SET_LAST_MESSAGE_SEEN = "SET_LAST_MESSAGE_SEEN"
export const ADD_EMOJI = "ADD_EMOJI"
export const RECEIVE_ADD_EMOJI = "RECEIVE_ADD_EMOJI"
export const REMOVE_EMOJI = "REMOVE_EMOJI"
export const RECEIVE_REMOVE_EMOJI = "RECEIVE_REMOVE_EMOJI"

/**
 * Get conversation
 */

export const getConversation = (conversationId) => {
    return async (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/conversation/${conversationId}`)
            .then(res => {
                dispatch({ type: GET_CONVERSATION, payload: res.data })
            })
            .catch(err => console.error(err))
    }
}

/**
 * Get conversation
 */

export const createConversation = (conversation) => {
    return async (dispatch) => {
        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/conversation/`,
            data: {
                type: conversation.type,
                members: conversation.members,
                name: conversation.name,
                description: conversation.description,
                owner: conversation.owner,
                creator: conversation.creator,
                waiter: conversation.waiter,
                messages: conversation.messages
            }
        })
            .then(res => {
                console.log(res)
                dispatch({ type: CREATE_CONVERSATION, payload: res.data })
            })
            .catch(err => console.error(err))
    }
}

export const receiveCreateConversation = (conversationId) => {
    return async (dispatch) => {
         dispatch({ type: RECEIVE_CREATE_CONVERSATION, payload: { conversationId } })
    }
}

/**
 * Update conversation
 */

export const updateConversation = (conversationId, description, name, owner, waiter, last_message) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/conversation/${conversationId}`,
            data: { description, name, owner, waiter, last_message }
        })
            .then(() => {
                dispatch({ type: UPDATE_CONVERSATION, payload: { description, name, owner, waiter, last_message } })
            })
            .catch(err => console.error(err))
    }
}

export const receiveUpdateConversation = (description, name, owner, waiter, last_message) => {
    return async (dispatch) => {
         dispatch({ type: UPDATE_CONVERSATION, payload: { description, name, owner, waiter, last_message } })
    }
}

/**
 * Delete conversation
 */

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

export const receiveDeleteConversation = (conversationId) => {
    return async (dispatch) => {
         dispatch({ type: DELETE_CONVERSATION, payload: { conversationId } })
    }
}

/**
 * Add member to conversation
 */

 export const addMember = (conversationId, newMember) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/conversation/${conversationId}/add-member`,
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

export const receiveAddMember = (conversationId) => {
    return async (dispatch) => {
         dispatch({ type: RECEIVE_ADD_MEMBER_CONVERSATION, payload: { conversationId } })
    }
}

/**
 * Remove member from conversation
 */

 export const removeMember = (conversationId, memberId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/conversation/${conversationId}/remove-member`,
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

export const receiveRemoveMember = (conversationId) => {
    return async (dispatch) => {
         dispatch({ type: RECEIVE_REMOVE_MEMBER_CONVERSATION, payload: { conversationId } })
    }
}

/**
 * Post new message
 */

export const sendMessage = (conversationId, message) => {
    return async (dispatch) => {
        return axios
            .post(`${process.env.REACT_APP_API_URL}api/conversation/${conversationId}`, message)
            .then(res => {
                console.log(res)
                dispatch({ type: POST_MESSAGE, payload: res.data })
            })
            .catch(err => console.error(err))
    }
}

export const receiveNewMessage = (message) => {
    return async (dispatch) => {
         dispatch({ type: RECEIVE_POST_MESSAGE, payload: { message } })
    }
}

/**
 * Update message
 */

export const updateMessage = (conversationId, messageId, text) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/conversation/${conversationId}/update-message/`,
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

 export const deleteMessage = (conversationId, messageId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/conversation/${conversationId}/delete-message/`,
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

 export const setLastMessageSeen = (userId, conversationId, messageId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/conversation/last-message-seen/` + userId,
            data: { conversationId, messageId }
        })
            .then(() => {
                dispatch({ type: SET_LAST_MESSAGE_SEEN, payload: { conversationId, messageId } })
            })
            .catch(err => console.error(err))
    }
}

/**
 * Add emoji to message
 */

 export const addEmoji = (conversationId, messageId, emoji) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/conversation/${conversationId}/add-emoji/`,
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
 * Remove emoji from message
 */

 export const removeEmoji = (conversationId, messageId, emoji) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/conversation/${conversationId}/remove-emoji/`,
            data: { messageId, emoji }
        })
            .then(() => {
                dispatch({ type: REMOVE_EMOJI, payload: { messageId, emoji } })
            })
            .catch(err => console.error(err))
    }
}

export const receiveRemoveEmoji = (messageId, emoji) => {
    return async (dispatch) => {
         dispatch({ type: REMOVE_EMOJI, payload: { messageId, emoji } })
    }
}