import { acceptFriendRequest, cancelFriendRequest, deleteFriend, refuseFriendRequest, sendFriendRequest } from "../../../actions/user.action"
import { randomID } from "../../Utils"

/**
 * Send a friend request
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
 * Cancel a friend request
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
 * Accept a friend request
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
 * Refuse a friend request
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
 * Remove a friend
 */

export const removeFriend = (userId, friendId, websocket, dispatch) => {
    websocket.current.emit("deleteFriend", {
        userId: userId,
        receiverId: friendId
    })
    dispatch(deleteFriend(userId, friendId))
}