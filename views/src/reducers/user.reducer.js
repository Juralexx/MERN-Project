import { ACCEPT_FRIEND_REQUEST, GET_USER, RECEIVE_ACCEPT_FRIEND_REQUEST, RECEIVE_CANCEL_FRIEND_REQUEST, RECEIVE_FRIEND_REQUEST, REFUSE_FRIEND_REQUEST, UPDATE_BIO, UPDATE_EMAIL, UPDATE_FACEBOOK, UPDATE_GENDER, UPDATE_INSTAGRAM, UPDATE_LASTNAME, UPDATE_LINKEDIN, UPDATE_LOCATION, UPDATE_NAME, UPDATE_PHONE, UPDATE_PSEUDO, UPDATE_THEME, UPDATE_TWITTER, UPDATE_WEBSITE, UPDATE_WORK, UPDATE_YOUTUBE } from "../actions/user.action";
import { DELETE_BIO, DELETE_FACEBOOK, DELETE_GENDER, DELETE_INSTAGRAM, DELETE_LASTNAME, DELETE_LINKEDIN, DELETE_LOCATION, DELETE_NAME, DELETE_PHONE, DELETE_TWITTER, DELETE_WEBSITE, DELETE_WORK, DELETE_YOUTUBE } from "../actions/user.action.delete";
import { DELETE_COVER_PICTURE, DELETE_UPLOADED_PICTURE, UPLOAD_COVER_PICTURE, UPLOAD_PICTURE } from "../actions/user.action.upload";
import { CANCEL_SENT_FRIEND_REQUEST, SEND_FRIEND_REQUEST } from "../actions/user.action";
import { ACCEPT_MEMBER_REQUEST, RECEIVE_CANCEL_MEMBER_REQUEST, RECEIVE_MEMBER_REQUEST, REFUSE_MEMBER_REQUEST, REMOVE_PROJECT_FROM_MEMBER } from "../actions/project.action";

const initialState = {}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload

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
        case UPDATE_PSEUDO:
            return {
                ...state,
                pseudo: action.payload,
            }
        case UPDATE_EMAIL:
            return {
                ...state,
                email: action.payload,
            }
        case UPDATE_NAME:
            return {
                ...state,
                name: action.payload,
            }
        case DELETE_NAME:
            return {
                ...state,
                name: action.payload,
            }
        case UPDATE_LASTNAME:
            return {
                ...state,
                lastname: action.payload,
            }
        case DELETE_LASTNAME:
            return {
                ...state,
                lastname: action.payload,
            }
        case UPDATE_GENDER:
            return {
                ...state,
                gender: action.payload,
            }
        case DELETE_GENDER:
            return {
                ...state,
                gender: action.payload,
            }
        case UPDATE_LOCATION:
            return {
                ...state,
                location: action.location,
                department: action.department,
                region: action.region,
                new_region: action.new_region,
            }
        case DELETE_LOCATION:
            return {
                ...state,
                location: action.payload,
                department: action.payload,
                region: action.payload,
                new_region: action.payload,
            }
        case UPDATE_WORK:
            return {
                ...state,
                work: action.payload,
            }
        case DELETE_WORK:
            return {
                ...state,
                work: action.payload,
            }
        case UPDATE_PHONE:
            return {
                ...state,
                phone: action.payload,
            }
        case DELETE_PHONE:
            return {
                ...state,
                phone: action.payload,
            }
        case UPDATE_BIO:
            return {
                ...state,
                bio: action.payload,
            }
        case DELETE_BIO:
            return {
                ...state,
                bio: action.payload,
            }
        case UPDATE_THEME:
            return {
                ...state,
                theme: action.payload,
            }
        case UPDATE_WEBSITE:
            return {
                ...state,
                website: action.payload,
            }
        case DELETE_WEBSITE:
            return {
                ...state,
                website: action.payload,
            }
        case UPDATE_FACEBOOK:
            return {
                ...state,
                facebook: action.payload
            }
        case DELETE_FACEBOOK:
            return {
                ...state,
                facebook: action.payload
            }
        case UPDATE_INSTAGRAM:
            return {
                ...state,
                instagram: action.payload
            }
        case DELETE_INSTAGRAM:
            return {
                ...state,
                instagram: action.payload
            }
        case UPDATE_TWITTER:
            return {
                ...state,
                twitter: action.payload
            }
        case DELETE_TWITTER:
            return {
                ...state,
                twitter: action.payload
            }
        case UPDATE_YOUTUBE:
            return {
                ...state,
                youtube: action.payload
            }
        case DELETE_YOUTUBE:
            return {
                ...state,
                youtube: action.payload
            }
        case UPDATE_LINKEDIN:
            return {
                ...state,
                linkedin: action.payload
            }
        case DELETE_LINKEDIN:
            return {
                ...state,
                linkedin: action.payload
            }

        /*******************************************************************************************************************************/
        /****************************************************** FRIEND ACTION **********************************************************/

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
                friend_request_sent: state.friend_request_sent.filter(friendId => friendId === action.payload.friendId)
            }
        case RECEIVE_CANCEL_FRIEND_REQUEST:
            return {
                ...state,
                notifications: state.notifications.filter(element => element.type !== action.payload.type && element.requesterId !== action.payload.requesterId),
                unseen_notifications: state.unseen_notifications - 1
            }
        case ACCEPT_FRIEND_REQUEST:
            return {
                ...state,
                friends: [{ friend: action.payload.friendId }, ...state.friends],
                friend_request: state.friend_request.filter(friendId => friendId === action.payload.friendId),
                unseen_notifications: state.unseen_notifications - 1
            }
        case RECEIVE_ACCEPT_FRIEND_REQUEST:
            return {
                ...state,
                friends: [...state.friends, action.payload.friend]
            }
        case REFUSE_FRIEND_REQUEST:
            return {
                ...state,
                unseen_notifications: state.unseen_notifications - 1
            }

        /***************************************************************************************************************************/
        /************************************************** MEMBER REQUEST ******************************************************* */

        case RECEIVE_MEMBER_REQUEST:
            return {
                ...state,
                notifications: [...state.notifications, action.payload.notification],
                unseen_notifications: state.unseen_notifications + 1
            }
        case RECEIVE_CANCEL_MEMBER_REQUEST:
            return {
                ...state,
                notifications: state.notifications.filter(element => element.type !== action.payload.type && element.requesterId !== action.payload.requesterId),
                unseen_notifications: state.unseen_notifications - 1
            }

        case ACCEPT_MEMBER_REQUEST:
            return {
                ...state,
                unseen_notifications: state.unseen_notifications - 1,
                current_projects: [...state.current_projects, action.payload.projectId]
            }
        case REFUSE_MEMBER_REQUEST:
            return {
                ...state,
                unseen_notifications: state.unseen_notifications - 1
            }
        case REMOVE_PROJECT_FROM_MEMBER:
            return {
                ...state,
                current_projects: state.current_projects.filter(project => project !== action.payload.projectId),
            }

        default:
            return state;
    }
}