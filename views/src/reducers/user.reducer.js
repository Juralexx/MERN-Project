import { GET_USER, UPDATE_PROFIL, UPLOAD_PICTURE } from "../actions/user.action";

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
        case UPDATE_PROFIL:
            return {
                ...state,
                pseudo: action.payload,
                email: action.payload,
                name: action.payload,
                lastname: action.payload,
                work: action.payload,
                phone: action.payload,
            }

        default:
            return state;
    }
}