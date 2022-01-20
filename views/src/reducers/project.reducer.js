import {
    GET_PROJECT, UPDATE_CATEGORY, UPDATE_CONTENT, UPDATE_CONTRIBUTORS,
    UPDATE_END, UPDATE_LOCATION, UPDATE_NUMBEROFCONTRIBUTORS, UPDATE_TITLE,
    UPDATE_TITLEURL
} from "../actions/project.action";

const initialState = {}

export default function projectReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROJECT:
            return action.payload
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
                location: action.payload
            }
        case UPDATE_NUMBEROFCONTRIBUTORS:
            return {
                ...state,
                numberofcontributors: action.payload
            }
        case UPDATE_CONTRIBUTORS:
            return {
                ...state,
                contributors: action.payload
            }
        case UPDATE_END:
            return {
                ...state,
                end: action.payload
            }
        default:
            return state;
    }
}