import axios from "axios";

export const UPLOAD_PICTURE = "UPLOAD_PICTURE"
export const DELETE_UPLOADED_PICTURE = "DELETE_UPLOADED_PICTURE"
export const UPLOAD_COVER_PICTURE = "UPLOAD_COVER_PICTURE"
export const DELETE_COVER_PICTURE = "DELETE_COVER_PICTURE"

export const GET_UPLOAD_PROFIL_ERRORS = "GET_UPLOAD_PROFIL_ERRORS"
export const GET_UPLOAD_COVER_ERRORS = "GET_UPLOAD_COVER_ERRORS"

export const uploadProfilPicture = (data, userId) => {
    return async (dispatch) => {
        return await axios
            .post(`${process.env.REACT_APP_API_URL}api/user/upload/${userId}`, data)
            .then((res) => {
                if (res.data.message) {
                    dispatch({ type: GET_UPLOAD_PROFIL_ERRORS, payload: res.data.message })
                } else {
                    console.log(res)
                    return axios
                        .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
                        .then((res) => {
                            dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture })
                        })
                }
            })
            .catch((err) => console.log(err))
    }
}

export const deleteProfilPicture = (userId, picture) => {
    return async (dispatch) => {
        return await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/upload/delete/${userId}` + userId,
            data: { picture },
        })
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
                    .then((res) => {
                        dispatch({ type: DELETE_UPLOADED_PICTURE, payload: "/img/random-user.png" })
                    })
            })
            .catch((err) => console.log(err))
    }
}

export const uploadCoverPicture = (data, userId) => {
    return async (dispatch) => {
        return await axios
            .post(`${process.env.REACT_APP_API_URL}api/user/upload/cover/${userId}`, data)
            .then((res) => {
                if (res.data.message) {
                    dispatch({ type: GET_UPLOAD_PROFIL_ERRORS, payload: res.data.message })
                } else {
                    return axios
                        .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
                        .then((res) => {
                            dispatch({ type: UPLOAD_COVER_PICTURE, payload: res.data.cover_picture })
                            console.log(res)
                        })
                }
            })
            .catch((err) => console.log(err))
    }
}

export const deleteCoverPicture = (userId, cover_picture) => {
    return async (dispatch) => {
        return await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/upload/delete/cover/${userId}` + userId,
            data: { cover_picture },
        })
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
                    .then((res) => {
                        dispatch({ type: DELETE_COVER_PICTURE, payload: "/img/random-cover.jpg" })
                    })
            })
            .catch((err) => console.log(err))
    }
}
