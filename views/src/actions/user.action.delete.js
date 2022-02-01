import axios from "axios";

export const DELETE_NAME = "DELETE_NAME"
export const DELETE_LASTNAME = "DELETE_LASTNAME"
export const DELETE_GENDER = "DELETE_GENDER"
export const DELETE_LOCATION = "DELETE_LOCATION"
export const DELETE_WORK = "DELETE_WORK"
export const DELETE_PHONE = "DELETE_PHONE"
export const DELETE_BIO = "DELETE_BIO"
export const DELETE_WEBSITE = "DELETE_WEBSITE"
export const DELETE_FACEBOOK = "DELETE_FACEBOOK"
export const DELETE_INSTAGRAM = "DELETE_INSTAGRAM"
export const DELETE_TWITTER = "DELETE_TWITTER"
export const DELETE_YOUTUBE = "DELETE_YOUTUBE"
export const DELETE_LINKEDIN = "DELETE_LINKEDIN"

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

export const deleteLocation = (userId, location, department, region, new_region) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/delete/location/` + userId,
            data: { location, department, region, new_region },
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

export const deleteWebsite = (userId, website) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/delete/website/` + userId,
            data: { website },
        })
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
                    .then((res) => {
                        dispatch({ type: DELETE_WEBSITE, payload: "" })
                    })
            })
            .catch((err) => console.log(err))
    }
}

export const deleteFacebook = (userId, facebook) => {
    return async (dispatch) => {
        return await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/delete/facebook/` + userId,
            data: { facebook },
        })
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
                    .then((res) => {
                        dispatch({ type: DELETE_FACEBOOK, payload: "" })
                    })
            })
            .catch((err) => console.log(err))
    }
}

export const deleteInstagram = (userId, instagram) => {
    return async (dispatch) => {
        return await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/delete/instagram/` + userId,
            data: { instagram },
        })
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
                    .then((res) => {
                        dispatch({ type: DELETE_INSTAGRAM, payload: "" })
                    })
            })
            .catch((err) => console.log(err))
    }
}

export const deleteTwitter = (userId, twitter) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/delete/twitter/` + userId,
            data: { twitter },
        })
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
                    .then((res) => {
                        dispatch({ type: DELETE_TWITTER, payload: "" })
                    })
            })
            .catch((err) => console.log(err))
    }
}

export const deleteYoutube = (userId, youtube) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/delete/youtube/` + userId,
            data: { youtube },
        })
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
                    .then((res) => {
                        dispatch({ type: DELETE_YOUTUBE, payload: "" })
                    })
            })
            .catch((err) => console.log(err))
    }
}

export const deleteLinkedin = (userId, linkedin) => {
    return async (dispatch) => {
        return await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/delete/linkedin/` + userId,
            data: { linkedin },
        })
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
                    .then((res) => {
                        dispatch({ type: DELETE_LINKEDIN, payload: "" })
                    })
            })
            .catch((err) => console.log(err))
    }
}