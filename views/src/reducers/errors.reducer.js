import { GET_UPLOAD_PROFIL_ERRORS } from "../reducers/user.action.upload"

const initialState = { uploadProfilPictureErrors: [] }

export default function errorsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_UPLOAD_PROFIL_ERRORS:
            return {
                ...state,
                uploadProfilPictureErrors: action.payload,
            }
        default:
            return state;
    }
}