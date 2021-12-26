import axios from "axios";

export const GET_USER = "GET_USER"
export const UPLOAD_PICTURE = "UPLOAD_PICTURE"
export const DELETE_UPLOADED_PICTURE = "DELETE_UPLOADED_PICTURE"
export const UPDATE_PSEUDO = "UPDATE_PSEUDO"
export const UPDATE_NAME = "UPDATE_NAME"
export const UPDATE_EMAIL = "UPDATE_EMAIL"
export const UPDATE_LASTNAME = "UPDATE_LASTNAME"
export const UPDATE_WORK = "UPDATE_WORK"
export const UPDATE_PHONE = "UPDATE_PHONE"

export const getUser = (uid) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
            .then((res) => {
                dispatch({ type: GET_USER, payload: res.data })
            })
            .catch((err) => console.log(err))
    }
}

export const uploadProfilPicture = (data, id) => {
    return (dispatch) => {
        return axios
            .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
                    .then((res) => {
                        dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture })
                        console.log(res)
                    })
            })
            .catch((err) => console.log(err))
    }
}

// export const deleteProfilPicture = (userId) => {
//     return (dispatch) => {
//         return axios
//             .delete(`${process.env.REACT_APP_API_URL}api/user/upload/delete`, { data: { picture: `${userId}.jpg` } })
//             .then((res) => {
//                 dispatch({ type: DELETE_UPLOADED_PICTURE, payload: './img/random-user.png' })
//                 console.log(res)
//             })
//             .catch((err) => console.log(err))
//     }
// }

export const deleteProfilPicture = (userId, picture) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}api/user/upload/delete`,
            data: { picture },
        })
            .then((res) => {
                dispatch({ type: DELETE_UPLOADED_PICTURE, payload: './img/random-user.png' })
            })
            .catch((err) => console.log(err))
    }
}

export const updatePseudo = (userId, pseudo) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { pseudo }
        })
            .then((res) => {
                dispatch({ type: UPDATE_PSEUDO, payload: { pseudo } })
            })
            .catch((err) => console.log(err))
    }
}

export const updateEmail = (userId, email) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { email }
        })
            .then((res) => {
                dispatch({ type: UPDATE_EMAIL, payload: { email } })
            })
            .catch((err) => console.log(err))
    }
}

export const updateName = (userId, name) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { name }
        })
            .then((res) => {
                dispatch({ type: UPDATE_NAME, payload: { name } })
            })
            .catch((err) => console.log(err))
    }
}

export const updateLastname = (userId, lastname) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { lastname }
        })
            .then((res) => {
                dispatch({ type: UPDATE_LASTNAME, payload: { lastname } })
            })
            .catch((err) => console.log(err))
    }
}

export const updateWork = (userId, work) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { work }
        })
            .then((res) => {
                dispatch({ type: UPDATE_WORK, payload: { work } })
            })
            .catch((err) => console.log(err))
    }
}

export const updatePhone = (userId, phone) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { phone }
        })
            .then((res) => {
                dispatch({ type: UPDATE_PHONE, payload: { phone } })
            })
            .catch((err) => console.log(err))
    }
}