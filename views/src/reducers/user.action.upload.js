import axios from "axios";

export const UPLOAD_PICTURE = "UPLOAD_PICTURE"
export const GET_UPLOAD_COVER_ERRORS = "GET_UPLOAD_COVER_ERRORS"

/**
 * 
 * @param {*} data 
 * @param {*} userId 
 */

export const uploadProfilPicture = (data, userId) => {
    return async (dispatch) => {
        return await axios
            .post(`${process.env.REACT_APP_API_URL}api/user/${userId}/uploads/pictures/profil/`, data)
            .then(async (res) => {
                if (res.data.message) {
                    dispatch({ type: GET_UPLOAD_PROFIL_ERRORS, payload: res.data.message })
                } else {
                    return await axios
                        .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
                        .then((res) => {
                            dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture })
                        })
                }
            })
            .catch(err => console.log(err))
    }
}

export const DELETE_UPLOADED_PICTURE = "DELETE_UPLOADED_PICTURE"

/**
 * 
 * @param {*} userId 
 * @param {*} picture 
 */

export const deleteProfilPicture = (userId, picture) => {
    return async (dispatch) => {
        return await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/${userId}/uploads/pictures/profil/delete/`,
            data: { picture },
        })
            .then(async () => {
                return await axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
                    .then((res) => {
                        dispatch({ type: DELETE_UPLOADED_PICTURE, payload: `${process.env.REACT_APP_API_URL}api/files/img/random-user.jpg` })
                    })
            })
            .catch(err => console.log(err))
    }
}

export const UPLOAD_COVER_PICTURE = "UPLOAD_COVER_PICTURE"
export const GET_UPLOAD_PROFIL_ERRORS = "GET_UPLOAD_PROFIL_ERRORS"

/**
 * 
 * @param {*} data 
 * @param {*} userId 
 */

export const uploadCoverPicture = (data, userId) => {
    return async (dispatch) => {
        return await axios
            .post(`${process.env.REACT_APP_API_URL}api/user/${userId}/uploads/pictures/cover/`, data)
            .then((res) => {
                if (res.data.message) {
                    dispatch({ type: GET_UPLOAD_PROFIL_ERRORS, payload: res.data.message })
                } else {
                    return axios
                        .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
                        .then(res => {
                            dispatch({ type: UPLOAD_COVER_PICTURE, payload: res.data.cover_picture })
                        })
                }
            })
            .catch(err => console.log(err))
    }
}

export const DELETE_COVER_PICTURE = "DELETE_COVER_PICTURE"

/**
 * 
 * @param {*} userId 
 * @param {*} cover_picture 
 */

export const deleteCoverPicture = (userId, cover_picture) => {
    return async (dispatch) => {
        return await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/${userId}/uploads/pictures/cover/delete/`,
            data: { cover_picture },
        })
            .then(() => {
                dispatch({ type: DELETE_COVER_PICTURE, payload: `${process.env.REACT_APP_API_URL}api/files/img/random-cover.jpg` })
            })
            .catch(err => console.log(err))
    }
}
