import axios from "axios";

export const GET_USER = "GET_USER"
export const UPLOAD_PICTURE = "UPLOAD_PICTURE"
export const DELETE_UPLOADED_PICTURE = "DELETE_UPLOADED_PICTURE"
export const UPLOAD_COVER_PICTURE = "UPLOAD_COVER_PICTURE"
export const DELETE_COVER_PICTURE = "DELETE_COVER_PICTURE"
export const UPDATE_PSEUDO = "UPDATE_PSEUDO"
export const UPDATE_EMAIL = "UPDATE_EMAIL"
export const UPDATE_NAME = "UPDATE_NAME"
export const DELETE_NAME = "DELETE_NAME"
export const UPDATE_LASTNAME = "UPDATE_LASTNAME"
export const DELETE_LASTNAME = "DELETE_LASTNAME"
export const UPDATE_LOCATION = "UPDATE_LOCATION"
export const DELETE_LOCATION = "DELETE_LOCATION"
export const UPDATE_WORK = "UPDATE_WORK"
export const DELETE_WORK = "DELETE_WORK"
export const UPDATE_PHONE = "UPDATE_PHONE"
export const DELETE_PHONE = "DELETE_PHONE"
export const UPDATE_BIO = "UPDATE_BIO"
export const DELETE_BIO = "DELETE_BIO"

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
                dispatch({ type: UPDATE_EMAIL, payload: email })
            })
            .catch((err) => console.log(err))
    }
}

export const updateName = (userId, name) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { name },
        })
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
                    .then((res) => {
                        dispatch({ type: UPDATE_NAME, payload: name })
                    })
            })
            .catch((err) => console.log(err))
    }
}

export const deleteName = (userId, name) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/delete/name/` + userId,
            data: { name },
        })
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
                    .then((res) => {
                        dispatch({ type: DELETE_NAME, payload: "" })
                    })
            })
            .catch((err) => console.log(err))
    }
}

export const updateLastname = (userId, lastname) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { lastname },
        })
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
                    .then((res) => {
                        dispatch({ type: UPDATE_LASTNAME, payload: lastname })
                    })
            })
            .catch((err) => console.log(err))
    }
}

export const deleteLastname = (userId, lastname) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/delete/lastname/` + userId,
            data: { lastname },
        })
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
                    .then((res) => {
                        dispatch({ type: DELETE_LASTNAME, payload: "" })
                    })
            })
            .catch((err) => console.log(err))
    }
}

export const updateLocation = (userId, location) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { location }
        })
            .then((res) => {
                dispatch({ type: UPDATE_LOCATION, payload: location })
            })
            .catch((err) => console.log(err))
    }
}

export const deleteLocation = (userId, location) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/delete/location/` + userId,
            data: { location },
        })
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
                    .then((res) => {
                        dispatch({ type: DELETE_LOCATION, payload: "" })
                    })
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
                dispatch({ type: UPDATE_WORK, payload: work })
            })
            .catch((err) => console.log(err))
    }
}

export const deleteWork = (userId, work) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/delete/work/` + userId,
            data: { work },
        })
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
                    .then((res) => {
                        dispatch({ type: DELETE_WORK, payload: "" })
                    })
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
                dispatch({ type: UPDATE_PHONE, payload: phone })
            })
            .catch((err) => console.log(err))
    }
}

export const deletePhone = (userId, phone) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/delete/phone/` + userId,
            data: { phone },
        })
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
                    .then((res) => {
                        dispatch({ type: DELETE_PHONE, payload: "" })
                    })
            })
            .catch((err) => console.log(err))
    }
}

export const updateBio = (userId, bio) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { bio }
        })
            .then((res) => {
                dispatch({ type: UPDATE_BIO, payload: bio })
            })
            .catch((err) => console.log(err))
    }
}

export const deleteBio = (userId, bio) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/delete/bio/` + userId,
            data: { bio },
        })
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
                    .then((res) => {
                        dispatch({ type: DELETE_BIO, payload: "" })
                    })
            })
            .catch((err) => console.log(err))
    }
}