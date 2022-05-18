import { ADD_EMOJI, ADD_MEMBER_CONVERSATION, DELETE_MESSAGE, GET_CONVERSATION, POST_MESSAGE, RECEIVE_POST_MESSAGE, REMOVE_EMOJI, REMOVE_MEMBER_CONVERSATION, UPDATE_CONVERSATION, UPDATE_MESSAGE } from "../actions/messenger.action";

const initialState = {}

export default function messengerReducer(state = initialState, action) {

    const findMessage = (messageId) => {
        let index = state.messages.findIndex(message => message._id === messageId)
        return index
    }

    switch (action.type) {
        case GET_CONVERSATION:
            return action.payload

        case UPDATE_CONVERSATION:
            return {
                ...state,
                description: action.payload.description,
                name: action.payload.name,
                owner: action.payload.owner,
                last_message: action.payload.last_message,
            }
        case ADD_MEMBER_CONVERSATION:
            return {
                ...state,
                members: [...state.members, action.payload.newMember]
            }
        case REMOVE_MEMBER_CONVERSATION:
            return {
                ...state,
                members: state.members.filter(member => member !== action.payload.memberId)
            }
        case POST_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload.message]
            }
        case RECEIVE_POST_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload.message]
            }
        case UPDATE_MESSAGE:
            let updated = state.messages[findMessage(action.payload.messageId)]
            updated.text = action.payload.text
            updated.modified = true
            return {
                ...state,
                messages: state.messages
            }
        case DELETE_MESSAGE:
            return {
                ...state,
                messages: state.messages.filter(message => message._id !== action.payload.messageId)
            }
        case ADD_EMOJI:
            let i = findMessage(action.payload.messageId)
            state.messages[i].emojis.push(action.payload.emoji)
            return {
                ...state,
                messages: state.messages
            }
        case REMOVE_EMOJI:
            let j = findMessage(action.payload.messageId)
            let emojis = state.messages[j].emojis.filter(emoji => emoji._id !== action.payload.emojiId)
            state.messages[j].emojis = emojis
            return {
                ...state,
                messages: state.messages
            }

        default:
            return state;
    }
}