import { ADD_EMOJI, ADD_MEMBER_CONVERSATION, DELETE_MESSAGE, GET_CONVERSATION, POST_MESSAGE, RECEIVE_POST_MESSAGE, REMOVE_EMOJI, REMOVE_MEMBER_CONVERSATION, UPDATE_CONVERSATION_OWNER, UPDATE_MESSAGE, DELETE_FILE, UPLOAD_CONVERSATION_PICTURE, CUSTOMIZE_USER_PSEUDO, UPDATE_CONVERSATION_INFOS } from "../actions/messenger.action";

const initialState = {}

export default function messengerReducer(state = initialState, action) {

    const findMessage = (messageId) => {
        let index = state.messages.findIndex(message => message._id === messageId)
        return index
    }

    switch (action.type) {
        case GET_CONVERSATION:
            return action.payload

        case UPLOAD_CONVERSATION_PICTURE:
            return {
                ...state,
                picture: action.payload,
            }
        case UPDATE_CONVERSATION_INFOS:
            return {
                ...state,
                name: action.payload.name,
                description: action.payload.description,
            }
        case UPDATE_CONVERSATION_OWNER:
            return {
                ...state,
                owner: action.payload.owner,
            }
        case CUSTOMIZE_USER_PSEUDO:
            let u = state.members.findIndex(m => m._id === action.payload.userId)
            state.members[u].custom_pseudo = action.payload.pseudo
            return {
                ...state,
                members: state.members
            }
        case ADD_MEMBER_CONVERSATION:
            return {
                ...state,
                members: [...state.members, action.payload.newMember]
            }
        case REMOVE_MEMBER_CONVERSATION:
            return {
                ...state,
                members: state.members.filter(member => member._id !== action.payload.memberId)
            }
        case POST_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload.message],
                files: [...state.files, action.payload.message.files]
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
                messages: state.messages.filter(message => message._id !== action.payload.messageId),
                files: state.files.filter(file => file.messageId !== action.payload.messageId)
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
        case DELETE_FILE:
            let h = findMessage(action.payload.messageId)
            let files = state.messages[h].files.filter(file => file._id !== action.payload.file._id)
            state.messages[h].files = files
            return {
                ...state,
                messages: state.messages,
                files: state.files.filter(file => file.messageId !== action.payload.messageId && file.id !== action.payload.file._id)
            }

        default:
            return state;
    }
}