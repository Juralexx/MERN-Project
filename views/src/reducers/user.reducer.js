import { ACCEPT_CONTACT_REQUEST, CANCEL_MEMBER_REQUEST_FROM_USER, DELETE_CONTACT, DELETE_NOTIFICATION, GET_USER, RECEIVE_ACCEPT_CONTACT_REQUEST, RECEIVE_CANCEL_CONTACT_REQUEST, RECEIVE_CONTACT_REQUEST, RECEIVE_REFUSE_CONTACT_REQUEST, REFUSE_CONTACT_REQUEST, REFUSE_MEMBER_REQUEST_FROM_USER, RESET_NOTIFICATIONS, SEND_MEMBER_REQUEST_FROM_USER, SET_NOTIFICATION_SEEN, UPDATE_EMAIL, UPDATE_THEME, UPDATE_USER } from "./user.action";
import { DELETE_COVER_PICTURE, DELETE_UPLOADED_PICTURE, UPLOAD_COVER_PICTURE, UPLOAD_PICTURE } from "./user.action.upload";
import { CANCEL_SENT_CONTACT_REQUEST, SEND_CONTACT_REQUEST } from "./user.action";
import { RECEIVE_CANCEL_MEMBER_REQUEST_FROM_PROJECT, RECEIVE_MEMBER_REQUEST_FROM_PROJECT, RECEIVE_REFUSE_MEMBER_REQUEST_FROM_PROJECT, REMOVE_PROJECT_FROM_MEMBER } from "./project.action";
import { ADD_FAVORITE_CONVERSATION, DELETE_CONVERSATION, RECEIVE_ADD_MEMBER_CONVERSATION, RECEIVE_CREATE_CONVERSATION, RECEIVE_REMOVE_MEMBER_CONVERSATION, REMOVE_FAVORITE_CONVERSATION, SET_LAST_CONVERSATION_SEEN, SET_LAST_MESSAGE_SEEN } from "./messenger.action";

const initialState = {}

export default function userReducer(state = initialState, action) {
    //const decrementNotifIfUpperZero = () => { if (state.unseen_notifications > 0) { return state.unseen_notifications - 1 } }

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
            let notificationIndex = state.notifications.findIndex(notification => notification._id === action.payload.notificationId)
            state.notifications[notificationIndex].seen = true
            return {
                ...state,
                notifications: state.notifications
            }
        case DELETE_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.filter(notification => notification._id !== action.payload.notificationId)
            }

        /**
         * CONTACTS ACTIONS
         */

        case SEND_CONTACT_REQUEST:
            return {
                ...state,
                contact_request_sent: [{ contact: action.payload.contactId }, ...state.contact_request_sent]
            }
        case RECEIVE_CONTACT_REQUEST:
            return {
                ...state,
                notifications: [action.payload.notification, ...state.notifications],
                unseen_notifications: state.unseen_notifications + 1
            }
        case CANCEL_SENT_CONTACT_REQUEST:
            return {
                ...state,
                contact_request_sent: state.contact_request_sent.filter(request => request.contact !== action.payload.contactId)
            }
        case RECEIVE_CANCEL_CONTACT_REQUEST:
            return {
                ...state,
                notifications: state.notifications.filter(element => element.type !== action.payload.type && element.requesterId !== action.payload.requesterId),
                unseen_notifications: state.unseen_notifications > 0 ? state.unseen_notifications - 1 : 0
            }
        case ACCEPT_CONTACT_REQUEST:
            return {
                ...state,
                contacts: [...state.contacts, action.payload.contact],
                unseen_notifications: state.unseen_notifications > 0 ? state.unseen_notifications - 1 : 0
            }
        case RECEIVE_ACCEPT_CONTACT_REQUEST:
            return {
                ...state,
                contacts: [...state.contacts, action.payload.contact]
            }
        case REFUSE_CONTACT_REQUEST:
            return {
                ...state,
                notifications: state.notifications.filter(element => element._id !== action.payload.notificationId),
                unseen_notifications: state.unseen_notifications > 0 ? state.unseen_notifications - 1 : 0
            }
        case RECEIVE_REFUSE_CONTACT_REQUEST:
            return {
                ...state,
                contact_request_sent: state.contact_request_sent.filter(request => request.contact !== action.payload.contactId)
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(f => f.contact !== action.payload.contactId)
            }

        /**
         * MEMBER REQUEST FROM PROJECT
         */

        case RECEIVE_MEMBER_REQUEST_FROM_PROJECT:
            return {
                ...state,
                member_request: [...state.member_request, action.payload.request],
                notifications: [...state.notifications, action.payload.notification],
                unseen_notifications: state.unseen_notifications + 1
            }
        case RECEIVE_CANCEL_MEMBER_REQUEST_FROM_PROJECT:
            return {
                ...state,
                member_request: state.member_request.filter(request => request._id !== action.payload.requestId),
                notifications: state.notifications.filter(notif => notif._id !== action.payload.notificationId),
                unseen_notifications: state.unseen_notifications > 0 ? state.unseen_notifications - 1 : 0
            }

        case RECEIVE_REFUSE_MEMBER_REQUEST_FROM_PROJECT:
            return {
                ...state,
                member_request_sent: state.member_request_sent.filter(request => request._id !== action.payload.requestId)
            }

        /**
         * MEMBER REQUEST FROM PROJECT
         */

        case SEND_MEMBER_REQUEST_FROM_USER:
            return {
                ...state,
                member_request_sent: [action.payload.request, ...state.member_request_sent],
            }
        case CANCEL_MEMBER_REQUEST_FROM_USER:
            return {
                ...state,
                member_request_sent: state.member_request_sent.filter(request => request._id !== action.payload.requestId)
            }
        case REFUSE_MEMBER_REQUEST_FROM_USER:
            return {
                ...state,
                member_request: state.member_request.filter(request => request._id !== action.payload.requestId),
                notifications: state.notifications.filter(notif => notif._id !== action.payload.notificationId),
                unseen_notifications: state.unseen_notifications > 0 ? state.unseen_notifications - 1 : 0
            }

        /**
         * 
         */

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
                conversations: state.conversations.filter(conversation => conversation.id !== action.payload.conversationId),
            }
        case SET_LAST_MESSAGE_SEEN:
            let i = state.conversations.find(conversation => conversation.id === action.payload.conversationId)
            state.conversations[i] = action.payload.messageId
            return {
                ...state,
                conversations: state.conversations
            }
        case SET_LAST_CONVERSATION_SEEN:
            return {
                ...state,
                last_conversation: action.payload.conversationId
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
            state.conversations[favorite].favorite = true
            return {
                ...state,
                conversations: state.conversations,
            }
        case REMOVE_FAVORITE_CONVERSATION:
            let unfavorite = state.conversations.findIndex(conversation => conversation.id === action.payload.conversationId)
            state.conversations[unfavorite].favorite = false
            return {
                ...state,
                conversations: state.conversations,
            }

        default:
            return state;
    }
}