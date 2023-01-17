import {
    CREATE_TASK,
    CANCEL_MEMBER_REQUEST, FAVORITE, FOLLOW, GET_PROJECT, LIKE, RECEIVE_ACCEPT_MEMBER_REQUEST, RECEIVE_REFUSE_MEMBER_REQUEST, REMOVE_MEMBER, SEND_MEMBER_REQUEST, UNFAVORITE, UNFOLLOW, UNLIKE,
    RECEIVE_CREATE_TASK, UPDATE_TASK, RECEIVE_UPDATE_TASK, DELETE_TASK, RECEIVE_DELETE_TASK, UPDATE_TASK_STATE, RECEIVE_UPDATE_TASK_STATE, NAME_ADMIN, RECEIVE_NAME_ADMIN, UNNAME_ADMIN, RECEIVE_UNNAME_ADMIN, UPDATE_TASK_STATUS, RECEIVE_UPDATE_TASK_STATUS, UPDATE_PICTURES, RECEIVE_UPDATE_PICTURES, DELETE_PICTURES, RECEIVE_DELETE_PICTURES, UPDATE_PROJECT, CREATE_QNA, RECEIVE_CREATE_QNA, RECEIVE_UPDATE_QNA, DELETE_QNA, RECEIVE_DELETE_QNA, UPDATE_QNA, CREATE_ACTUALITY, RECEIVE_CREATE_ACTUALITY, UPDATE_ACTUALITY, RECEIVE_UPDATE_ACTUALITY, DELETE_ACTUALITY, RECEIVE_DELETE_ACTUALITY, COMMENT_TASK, RECEIVE_COMMENT_TASK
} from "../reducers/project.action";

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
                geolocalisation: action.payload.geolocalisation,
                location: action.payload.location,
                department: action.payload.department,
                code_department: action.payload.code_department,
                region: action.payload.region,
                code_region: action.payload.code_region,
                new_region: action.payload.new_region,
                code_new_region: action.payload.code_new_region,
                description: action.payload.description,
                end: action.payload.end,
                content: action.payload.content,
                works: action.payload.works,
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

        /*******************************************************************************************************************************/
        /****************************************************** LEAVE PROJECT **********************************************************/

        case REMOVE_MEMBER:
            return {
                ...state,
                members: state.members.filter(member => member._id !== action.payload.memberId),
                activity_feed: [...state.activity_feed, action.payload.activity]
            }

        /*******************************************************************************************************************************/
        /****************************************************** MEMBER REQUEST *********************************************************/

        case SEND_MEMBER_REQUEST:
            return {
                ...state,
                member_requests: [...state.member_requests, action.payload.request]
            }
        case CANCEL_MEMBER_REQUEST:
            return {
                ...state,
                member_requests: state.member_requests.filter(element => element.memberId !== action.payload.userId)
            }
        case RECEIVE_ACCEPT_MEMBER_REQUEST:
            return {
                ...state,
                members: [...state.members, action.payload.member],
                activity_feed: [...state.activity_feed, action.payload.activity]
            }
        case RECEIVE_REFUSE_MEMBER_REQUEST:
            return {
                ...state,
                member_requests: state.member_requests.filter(element => element.memberId !== action.payload.userId)
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

        /*******************************************************************************************************************************/
        /********************************************************** TASKS **************************************************************/

        case CREATE_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload.task],
                activity_feed: [...state.activity_feed, action.payload.activity]
            }
        case RECEIVE_CREATE_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload.task],
                activity_feed: [...state.activity_feed, action.payload.activity]
            }
        case UPDATE_TASK:
            let e = state.tasks.findIndex(task => task._id === action.payload.task._id)
            state.tasks[e] = action.payload.task
            return {
                ...state,
                tasks: state.tasks,
                activity_feed: [...state.activity_feed, action.payload.activity]
            }
        case RECEIVE_UPDATE_TASK:
            let f = state.tasks.findIndex(task => task._id === action.payload.task._id)
            state.tasks[f] = action.payload.task
            return {
                ...state,
                tasks: state.tasks,
                activity_feed: [...state.activity_feed, action.payload.activity]
            }
        case UPDATE_TASK_STATE:
            let g = state.tasks.findIndex(task => task._id === action.payload.taskId)
            state.tasks[g].state = action.payload.state
            return {
                ...state,
                tasks: state.tasks,
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
        case UPDATE_TASK_STATUS:
            let i = state.tasks.findIndex(task => task._id === action.payload.taskId)
            state.tasks[i].status = action.payload.status
            return {
                ...state,
                tasks: state.tasks,
                activity_feed: [...state.activity_feed, action.payload.activity]
            }
        case RECEIVE_UPDATE_TASK_STATUS:
            let j = state.tasks.findIndex(task => task._id === action.payload.taskId)
            state.tasks[j].status = action.payload.status
            return {
                ...state,
                tasks: state.tasks,
                activity_feed: [...state.activity_feed, action.payload.activity]
            }
        case COMMENT_TASK:
            let k = state.tasks.findIndex(task => task._id === action.payload.taskId)
            state.tasks[k].comments.push(action.payload.comment)
            return {
                ...state,
                tasks: state.tasks
            }
        case RECEIVE_COMMENT_TASK:
            let l = state.tasks.findIndex(task => task._id === action.payload.taskId)
            state.tasks[l].comments.push(action.payload.comment)
            return {
                ...state,
                tasks: state.tasks
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload.taskId),
                activity_feed: [...state.activity_feed, action.payload.activity]
            }
        case RECEIVE_DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload.taskId),
                activity_feed: [...state.activity_feed, action.payload.activity]
            }

        /*******************************************************************************************************************************/
        /************************************************************ QNA ***************************************************************/

        case CREATE_QNA:
            return {
                ...state,
                QNA: action.payload.qna,
                activity_feed: [...state.activity_feed, action.payload.activity]
            }
        case RECEIVE_CREATE_QNA:
            return {
                ...state,
                QNA: action.payload.qna,
                activity_feed: [...state.activity_feed, action.payload.activity]
            }
        case UPDATE_QNA:
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
        case DELETE_QNA:
            return {
                ...state,
                QNA: [],
                activity_feed: [...state.activity_feed, action.payload.activity]
            }
        case RECEIVE_DELETE_QNA:
            return {
                ...state,
                QNA: [],
                activity_feed: [...state.activity_feed, action.payload.activity]
            }

        /*******************************************************************************************************************************/
        /******************************************************** ACTUALITY ************************************************************/

        case CREATE_ACTUALITY:
            return {
                ...state,
                actualities: [...state.actualities, action.payload.actuality],
                activity_feed: [...state.activity_feed, action.payload.activity]
            }
        case RECEIVE_CREATE_ACTUALITY:
            return {
                ...state,
                actualities: [...state.actualities, action.payload.actuality],
                activity_feed: [...state.activity_feed, action.payload.activity]
            }
        case UPDATE_ACTUALITY:
            let actu = state.actualities.findIndex(e => e._id === action.payload.actualityId)
            state.actualities[actu].title = action.payload.title
            state.actualities[actu].url = action.payload.url
            state.actualities[actu].description = action.payload.description
            return {
                ...state,
                actualities: state.actualities,
                activity_feed: [...state.activity_feed, action.payload.activity]
            }
        case RECEIVE_UPDATE_ACTUALITY:
            let act = state.actualities.findIndex(e => e._id === action.payload.actualityId)
            state.actualities[act].title = action.payload.title
            state.actualities[act].url = action.payload.url
            state.actualities[act].description = action.payload.description
            return {
                ...state,
                actualities: state.actualities,
                activity_feed: [...state.activity_feed, action.payload.activity]
            }
        case DELETE_ACTUALITY:
            return {
                ...state,
                actualities: state.actualities.filter(e => e._id !== action.payload.actualityId),
                activity_feed: [...state.activity_feed, action.payload.activity]
            }
        case RECEIVE_DELETE_ACTUALITY:
            return {
                ...state,
                actualities: state.actualities.filter(e => e._id !== action.payload.actualityId),
                activity_feed: [...state.activity_feed, action.payload.activity]
            }

        default:
            return state;
    }
}