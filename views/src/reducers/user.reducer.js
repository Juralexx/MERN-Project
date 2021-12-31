import { DELETE_COVER_PICTURE, DELETE_UPLOADED_PICTURE, GET_USER, UPDATE_BIO, UPDATE_EMAIL, UPDATE_LASTNAME, UPDATE_NAME, UPDATE_PHONE, UPDATE_PSEUDO, UPDATE_WORK, UPLOAD_COVER_PICTURE, UPLOAD_PICTURE } from "../actions/user.action";

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
        case UPDATE_LASTNAME:
            return {
                ...state,
                lastname: action.payload,
            }
        case UPDATE_WORK:
            return {
                ...state,
                work: action.payload,
            }
        case UPDATE_PHONE:
            return {
                ...state,
                phone: action.payload,
            }
        case UPDATE_BIO:
            return {
                ...state,
                bio: action.payload,
            }

        default:
            return state;
    }
}