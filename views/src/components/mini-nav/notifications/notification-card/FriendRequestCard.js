import React, { useState } from 'react'
import { acceptFriendRequest, refuseFriendRequest } from '../../../../actions/user.action'
import { useDispatch } from 'react-redux'
import { Button } from '../../../tools/components/Button'
import { FaUserFriends } from 'react-icons/fa'
import { avatar } from '../../../tools/functions/useAvatar'

const FriendRequestCard = ({ sentNotification, websocket, user }) => {
    const [accepted, setAccepted] = useState(false)
    const [refused, setRefused] = useState(false)
    const dispatch = useDispatch()

    const acceptRequest = (element) => {
        websocket.current.emit("cancelFriendRequestNotification", {
            type: "friend-request",
            requesterId: element.sender,
            receiverId: user._id
        })
        dispatch(acceptFriendRequest(element.sender, user._id, "friend-request"))
        setAccepted(true)
    }
    const refuseRequest = (element) => {
        websocket.current.emit("cancelFriendRequestNotification", {
            type: "friend-request",
            requesterId: element.sender,
            receiverId: user._id
        })
        dispatch(refuseFriendRequest(element.sender, user._id, "friend-request"))
        setRefused(true)
    }

    return (
        sentNotification.type === "friend-request" && (
            <div className="notification-message">
                <div className="top">
                    <FaUserFriends />
                    <div className="subject">Demande d'ami</div>
                    <div className="date">À l'instant</div>
                </div>
                {!accepted && !refused && (
                    <>
                        <div className="notification-content">
                            <div className="left">
                                <div className="sender">{sentNotification.requester}</div>
                                <div className="content">{sentNotification.requester} vous à envoyer une invitation</div>
                            </div>
                            <div className="right" style={avatar(sentNotification.requesterPicture)}></div>
                        </div>
                        <div className="flex bottom">
                            <Button
                                text="Accepter"
                                className="btn btn-primary"
                                onClick={() => acceptRequest(sentNotification)}
                            />
                            <Button
                                text="Refuser"
                                className="btn btn-primary"
                                onClick={() => refuseRequest(sentNotification)}
                            />
                        </div>
                    </>
                )}
                {refused && (
                    <>
                        <div className="notification-content">
                            <div className="left">
                                <div className="sender">{sentNotification.requester}</div>
                                <div className="content">Vous avez refuser le demande d'invitation de {sentNotification.requester}</div>
                            </div>
                            <div className="right" style={avatar(sentNotification.requesterPicture)}></div>
                        </div>
                        <div className="flex bottom"></div>
                    </>
                )}
                {accepted && (
                    <>
                        <div className="notification-content">
                            <div className="left">
                                <div className="sender">{sentNotification.requester}</div>
                                <div className="content">Vous et {sentNotification.requester} êtes maintenant ami !</div>
                            </div>
                            <div className="right" style={avatar(sentNotification.requesterPicture)}></div>
                        </div>
                        <div className="flex bottom"></div>
                    </>
                )}
            </div>
        )
    )
}

export default FriendRequestCard