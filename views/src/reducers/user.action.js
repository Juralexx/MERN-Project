import axios from "axios";

/**
 * Get user
 */

export const GET_USER = "GET_USER"

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

export const UPDATE_USER = "UPDATE_USER"

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
            .catch(err => console.log(err))
    }
}

/**
 * Update email
 */

export const UPDATE_EMAIL = "UPDATE_EMAIL"

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
            .catch(err => console.log(err))
    }
}

/**
 * Update theme
 */

export const UPDATE_THEME = "UPDATE_THEME"

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
            .catch(err => console.log(err))
    }
}

/*******************************************************************************************************************************/
/******************************************************* NOTIFICATIONS *********************************************************/

/**
 * Set notifications to 0
 */

export const RESET_NOTIFICATIONS = "RESET_NOTIFICATIONS"

export const removeNotifications = (userId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/reset-notifications/` + userId,
        })
            .then(() => {
                dispatch({ type: RESET_NOTIFICATIONS, payload: { notifications: "0" } })
            })
            .catch(err => console.log(err))
    }
}

/**
 * Set seen state to a notification
 */

export const SET_NOTIFICATION_SEEN = "SET_NOTIFICATION_SEEN"

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
            .catch(err => console.log(err))
    }
}

/**
 * Delete a notification
 */

export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION"

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
            .catch(err => console.log(err))
    }
}

/*******************************************************************************************************************************/
/***************************************************** CONTACT REQUEST **********************************************************/

/**
 * Send a contact request
 */

export const SEND_CONTACT_REQUEST = "SEND_CONTACT_REQUEST"

export const sendContactRequest = (contactId, userId, notification) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/send-contact-request/` + userId,
            data: { contactId, notification }
        })
            .then(() => {
                dispatch({ type: SEND_CONTACT_REQUEST, payload: { contactId, userId } })
            })
            .catch(err => console.log(err))
    }
}

/**
 * Receive the contact request
 */

export const RECEIVE_CONTACT_REQUEST = "RECEIVE_CONTACT_REQUEST"

export const receiveContactRequest = (notification) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_CONTACT_REQUEST, payload: { notification } })
    }
}

/**
 * Cancel a contact request
 */

export const CANCEL_SENT_CONTACT_REQUEST = "CANCEL_SENT_CONTACT_REQUEST"

export const cancelContactRequest = (contactId, userId, type) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/cancel-contact-request/` + userId,
            data: { contactId, type }
        })
            .then(() => {
                dispatch({ type: CANCEL_SENT_CONTACT_REQUEST, payload: { contactId, userId } })
            })
            .catch(err => console.log(err))
    }
}

/**
 * Receive the canceled contact request
 */

export const RECEIVE_CANCEL_CONTACT_REQUEST = "RECEIVE_CANCEL_CONTACT_REQUEST"

export const receiveCancelContactRequest = (type, requesterId) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_CANCEL_CONTACT_REQUEST, payload: { type, requesterId } })
    }
}

/**
 * Accept contact request
 */

export const ACCEPT_CONTACT_REQUEST = "ACCEPT_CONTACT_REQUEST"

export const acceptContactRequest = (request, userId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/accept-contact-request/` + userId,
            data: { requesterId: request.requesterId, type: request.type }
        })
            .then(() => {
                dispatch({ type: ACCEPT_CONTACT_REQUEST, payload: { contact: { contact: request.requesterId, requestedAt: request.date } } })
            })
            .catch(err => console.log(err))
    }
}

/**
 * Receive contact request acceptation
 */

export const RECEIVE_ACCEPT_CONTACT_REQUEST = "RECEIVE_ACCEPT_CONTACT_REQUEST"

export const receiveAcceptContactRequest = (contact) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_ACCEPT_CONTACT_REQUEST, payload: { contact } })
    }
}

/**
 * Refuse the contact request
 */

export const REFUSE_CONTACT_REQUEST = "REFUSE_CONTACT_REQUEST"

export const refuseContactRequest = (request, userId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/refuse-contact-request/` + userId,
            data: { requesterId: request.requesterId, type: request.type }
        })
            .then(() => {
                dispatch({ type: REFUSE_CONTACT_REQUEST, payload: {notificationId: request._id } })
            })
            .catch(err => console.log(err))
    }
}

/**
 * Receive contact request refus
 */

export const RECEIVE_REFUSE_CONTACT_REQUEST = "RECEIVE_REFUSE_CONTACT_REQUEST"

export const receiveRefuseContactRequest = (contactId) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_REFUSE_CONTACT_REQUEST, payload: { contactId } })
    }
}

/**
 * Delete contact
 */

export const DELETE_CONTACT = "DELETE_CONTACT"

export const deleteContact = (userId, contactId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/delete-contact/` + userId,
            data: { contactId }
        })
            .then(() => {
                dispatch({ type: DELETE_CONTACT, payload: { contactId } })
            })
            .catch(err => console.log(err))
    }
}

/**
 * Receive delete contact
 */

export const RECEIVE_DELETE_CONTACT = "RECEIVE_DELETE_CONTACT"

export const receiveDeleteContact = (contactId) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_CONTACT, payload: { contactId } })
    }
}