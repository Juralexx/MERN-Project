import axios from "axios";

export const UPLOAD_PICTURE = "UPLOAD_PICTURE"
export const DELETE_UPLOADED_PICTURE = "DELETE_UPLOADED_PICTURE"
export const UPLOAD_COVER_PICTURE = "UPLOAD_COVER_PICTURE"
export const DELETE_COVER_PICTURE = "DELETE_COVER_PICTURE"

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

export const deleteProfilPicture = (userId, picture) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/upload/delete/` + userId,
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

export const uploadCoverPicture = (data, id) => {
    return (dispatch) => {
        return axios
            .post(`${process.env.REACT_APP_API_URL}api/user/upload/cover`, data)
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
                    .then((res) => {
                        dispatch({ type: UPLOAD_COVER_PICTURE, payload: res.data.coverPicture })
                        console.log(res)
                    })
            })
            .catch((err) => console.log(err))
    }
}

export const deleteCoverPicture = (userId, coverPicture) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/upload/delete/cover/` + userId,
            data: { coverPicture },
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
