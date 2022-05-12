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
                waiter: action.payload.waiter,
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
            state.messages[findMessage(action.payload.messageId)].text = action.payload.text
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
            state.messages[findMessage(action.payload.messageId)].emojis.push(action.payload.emoji)
            return {
                ...state,
                messages: state.messages
            }
        case REMOVE_EMOJI:
            state.messages[findMessage(action.payload.messageId)].emojis.filter(emoji => emoji._id !== action.payload.emoji._id)
            return {
                ...state,
                messages: state.messages
            }

        default:
            return state;
    }
}