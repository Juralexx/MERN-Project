import { GET_USER, UPDATE_BIO, UPDATE_EMAIL, UPDATE_GENDER, UPDATE_LASTNAME, UPDATE_LOCATION, UPDATE_NAME, UPDATE_PHONE, UPDATE_PSEUDO, UPDATE_SECOND_LOCATION, UPDATE_THEME, UPDATE_THIRD_LOCATION, UPDATE_WORK } from "../actions/user.action";
import { DELETE_BIO, DELETE_GENDER, DELETE_LASTNAME, DELETE_LOCATION, DELETE_NAME, DELETE_PHONE, DELETE_WORK } from "../actions/user.action.delete";
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

        default:
            return state;
    }
}