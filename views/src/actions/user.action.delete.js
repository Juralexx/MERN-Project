import axios from "axios";

export const DELETE_NAME = "DELETE_NAME"
export const DELETE_LASTNAME = "DELETE_LASTNAME"
export const DELETE_GENDER = "DELETE_GENDER"
export const DELETE_LOCATION = "DELETE_LOCATION"
export const DELETE_WORK = "DELETE_WORK"
export const DELETE_PHONE = "DELETE_PHONE"
export const DELETE_BIO = "DELETE_BIO"

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

export const deleteGender = (userId, gender) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/delete/gender/` + userId,
            data: { gender },
        })
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
                    .then((res) => {
                        dispatch({ type: DELETE_GENDER, payload: "Non défini" })
                    })
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