import axios from "axios";

export const GET_USER = "GET_USER"
export const UPDATE_USER = "UPDATE_USER"
export const UPDATE_EMAIL = "UPDATE_EMAIL"
export const UPDATE_THEME = "UPDATE_THEME"

export const RESET_NOTIFICATIONS = "RESET_NOTIFICATIONS"
export const SET_NOTIFICATION_SEEN = "SET_NOTIFICATION_SEEN"
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION"

export const SEND_FRIEND_REQUEST = "SEND_FRIEND_REQUEST"
export const RECEIVE_FRIEND_REQUEST = "RECEIVE_FRIEND_REQUEST"
export const CANCEL_SENT_FRIEND_REQUEST = "CANCEL_SENT_FRIEND_REQUEST"
export const RECEIVE_CANCEL_FRIEND_REQUEST = "RECEIVE_CANCEL_FRIEND_REQUEST"
export const ACCEPT_FRIEND_REQUEST = "ACCEPT_FRIEND_REQUEST"
export const RECEIVE_ACCEPT_FRIEND_REQUEST = "RECEIVE_ACCEPT_FRIEND_REQUEST"
export const REFUSE_FRIEND_REQUEST = "REFUSE_FRIEND_REQUEST"
export const RECEIVE_REFUSE_FRIEND_REQUEST = "RECEIVE_REFUSE_FRIEND_REQUEST"
export const DELETE_FRIEND = "DELETE_FRIEND"
export const RECEIVE_DELETE_FRIEND = "RECEIVE_DELETE_FRIEND"

/**
 * Get user
 */

export const getUser = (uid) => {
    return async (dispatch) => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
            .then((res) => {
                dispatch({ type: GET_USER, payload: res.data })
            })
            .catch(err => console.log(err))
    }
}

/**
 * Update user informations
 */

export const updateUser = (userId, name, lastname, work, bio, location, phone, networks) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: {
                name: name,
                lastname: lastname,
                work: work,
                bio: bio,
                location: location,
                phone: phone,
                networks: networks
            }
        })
            .then(() => {
                dispatch({ type: UPDATE_USER, payload: { name, lastname, work, bio, location, phone, networks } })
            })
            .catch((err) => console.log(err))
    }
}

/**
 * Update email
 */

export const updateEmail = (userId, email) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { email }
        })
            .then(() => {
                dispatch({ type: UPDATE_EMAIL, payload: email })
            })
            .catch((err) => console.log(err))
    }
}

/**
 * Update theme
 */

export const updateTheme = (userId, theme) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { theme }
        })
            .then(() => {
                dispatch({ type: UPDATE_THEME, payload: theme })
            })
            .catch((err) => console.log(err))
    }
}

/*******************************************************************************************************************************/
/******************************************************* NOTIFICATIONS *********************************************************/

/**
 * Set notifications to 0
 */

export const removeNotifications = (userId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/reset-notifications/` + userId,
        })
            .then(() => {
                dispatch({ type: RESET_NOTIFICATIONS, payload: { notifications: "0" } })
            })
            .catch((err) => console.log(err))
    }
}

/**
 * Set seen state to a notification
 */

export const setNotificationToSeen = (userId, notificationId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/notification-seen/` + userId,
            data: { userId, notificationId }
        })
            .then(() => {
                dispatch({ type: SET_NOTIFICATION_SEEN, payload: { notificationId } })
            })
            .catch((err) => console.log(err))
    }
}

/**
 * Delete a notification
 */

export const deleteNotification = (userId, notificationId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/delete-notification/` + userId,
            data: { userId, notificationId }
        })
            .then(() => {
                dispatch({ type: DELETE_NOTIFICATION, payload: { notificationId } })
            })
            .catch((err) => console.log(err))
    }
}

/*******************************************************************************************************************************/
/***************************************************** FRIEND REQUEST **********************************************************/

/**
 * Send a friend request
 */

export const sendFriendRequest = (friendId, userId, notification) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/send-friend-request/` + userId,
            data: { friendId, notification }
        })
            .then(() => {
                dispatch({ type: SEND_FRIEND_REQUEST, payload: { friendId, userId } })
            })
            .catch((err) => console.log(err))
    }
}

/**
 * Receive the friend request
 */

export const receiveFriendRequest = (notification) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_FRIEND_REQUEST, payload: { notification } })
    }
}

/**
 * Cancel a friend request
 */

export const cancelFriendRequest = (friendId, userId, type) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/cancel-friend-request/` + userId,
            data: { friendId, type }
        })
            .then(() => {
                dispatch({ type: CANCEL_SENT_FRIEND_REQUEST, payload: { friendId, userId } })
            })
            .catch((err) => console.log(err))
    }
}

/**
 * Receive the canceled friend request
 */

export const receiveCancelFriendRequest = (type, requesterId) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_CANCEL_FRIEND_REQUEST, payload: { type, requesterId } })
    }
}

/**
 * Accept friend request
 */

export const acceptFriendRequest = (request, userId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/accept-friend-request/` + userId,
            data: { requesterId: request.requesterId, type: request.type }
        })
            .then(() => {
                dispatch({ type: ACCEPT_FRIEND_REQUEST, payload: { friend: { friend: request.requesterId, requestedAt: request.date } } })
            })
            .catch((err) => console.log(err))
    }
}

/**
 * Receive friend request acceptation
 */

export const receiveAcceptFriendRequest = (friend) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_ACCEPT_FRIEND_REQUEST, payload: { friend } })
    }
}

/**
 * Refuse the friend request
 */

export const refuseFriendRequest = (request, userId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/refuse-friend-request/` + userId,
            data: { requesterId: request.requesterId, type: request.type }
        })
            .then(() => {
                dispatch({ type: REFUSE_FRIEND_REQUEST, payload: {notificationId: request._id } })
            })
            .catch((err) => console.log(err))
    }
}

/**
 * Receive friend request refus
 */

export const receiveRefuseFriendRequest = (friendId) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_REFUSE_FRIEND_REQUEST, payload: { friendId } })
    }
}

/**
 * Delete friend
 */

export const deleteFriend = (userId, friendId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/delete-friend/` + userId,
            data: { friendId }
        })
            .then(() => {
                dispatch({ type: DELETE_FRIEND, payload: { friendId } })
            })
            .catch(err => console.log(err))
    }
}

/**
 * Receive delete friend
 */

export const receiveDeleteFriend = (friendId) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_FRIEND, payload: { friendId } })
    }
}