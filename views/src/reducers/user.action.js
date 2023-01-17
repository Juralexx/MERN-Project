import axios from "axios";

/**
 * Get user
 */

export const GET_USER = "GET_USER"

/**
 * Get user profil
 * @param {*} uid User ID
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

export const UPDATE_USER = "UPDATE_USER"

/**
 * Update user informations
 * @param {*} userId New user ID
 * @param {*} name New user name
 * @param {*} lastname New user lastname
 * @param {*} work New user work
 * @param {*} bio New user bio
 * @param {*} location New user location
 * @param {*} phone New user phone
 * @param {*} networks New user networks
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
            .catch(err => console.log(err))
    }
}

export const UPDATE_EMAIL = "UPDATE_EMAIL"

/**
 * Update user email
 * @param {*} userId User ID
 * @param {*} email New user email
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
            .catch(err => console.log(err))
    }
}

export const UPDATE_THEME = "UPDATE_THEME"

/**
 * Update user theme
 * @param {*} userId User ID
 * @param {*} theme New user theme
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
            .catch(err => console.log(err))
    }
}

export const RESET_NOTIFICATIONS = "RESET_NOTIFICATIONS"

/**
 * Set notifications to 0
 * @param {*} userId User ID
 */

export const removeNotifications = (userId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/${userId}/notifications/reset/`,
        })
            .then(() => {
                dispatch({ type: RESET_NOTIFICATIONS, payload: { notifications: "0" } })
            })
            .catch(err => console.log(err))
    }
}

export const SET_NOTIFICATION_SEEN = "SET_NOTIFICATION_SEEN"

/**
 * Set seen state to a notification
 * @param {*} userId User ID
 * @param {*} notificationId Notification ID to remove
 */

export const setNotificationToSeen = (userId, notificationId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/${userId}/notifications/seen/`,
            data: { userId, notificationId }
        })
            .then(() => {
                dispatch({ type: SET_NOTIFICATION_SEEN, payload: { notificationId } })
            })
            .catch(err => console.log(err))
    }
}

export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION"

/**
 * Delete a notification
 * @param {*} userId User ID
 * @param {*} notificationId Notification ID to delete
 */

export const deleteNotification = (userId, notificationId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/${userId}/notifications/delete/`,
            data: { userId, notificationId }
        })
            .then(() => {
                dispatch({ type: DELETE_NOTIFICATION, payload: { notificationId } })
            })
            .catch(err => console.log(err))
    }
}

export const SEND_CONTACT_REQUEST = "SEND_CONTACT_REQUEST"

/**
 * Send a contact request
 * @param {*} contactId ID of the contact to send a notification to
 * @param {*} userId User ID
 * @param {*} notification Notification object
 */

export const sendContactRequest = (contactId, userId, notification) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/${userId}/contacts/request/send/`,
            data: { contactId, notification }
        })
            .then(() => {
                dispatch({ type: SEND_CONTACT_REQUEST, payload: { contactId, userId } })
            })
            .catch(err => console.log(err))
    }
}

export const RECEIVE_CONTACT_REQUEST = "RECEIVE_CONTACT_REQUEST"

/**
 * Receive the contact request
 * @param {*} notification Notification object
 */

export const receiveContactRequest = (notification) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_CONTACT_REQUEST, payload: { notification } })
    }
}

export const CANCEL_SENT_CONTACT_REQUEST = "CANCEL_SENT_CONTACT_REQUEST"

/**
 * Cancel a contact request
 * @param {*} contactId Contact ID 
 * @param {*} userId User ID
 * @param {*} type Type of the notification
 */

export const cancelContactRequest = (contactId, userId, type) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/${userId}/contacts/request/cancel/`,
            data: { contactId, type }
        })
            .then(() => {
                dispatch({ type: CANCEL_SENT_CONTACT_REQUEST, payload: { contactId, userId } })
            })
            .catch(err => console.log(err))
    }
}

export const RECEIVE_CANCEL_CONTACT_REQUEST = "RECEIVE_CANCEL_CONTACT_REQUEST"

/**
 * Receive the canceled contact request
 * @param {*} type Type of the notification
 * @param {*} requesterId ID of the requester
 */

export const receiveCancelContactRequest = (type, requesterId) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_CANCEL_CONTACT_REQUEST, payload: { type, requesterId } })
    }
}

export const ACCEPT_CONTACT_REQUEST = "ACCEPT_CONTACT_REQUEST"

/**
 * Accept contact request
 * @param {*} request Request object
 * @param {*} userId User ID
 */

export const acceptContactRequest = (request, userId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/${userId}/contacts/request/accept/`,
            data: { requesterId: request.requesterId, type: request.type }
        })
            .then(() => {
                dispatch({ type: ACCEPT_CONTACT_REQUEST, payload: { contact: { contact: request.requesterId, requestedAt: request.date } } })
            })
            .catch(err => console.log(err))
    }
}

export const RECEIVE_ACCEPT_CONTACT_REQUEST = "RECEIVE_ACCEPT_CONTACT_REQUEST"

/**
 * Receive contact request acceptation
 * @param {*} contact Contact added to user contacts
 */

export const receiveAcceptContactRequest = (contact) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_ACCEPT_CONTACT_REQUEST, payload: { contact } })
    }
}

export const REFUSE_CONTACT_REQUEST = "REFUSE_CONTACT_REQUEST"

/**
 * Refuse the contact request
 * @param {*} request Request object
 * @param {*} userId User ID
 */

export const refuseContactRequest = (request, userId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/${userId}/contacts/request/refuse/`,
            data: { requesterId: request.requesterId, type: request.type }
        })
            .then(() => {
                dispatch({ type: REFUSE_CONTACT_REQUEST, payload: {notificationId: request._id } })
            })
            .catch(err => console.log(err))
    }
}

export const RECEIVE_REFUSE_CONTACT_REQUEST = "RECEIVE_REFUSE_CONTACT_REQUEST"

/**
 * Receive contact request refus
 * @param {*} contactId Contact ID that refuses contact request
 */

export const receiveRefuseContactRequest = (contactId) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_REFUSE_CONTACT_REQUEST, payload: { contactId } })
    }
}

export const DELETE_CONTACT = "DELETE_CONTACT"

/**
 * Delete contact
 * @param {*} userId User ID
 * @param {*} contactId ID of the contact to delete
 */

export const deleteContact = (userId, contactId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/${userId}/delete-contact/`,
            data: { contactId }
        })
            .then(() => {
                dispatch({ type: DELETE_CONTACT, payload: { contactId } })
            })
            .catch(err => console.log(err))
    }
}

export const RECEIVE_DELETE_CONTACT = "RECEIVE_DELETE_CONTACT"

/**
 * Receive delete contact
 * @param {*} contactId ID of the contact that delete user from contact
 */

export const receiveDeleteContact = (contactId) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_CONTACT, payload: { contactId } })
    }
}