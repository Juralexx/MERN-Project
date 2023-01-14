import { acceptFriendRequest, cancelFriendRequest, deleteFriend, refuseFriendRequest, sendFriendRequest } from "../../../actions/user.action"
import { randomID } from "../../Utils"

/**
 * Send a contact request
 * @param {*} friend User to send request to
 * @param {*} user User that sends request
 * @param {*} websocket Websocket
 * @param {*} dispatch Redux dispatch function
 */

export const sendRequest = (friend, user, websocket, dispatch) => {
    const notification = {
        _id: randomID(24),
        type: "friend-request",
        requesterId: user._id,
        requester: user.pseudo,
        requesterPicture: user.picture,
        date: new Date().toISOString(),
        seen: false
    }
    websocket.current.emit("friendRequest", {
        receiverId: friend._id,
        notification: notification
    })
    dispatch(sendFriendRequest(friend._id, user._id, notification))
}

/**
 * Cancel a contact request
 * @param {*} friend User to remove sent request from
 * @param {*} user User that cancel sent request
 * @param {*} websocket Websocket
 * @param {*} dispatch Redux dispatch function
 */

export const cancelRequest = (friend, user, websocket, dispatch) => {
    websocket.current.emit("cancelFriendRequest", {
        type: "friend-request",
        requesterId: user._id,
        receiverId: friend._id
    })
    dispatch(cancelFriendRequest(friend._id, user._id, "friend-request"))
}

/**
 * Accept a contact request
 * @param {*} request Request object
 * @param {*} user User that accepts request
 * @param {*} websocket Websocket
 * @param {*} dispatch Redux dispatch function
 */

export const acceptRequest = (request, user, websocket, dispatch) => {
    websocket.current.emit("acceptFriendRequest", {
        friend: {
            friend: user._id,
            requestedAt: request.date
        },
        receiverId: request.requesterId
    })
    Object.assign(request, { state: "accepted" })
    dispatch(acceptFriendRequest(request, user._id))
}

/**
 * Refuse a contact request
 * @param {*} request Request object
 * @param {*} user User that refuses request
 * @param {*} websocket Websocket
 * @param {*} dispatch Redux dispatch function
 */

export const refuseRequest = (request, user, websocket, dispatch) => {
    websocket.current.emit("refuseFriendRequest", {
        userId: user._id,
        receiverId: request.requesterId
    })
    Object.assign(request, { state: "refused" })
    dispatch(refuseFriendRequest(request, user._id))
}

/**
 * Remove a contact
 * @param {*} userId User ID of the user that removes contact
 * @param {*} friendId Contact ID of the removed contact
 * @param {*} websocket Websocket
 * @param {*} dispatch Redux dispatch function
 */

export const removeFriend = (userId, friendId, websocket, dispatch) => {
    websocket.current.emit("deleteFriend", {
        userId: userId,
        receiverId: friendId
    })
    dispatch(deleteFriend(userId, friendId))
}