import { GET_USER, UPDATE_BIO, UPDATE_EMAIL, UPDATE_FACEBOOK, UPDATE_GENDER, UPDATE_INSTAGRAM, UPDATE_LASTNAME, UPDATE_LINKEDIN, UPDATE_LOCATION, UPDATE_NAME, UPDATE_PHONE, UPDATE_PSEUDO, UPDATE_THEME, UPDATE_TWITTER, UPDATE_WEBSITE, UPDATE_WORK, UPDATE_YOUTUBE } from "../actions/user.action";
import { DELETE_BIO, DELETE_FACEBOOK, DELETE_GENDER, DELETE_INSTAGRAM, DELETE_LASTNAME, DELETE_LINKEDIN, DELETE_LOCATION, DELETE_NAME, DELETE_PHONE, DELETE_TWITTER, DELETE_WEBSITE, DELETE_WORK, DELETE_YOUTUBE } from "../actions/user.action.delete";
import { DELETE_COVER_PICTURE, DELETE_UPLOADED_PICTURE, UPLOAD_COVER_PICTURE, UPLOAD_PICTURE } from "../actions/user.action.upload";

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
                coverPicture: action.payload,
            }
        case DELETE_COVER_PICTURE:
            return {
                ...state,
                coverPicture: action.payload
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
                location: action.payload,
            }
        case DELETE_LOCATION:
            return {
                ...state,
                location: action.payload,
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

        default:
            return state;
    }
}