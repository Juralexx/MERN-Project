import {
    CANCEL_MEMBER_REQUEST_FROM_PROJECT, FAVORITE, FOLLOW, GET_PROJECT, LIKE,
    REMOVE_MEMBER, SEND_MEMBER_REQUEST_FROM_PROJECT, UNFAVORITE, UNFOLLOW, UNLIKE, RECEIVE_CREATE_TASK, RECEIVE_UPDATE_TASK,
    RECEIVE_DELETE_TASK, RECEIVE_UPDATE_TASK_STATE, NAME_ADMIN, RECEIVE_NAME_ADMIN, UNNAME_ADMIN,
    RECEIVE_UNNAME_ADMIN, UPDATE_PICTURES, RECEIVE_UPDATE_PICTURES, DELETE_PICTURES,
    RECEIVE_DELETE_PICTURES, UPDATE_PROJECT, RECEIVE_CREATE_QNA, RECEIVE_UPDATE_QNA, RECEIVE_DELETE_QNA, RECEIVE_CREATE_ACTUALITY,
    RECEIVE_UPDATE_ACTUALITY, RECEIVE_DELETE_ACTUALITY, RECEIVE_COMMENT_TASK, REFUSE_MEMBER_REQUEST_FROM_PROJECT
} from "../reducers/project.action";
import { RECEIVE_CANCEL_MEMBER_REQUEST_FROM_USER, RECEIVE_MEMBER_REQUEST_FROM_USER, RECEIVE_REFUSE_MEMBER_REQUEST_FROM_USER } from "./user.action";

const initialState = {}

export default function projectReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROJECT:
            return action.payload

        case UPDATE_PICTURES:
            let new_pictures = []
            action.payload.pictures.forEach((pic, key) => {
                new_pictures = [...new_pictures, `${process.env.REACT_APP_API_URL}uploads/projects/${action.payload.projectId}/${action.payload.projectId}-${key}.jpg`]
            })
            return {
                ...state,
                pictures: new_pictures
            }
        case RECEIVE_UPDATE_PICTURES:
            let new_pics = []
            action.payload.pictures.forEach((pic, key) => {
                new_pics = [...new_pics, `${process.env.REACT_APP_API_URL}uploads/projects/${action.payload.projectId}/${action.payload.projectId}-${key}.jpg`]
            })
            return {
                ...state,
                pictures: [...state.pictures, action.payload.pictures]
            }
        case DELETE_PICTURES:
            let pics = state.pictures.filter(picture => picture !== action.payload.picture)
            let newPics = []
            pics.forEach((pic, key) => {
                newPics = [...newPics, `${process.env.REACT_APP_API_URL}uploads/projects/${action.payload.projectId}/${action.payload.projectId}-${key}.jpg`]
            })
            return {
                ...state,
                pictures: newPics,
            }
        case RECEIVE_DELETE_PICTURES:
            return {
                ...state,
                pictures: state.pictures.filter(picture => picture !== action.payload.picture)
            }
        case UPDATE_PROJECT:
            return {
                ...state,
                title: action.payload.title,
                subtitle: action.payload.subtitle,
                URL: action.payload.url,
                category: action.payload.category,
                tags: action.payload.tags,
                state: action.payload.state,
                location: action.payload.location,
                description: action.payload.description,
                end: action.payload.end,
                content: action.payload.content,
                works: action.payload.works,
                networks: action.payload.networks,
            }

        /**
         * Like / Unlike cases
         */

        case LIKE:
            return {
                ...state,
                likers: [...state.likers, action.payload.userId]
            }
        case UNLIKE:
            return {
                ...state,
                likers: state.likers.filter(liker => liker !== action.payload.userId)
            }

        /**
         * Follow / Unfollow cases
         */

        case FOLLOW:
            return {
                ...state,
                followers: [...state.followers, action.payload.userId]
            }
        case UNFOLLOW:
            return {
                ...state,
                followers: state.followers.filter(follower => follower !== action.payload.userId)
            }

        /**
         * Add to favorites / Remove from favorites cases
         */

        case FAVORITE:
            return {
                ...state,
                favorites: [...state.favorites, action.payload.userId]
            }
        case UNFAVORITE:
            return {
                ...state,
                favorites: state.favorites.filter(favorite => favorite !== action.payload.userId)
            }

        /**
         * Members requests from project
         */

        case SEND_MEMBER_REQUEST_FROM_PROJECT:
            return {
                ...state,
                member_request_sent: [...state.member_request_sent, action.payload.request]
            }
        case CANCEL_MEMBER_REQUEST_FROM_PROJECT:
            return {
                ...state,
                member_request_sent: state.member_request_sent.filter(request => request._id !== action.payload.requestId)
            }
        case REFUSE_MEMBER_REQUEST_FROM_PROJECT:
            return {
                ...state,
                member_request: state.member_request.filter(request => request._id !== action.payload.requestId)
            }

        /**
         * Members requests from user
         */

        case RECEIVE_MEMBER_REQUEST_FROM_USER:
            return {
                ...state,
                member_request: [action.payload.request, ...state.member_request]
            }
        case RECEIVE_CANCEL_MEMBER_REQUEST_FROM_USER:
            return {
                ...state,
                member_request: state.member_request.filter(request => request._id !== action.payload.requestId)
            }
        case RECEIVE_REFUSE_MEMBER_REQUEST_FROM_USER:
            return {
                ...state,
                member_request_sent: state.member_request_sent.filter(request => request._id !== action.payload.requestId)
            }

        /**
         * Remove member from project
         */

        case REMOVE_MEMBER:
            return {
                ...state,
                members: state.members.filter(member => member._id !== action.payload.memberId),
                activity_feed: [...state.activity_feed, action.payload.activity]
            }

        /*******************************************************************************************************************************/
        /******************************************************* SET ADMIN *************************************************************/

        case NAME_ADMIN:
            let a = state.members.findIndex(member => member._id === action.payload.userId)
            state.members[a].role = "admin"
            return {
                ...state,
                admins: [...state.admins, action.payload.userId],
                members: state.members,
                activity_feed: [...state.activity_feed, action.payload.activity]
            }
        case RECEIVE_NAME_ADMIN:
            let b = state.members.findIndex(member => member._id === action.payload.userId)
            state.members[b].role = "admin"
            return {
                ...state,
                admins: [...state.admins, action.payload.userId],
                members: state.members,
                activity_feed: [...state.activity_feed, action.payload.activity]
            }
        case UNNAME_ADMIN:
            let c = state.members.findIndex(member => member._id === action.payload.userId)
            state.members[c].role = "user"
            return {
                ...state,
                admins: state.admins.filter(element => element !== action.payload.userId),
                members: state.members
            }
        case RECEIVE_UNNAME_ADMIN:
            let d = state.members.findIndex(member => member._id === action.payload.userId)
            state.members[d].role = "user"
            return {
                ...state,
                admins: state.admins.filter(element => element !== action.payload.userId),
                members: state.members
            }

        /**
         * TASKS
         */

        case RECEIVE_CREATE_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload.task],
                activity_feed: [...state.activity_feed, action.payload.activity]
            }
        case RECEIVE_UPDATE_TASK:
            let f = state.tasks.findIndex(task => task._id === action.payload.task._id)
            state.tasks[f] = action.payload.task
            return {
                ...state,
                tasks: [...state.tasks],
                activity_feed: [...state.activity_feed, action.payload.activity]
            }
        case RECEIVE_UPDATE_TASK_STATE:
            let h = state.tasks.findIndex(task => task._id === action.payload.taskId)
            state.tasks[h].state = action.payload.state
            return {
                ...state,
                tasks: state.tasks,
                activity_feed: [...state.activity_feed, action.payload.activity]
            }
        case RECEIVE_COMMENT_TASK:
            let l = state.tasks.findIndex(task => task._id === action.payload.taskId)
            state.tasks[l].comments = [...state.tasks[l].comments, action.payload.comment]
            return {
                ...state,
                tasks: state.tasks
            }
        case RECEIVE_DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload.taskId),
                activity_feed: [...state.activity_feed, action.payload.activity]
            }

        /**
         * QNA
         */

        case RECEIVE_CREATE_QNA:
            return {
                ...state,
                QNA: action.payload.qna,
                activity_feed: [...state.activity_feed, action.payload.activity]
            }
        case RECEIVE_UPDATE_QNA:
            return {
                ...state,
                QNA: action.payload.qna,
                activity_feed: [...state.activity_feed, action.payload.activity]
            }
        case RECEIVE_DELETE_QNA:
            return {
                ...state,
                QNA: [],
                activity_feed: [...state.activity_feed, action.payload.activity]
            }

        /**
         * ACTUALITY
         */

        case RECEIVE_CREATE_ACTUALITY:
            return {
                ...state,
                actualities: [...state.actualities, action.payload.actuality],
                activity_feed: [...state.activity_feed, action.payload.activity]
            }
        case RECEIVE_UPDATE_ACTUALITY:
            let actuIndex = state.actualities.findIndex(actu => actu._id === action.payload.actuality._id)
            state.actualities[actuIndex] = action.payload.actuality
            return {
                ...state,
                actualities: state.actualities,
                activity_feed: [...state.activity_feed, action.payload.activity]
            }
        case RECEIVE_DELETE_ACTUALITY:
            return {
                ...state,
                actualities: state.actualities.filter(actu => actu._id !== action.payload.actuality._id),
                activity_feed: [...state.activity_feed, action.payload.activity]
            }

        default:
            return state;
    }
}