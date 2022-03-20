import { acceptFriendRequest, cancelFriendRequest, refuseFriendRequest, sendFriendRequest } from "../../../actions/user.action"

export const sendRequest = (friend, user, websocket, dispatch) => {
    const notification = { type: "friend-request", requesterId: user._id, requester: user.pseudo, requesterPicture: user.picture, date: new Date().toISOString() }
    websocket.current.emit("friendRequest", {
        receiverId: friend._id,
        notification: notification
    })
    dispatch(sendFriendRequest(friend._id, user._id, notification))
}

export const cancelRequest = (friend, user, websocket, dispatch) => {
    websocket.current.emit("cancelFriendRequest", {
        type: "friend-request",
        requesterId: user._id,
        receiverId: friend._id
    })
    dispatch(cancelFriendRequest(friend._id, user._id, "friend-request"))
}

export const acceptRequest = (request, user, websocket, dispatch) => {
    websocket.current.emit("acceptFriendRequest", {
        friend: user._id,
        receiverId: request.requesterId
    })
    Object.assign(request, { state: "accepted" })
    dispatch(acceptFriendRequest(request.requesterId, user._id, request.type, request))
}

export const refuseRequest = (request, user, websocket, dispatch) => {
    websocket.current.emit("refuseFriendRequest", {
        userId: user._id,
        receiverId: request.requesterId
    })
    Object.assign(request, { state: "refused" })
    dispatch(refuseFriendRequest(request.requesterId, user._id, request.type, request))
}