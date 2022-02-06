import axios from "axios";

export const GET_USER = "GET_USER"
export const UPDATE_PSEUDO = "UPDATE_PSEUDO"
export const UPDATE_EMAIL = "UPDATE_EMAIL"
export const UPDATE_NAME = "UPDATE_NAME"
export const UPDATE_LASTNAME = "UPDATE_LASTNAME"
export const UPDATE_GENDER = "UPDATE_GENDER"
export const UPDATE_LOCATION = "UPDATE_LOCATION"
export const UPDATE_WORK = "UPDATE_WORK"
export const UPDATE_PHONE = "UPDATE_PHONE"
export const UPDATE_BIO = "UPDATE_BIO"
export const UPDATE_THEME = "UPDATE_THEME"
export const UPDATE_WEBSITE = "UPDATE_WEBSITE"
export const UPDATE_FACEBOOK = "UPDATE_FACEBOOK"
export const UPDATE_INSTAGRAM = "UPDATE_INSTAGRAM"
export const UPDATE_TWITTER = "UPDATE_TWITTER"
export const UPDATE_YOUTUBE = "UPDATE_YOUTUBE"
export const UPDATE_LINKEDIN = "UPDATE_LINKEDIN"

export const SEND_FRIEND_REQUEST = "SEND_FRIEND_REQUEST"
export const CANCEL_SENT_FRIEND_REQUEST = "CANCEL_SENT_FRIEND_REQUEST"
export const ACCEPT_FRIEND_REQUEST = "ACCEPT_FRIEND_REQUEST"
export const REFUSE_FRIEND_REQUEST = "REFUSE_FRIEND_REQUEST"

export const getUser = (uid) => {
    return async (dispatch) => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
            .then((res) => {
                dispatch({ type: GET_USER, payload: res.data })
            })
            .catch((err) => console.log(err))
    }
}

export const updatePseudo = (userId, pseudo) => {
    return async (dispatch) => {
        await axios({
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
    return async (dispatch) => {
        await axios({
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

export const updateLastname = (userId, lastname) => {
    return async (dispatch) => {
        await axios({
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

export const updateGender = (userId, gender) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { gender },
        })
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
                    .then((res) => {
                        dispatch({ type: UPDATE_GENDER, payload: gender })
                    })
            })
            .catch((err) => console.log(err))
    }
}

export const updateLocation = (userId, location, department, region, new_region) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { location, department, region, new_region }
        })
            .then((res) => {
                dispatch({ type: UPDATE_LOCATION, location: location, department: department, region: region, new_region: new_region })
            })
            .catch((err) => console.log(err))
    }
}

export const updateWork = (userId, work) => {
    return async (dispatch) => {
        await axios({
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

export const updatePhone = (userId, phone) => {
    return async (dispatch) => {
        await axios({
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

export const updateBio = (userId, bio) => {
    return async (dispatch) => {
        await axios({
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

export const updateTheme = (userId, theme) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { theme }
        })
            .then((res) => {
                dispatch({ type: UPDATE_THEME, payload: theme })
            })
            .catch((err) => console.log(err))
    }
}

export const updateWebsite = (userId, website) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { website }
        })
            .then((res) => {
                dispatch({ type: UPDATE_WEBSITE, payload: website })
            })
            .catch((err) => console.log(err))
    }
}

export const updateFacebook = (userId, facebook) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { facebook }
        })
            .then((res) => {
                dispatch({ type: UPDATE_FACEBOOK, payload: facebook })
            })
            .catch((err) => console.log(err))
    }
}

export const updateInstagram = (userId, instagram) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { instagram }
        })
            .then((res) => {
                dispatch({ type: UPDATE_INSTAGRAM, payload: instagram })
            })
            .catch((err) => console.log(err))
    }
}

export const updateTwitter = (userId, twitter) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { twitter }
        })
            .then((res) => {
                dispatch({ type: UPDATE_TWITTER, payload: twitter })
            })
            .catch((err) => console.log(err))
    }
}

export const updateYoutube = (userId, youtube) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { youtube }
        })
            .then((res) => {
                dispatch({ type: UPDATE_YOUTUBE, payload: youtube })
            })
            .catch((err) => console.log(err))
    }
}

export const updateLinkedin = (userId, linkedin) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { linkedin }
        })
            .then((res) => {
                dispatch({ type: UPDATE_LINKEDIN, payload: linkedin })
            })
            .catch((err) => console.log(err))
    }
}

export const sendFriendRequest = (friendId, userId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/send-friend-request/` + userId,
            data: { friendId }
        })
            .then((res) => {
                dispatch({ type: SEND_FRIEND_REQUEST, payload: { friendId, userId } })
            })
            .catch((err) => console.log(err))
    }
}

export const cancelSentFriendRequest = (friendId, userId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/cancel-friend-request/` + userId,
            data: { friendId }
        })
            .then((res) => {
                dispatch({ type: CANCEL_SENT_FRIEND_REQUEST, payload: { friendId, userId } })
            })
            .catch((err) => console.log(err))
    }
}

export const acceptFriendRequest = (friendId, userId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/accept-friend-request/` + userId,
            data: { friendId }
        })
            .then((res) => {
                dispatch({ type: ACCEPT_FRIEND_REQUEST, payload: { friendId, userId } })
            })
            .catch((err) => console.log(err))
    }
}

export const refuseFriendRequest = (friendId, userId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/refuse-friend-request/` + userId,
            data: { friendId }
        })
            .then((res) => {
                dispatch({ type: REFUSE_FRIEND_REQUEST, payload: { friendId, userId } })
            })
            .catch((err) => console.log(err))
    }
}