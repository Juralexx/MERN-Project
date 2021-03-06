import { ACCEPT_FRIEND_REQUEST, DELETE_FRIEND, DELETE_NOTIFICATION, GET_USER, RECEIVE_ACCEPT_FRIEND_REQUEST, RECEIVE_CANCEL_FRIEND_REQUEST, RECEIVE_DELETE_FRIEND, RECEIVE_FRIEND_REQUEST, RECEIVE_REFUSE_FRIEND_REQUEST, REFUSE_FRIEND_REQUEST, RESET_NOTIFICATIONS, SET_NOTIFICATION_SEEN, UPDATE_EMAIL, UPDATE_THEME, UPDATE_USER } from "../actions/user.action";
import { DELETE_COVER_PICTURE, DELETE_UPLOADED_PICTURE, UPLOAD_COVER_PICTURE, UPLOAD_PICTURE } from "../actions/user.action.upload";
import { CANCEL_SENT_FRIEND_REQUEST, SEND_FRIEND_REQUEST } from "../actions/user.action";
import { ACCEPT_MEMBER_REQUEST, RECEIVE_CANCEL_MEMBER_REQUEST, RECEIVE_MEMBER_REQUEST, REFUSE_MEMBER_REQUEST, REMOVE_PROJECT_FROM_MEMBER } from "../actions/project.action";
import { ADD_FAVORITE_CONVERSATION, DELETE_CONVERSATION, RECEIVE_ADD_MEMBER_CONVERSATION, RECEIVE_CREATE_CONVERSATION, RECEIVE_REMOVE_MEMBER_CONVERSATION, REMOVE_FAVORITE_CONVERSATION, SET_LAST_MESSAGE_SEEN } from "../actions/messenger.action";

const initialState = {}

export default function userReducer(state = initialState, action) {
    const decrementNotifIfUpperZero = () => { if (state.unseen_notifications > 0) { return state.unseen_notifications - 1 } }

    switch (action.type) {
        case GET_USER:
            return action.payload

        case UPDATE_USER:
            return {
                ...state,
                name: action.payload.name,
                lastname: action.payload.lastname,
                work: action.payload.work,
                bio: action.payload.bio,
                location: action.payload.location,
                phone: action.payload.phone,
                networks: action.payload.networks
            }

        case UPLOAD_PICTURE:
            return {
                ...state,
                picture: action.payload,
            }
        case DELETE_UPLOADED_PICTURE:
            return {
                ...state,
                picture: action.payload
            }
        case UPLOAD_COVER_PICTURE:
            return {
                ...state,
                cover_picture: action.payload,
            }
        case DELETE_COVER_PICTURE:
            return {
                ...state,
                cover_picture: action.payload
            }
        case UPDATE_EMAIL:
            return {
                ...state,
                email: action.payload,
            }
        case UPDATE_THEME:
            return {
                ...state,
                theme: action.payload,
            }

        /**
         * NOTIFICATIONS
         */

        case RESET_NOTIFICATIONS:
            return {
                ...state,
                unseen_notifications: action.payload.notifications
            }
        case SET_NOTIFICATION_SEEN:
            let a = state.notifications.findIndex(notif => notif._id === action.payload.notificationId)
            state.notifications[a].seen = true
            return {
                ...state,
                notifications: state.notifications
            }
        case DELETE_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.filter(notif => notif._id !== action.payload.notificationId)
            }

        /**
         * FRIEND ACTIONS
         */

        case SEND_FRIEND_REQUEST:
            return {
                ...state,
                friend_request_sent: [{ friend: action.payload.friendId }, ...state.friend_request_sent]
            }
        case RECEIVE_FRIEND_REQUEST:
            return {
                ...state,
                notifications: [...state.notifications, action.payload.notification],
                unseen_notifications: state.unseen_notifications + 1
            }
        case CANCEL_SENT_FRIEND_REQUEST:
            return {
                ...state,
                friend_request_sent: state.friend_request_sent.filter(request => request.friend !== action.payload.friendId)
            }
        case RECEIVE_CANCEL_FRIEND_REQUEST:
            return {
                ...state,
                notifications: state.notifications.filter(element => element.type !== action.payload.type && element.requesterId !== action.payload.requesterId),
                unseen_notifications: decrementNotifIfUpperZero()
            }
        case ACCEPT_FRIEND_REQUEST:
            return {
                ...state,
                friends: [...state.friends, action.payload.friend],
                unseen_notifications: decrementNotifIfUpperZero()
            }
        case RECEIVE_ACCEPT_FRIEND_REQUEST:
            return {
                ...state,
                friends: [...state.friends, action.payload.friend]
            }
        case REFUSE_FRIEND_REQUEST:
            return {
                ...state,
                notifications: state.notifications.filter(element => element._id !== action.payload.notificationId),
                unseen_notifications: decrementNotifIfUpperZero()
            }
        case RECEIVE_REFUSE_FRIEND_REQUEST:
            return {
                ...state,
                friend_request_sent: state.friend_request_sent.filter(request => request.friend !== action.payload.friendId)
            }
        case DELETE_FRIEND:
            return {
                ...state,
                friends: state.friends.filter(f => f.friend !== action.payload.friendId)
            }

        /**
         * MEMBER REQUEST
         */

        case RECEIVE_MEMBER_REQUEST:
            return {
                ...state,
                notifications: [...state.notifications, action.payload.notification],
                unseen_notifications: state.unseen_notifications + 1
            }
        case RECEIVE_CANCEL_MEMBER_REQUEST:
            return {
                ...state,
                notifications: state.notifications.filter(element => element._id !== action.payload.notificationId),
                unseen_notifications: decrementNotifIfUpperZero()
            }

        case ACCEPT_MEMBER_REQUEST:
            return {
                ...state,
                unseen_notifications: decrementNotifIfUpperZero(),
                projects: [...state.projects, action.payload.projectId]
            }
        case REFUSE_MEMBER_REQUEST:
            return {
                ...state,
                notifications: state.notifications.filter(element => element._id !== action.payload.notificationId),
                unseen_notifications: decrementNotifIfUpperZero()
            }
        case REMOVE_PROJECT_FROM_MEMBER:
            return {
                ...state,
                projects: state.projects.filter(project => project !== action.payload.projectId),
            }

        /**
         * MESSENGER
         */
        case RECEIVE_CREATE_CONVERSATION:
            return {
                ...state,
                conversations: [...state.conversations, { id: action.payload.conversationId, last_message_seen: null, favorite: false }]
            }
        case DELETE_CONVERSATION:
            return {
                ...state,
                conversations: state.conversations.filter(conversation => conversation.id !== action.payload.conversationId)
            }
        case SET_LAST_MESSAGE_SEEN:
            let i = state.conversations.find(conversation => conversation.id === action.payload.conversationId)
            state.conversations[i] = action.payload.messageId
            return {
                ...state,
                conversations: state.conversations
            }
        case RECEIVE_ADD_MEMBER_CONVERSATION:
            return {
                ...state,
                conversations: [...state.conversations, action.payload.conversationId]
            }
        case RECEIVE_REMOVE_MEMBER_CONVERSATION:
            return {
                ...state,
                conversations: state.conversations.filter(conversation => conversation !== action.payload.conversationId)
            }
        case ADD_FAVORITE_CONVERSATION:
            let favorite = state.conversations.findIndex(conversation => conversation.id === action.payload.conversationId)
            state.conversations[favorite] = true
            return {
                ...state,
                conversations: state.conversations,
                favorite_conversations: state.favorite_conversations.push(action.payload.conversationId)
            }
        case REMOVE_FAVORITE_CONVERSATION:
            let unfavorite = state.conversations.findIndex(conversation => conversation.id === action.payload.conversationId)
            state.conversations[unfavorite] = false
            return {
                ...state,
                conversations: state.conversations,
                favorite_conversations: state.favorite_conversations.filter(item => item !== action.payload.conversationId)
            }

        default:
            return state;
    }
}