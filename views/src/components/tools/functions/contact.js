import { acceptContactRequest, cancelContactRequest, deleteContact, refuseContactRequest, sendContactRequest } from "../../../reducers/user.action"
import { randomID } from "../../Utils"

/**
 * Send a contact request
 * @param {*} contact User to send request to
 * @param {*} user User that sends request
 * @param {*} websocket Websocket
 * @param {*} dispatch Redux dispatch function
 */

export const sendRequest = (contact, user, websocket, dispatch) => {
    const notification = {
        _id: randomID(24),
        type: "contact-request",
        requesterId: user._id,
        requester: user.pseudo,
        requesterPicture: user.picture,
        date: new Date().toISOString(),
        seen: false
    }
    websocket.current.emit("contactRequest", {
        receiverId: contact._id,
        notification: notification
    })
    dispatch(sendContactRequest(contact._id, user._id, notification))
}

/**
 * Cancel a contact request
 * @param {*} contact User to remove sent request from
 * @param {*} user User that cancel sent request
 * @param {*} websocket Websocket
 * @param {*} dispatch Redux dispatch function
 */

export const cancelRequest = (contact, user, websocket, dispatch) => {
    websocket.current.emit("cancelContactRequest", {
        type: "contact-request",
        requesterId: user._id,
        receiverId: contact._id
    })
    dispatch(cancelContactRequest(contact._id, user._id, "contact-request"))
}

/**
 * Accept a contact request
 * @param {*} request Request object
 * @param {*} user User that accepts request
 * @param {*} websocket Websocket
 * @param {*} dispatch Redux dispatch function
 */

export const acceptRequest = (request, user, websocket, dispatch) => {
    websocket.current.emit("acceptContactRequest", {
        contact: {
            _id: user._id,
            requestedAt: request.date
        },
        receiverId: request.requesterId
    })
    Object.assign(request, { state: "accepted" })
    dispatch(acceptContactRequest(request, user._id))
}

/**
 * Refuse a contact request
 * @param {*} request Request object
 * @param {*} user User that refuses request
 * @param {*} websocket Websocket
 * @param {*} dispatch Redux dispatch function
 */

export const refuseRequest = (request, user, websocket, dispatch) => {
    websocket.current.emit("refuseContactRequest", {
        userId: user._id,
        receiverId: request.requesterId
    })
    Object.assign(request, { state: "refused" })
    dispatch(refuseContactRequest(request, user._id))
}

/**
 * Remove a contact
 * @param {*} userId User ID of the user that removes contact
 * @param {*} contactId Contact ID of the removed contact
 * @param {*} websocket Websocket
 * @param {*} dispatch Redux dispatch function
 */

export const removeContact = (userId, contactId, websocket, dispatch) => {
    websocket.current.emit("deleteContact", {
        userId: userId,
        receiverId: contactId
    })
    dispatch(deleteContact(userId, contactId))
}