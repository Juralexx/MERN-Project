import {
    FAVORITE, FOLLOW, GET_PROJECT, LIKE, UNFAVORITE, UNFOLLOW, UNLIKE, UPDATE_CATEGORY, UPDATE_CONTENT,
    UPDATE_END, UPDATE_LOCATION, UPDATE_NUMBEROFCONTRIBUTORS, UPDATE_STATE, UPDATE_TITLE,
    UPDATE_TITLEURL,
    UPDATE_WORKS
} from "../actions/project.action";

const initialState = {}

export default function projectReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROJECT:
            return action.payload

        case UPDATE_STATE:
            return {
                ...state,
                state: action.payload
            }
        case UPDATE_TITLE:
            return {
                ...state,
                title: action.payload
            }
        case UPDATE_TITLEURL:
            return {
                ...state,
                UPDATE_TITLEURL: action.payload
            }
        case UPDATE_CATEGORY:
            return {
                ...state,
                category: action.payload
            }
        case UPDATE_CONTENT:
            return {
                ...state,
                content: action.payload
            }
        case UPDATE_LOCATION:
            return {
                ...state,
                location: action.location,
                department: action.department,
                region: action.region,
                new_region: action.new_region
            }
        case UPDATE_NUMBEROFCONTRIBUTORS:
            return {
                ...state,
                numberofcontributors: action.payload
            }
        case UPDATE_WORKS:
            return {
                ...state,
                works: action.payload
            }
        case UPDATE_END:
            return {
                ...state,
                end: action.payload
            }
        case LIKE:
            return Object.keys(state).map((project) => {
                if (project._id === action.payload.projectId) {
                    return {
                        ...project,
                        likers: [action.payload.userId, ...project.likers]
                    }
                }
                return project
            })
        case UNLIKE:
            return Object.keys(state).map((project) => {
                if (project._id === action.payload.projectId) {
                    return {
                        ...project,
                        likers: project.likers.filter((UnlikerId) => UnlikerId !== action.payload.userId)
                    }
                }
                return project
            })
        case FOLLOW:
            return Object.keys(state).map((project) => {
                if (project._id === action.payload.projectId) {
                    return {
                        ...project,
                        followers: [action.payload.userId, ...project.followers]
                    }
                }
                return project
            })
        case UNFOLLOW:
            return Object.keys(state).map((project) => {
                if (project._id === action.payload.projectId) {
                    return {
                        ...project,
                        followers: project.followers.filter((unfollowerId) => unfollowerId !== action.payload.followerId)
                    }
                }
                return project
            })
        case FAVORITE:
            return Object.keys(state).map((project) => {
                if (project._id === action.payload.projectId) {
                    return {
                        ...project,
                        favorites: [action.payload.userId, ...project.favorites]
                    }
                }
                return project
            })
        case UNFAVORITE:
            return Object.keys(state).map((project) => {
                if (project._id === action.payload.projectId) {
                    return {
                        ...project,
                        favorites: project.favorites.filter((userId) => userId !== action.payload.userId)
                    }
                }
                return project
            })
        default:
            return state;
    }
}