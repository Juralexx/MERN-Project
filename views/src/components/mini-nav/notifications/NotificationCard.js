import React, { useEffect, useState } from 'react'
import { BsChatRightTextFill } from 'react-icons/bs'
import { FaUserFriends } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { acceptFriendRequest, refuseFriendRequest } from '../../../actions/user.action'
import { convertDeltaToHTML } from '../../messenger/tools/function'
import { Button } from '../../tools/components/Button'
import { avatar } from '../../tools/functions/useAvatar'

const NotificationCard = ({ sentNotification, setSend, send, user, websocket }) => {
    const [acceptedFriendRequest, setAcceptedFriendRequest] = useState(false)
    const [refusedFriendRequest, setRefusedFriendRequest] = useState(false)
    const [acceptedProjectMemberRequest, setAcceptedProjectMemberRequest] = useState(false)
    const [refusedProjectMemberRequest, setRefusedProjectMemberRequest] = useState(false)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     let interval
    //     if (send) {
    //         interval = setInterval(() => { setSend(false) }, 5000)
    //     } else clearInterval(interval)
    //     return () => clearInterval(interval)
    // }, [send, setSend])

    const refuseRequest = (element) => {
        websocket.current.emit("cancelFriendRequestNotification", {
            type: "friend-request",
            requesterId: element.sender,
            receiverId: user._id
        })
        dispatch(acceptFriendRequest(element.sender, user._id, "friend-request"))
        setAcceptedFriendRequest(true)
    }
    const acceptRequest = (element) => {
        websocket.current.emit("cancelFriendRequestNotification", {
            type: "friend-request",
            requesterId: element.sender,
            receiverId: user._id
        })
        dispatch(refuseFriendRequest(element.sender, user._id, "friend-request"))
        setRefusedFriendRequest(true)
    }

    return (
        Object.keys(sentNotification).length !== 0 && (
            <>
                {sentNotification.type === "new-message" && (
                    <div className="notification-message">
                        <div className="top">
                            <BsChatRightTextFill />
                            <div className="subject">Messages</div>
                            <div className="date">now</div>
                        </div>
                        <div className="notification-content">
                            <div className="left">
                                <div className="sender">{sentNotification.sender_pseudo}</div>
                                <div className="content" dangerouslySetInnerHTML={convertDeltaToHTML(sentNotification.text[0])}></div>
                            </div>
                            <div className="right" style={avatar(sentNotification.sender_picture)}></div>
                        </div>
                        <div className="bottom">
                            <button>Répondre</button>
                            <button onClick={() => setSend(false)}>Fermer</button>
                        </div>
                    </div>
                )}

                {sentNotification.type === "friend-request" && (
                    <div className="notification-message">
                        <div className="top">
                            <FaUserFriends />
                            <div className="subject">Demande d'ami</div>
                            <div className="date">À l'instant</div>
                        </div>
                        {!acceptedFriendRequest && !refusedFriendRequest && (
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
                                        onClick={() => refuseRequest(sentNotification)}
                                    />
                                    <Button
                                        text="Refuser"
                                        className="btn btn-primary"
                                        onClick={() => acceptRequest(sentNotification)}
                                    />
                                </div>
                            </>
                        )}
                        {refusedFriendRequest && (
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
                        {acceptedFriendRequest && (
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
                )}

                {sentNotification.type === "project-member-request" && (
                    <div className="notification-message">
                        <div className="top">
                            <FaUserFriends />
                            <div className="subject">Demande d'adhésion</div>
                            <div className="date">À l'instant</div>
                        </div>
                        {!acceptedProjectMemberRequest && !refusedProjectMemberRequest && (
                            <>
                                <div className="notification-content">
                                    <div className="left">
                                        <div className="sender">{sentNotification.requester}</div>
                                        <div className="content">{sentNotification.requester} vous invite à rejoindre le project :<br />{sentNotification.projectTitle}</div>
                                    </div>
                                    <div className="right" style={avatar(sentNotification.requesterPicture)}></div>
                                </div>
                                <div className="flex bottom">
                                    <Button
                                        text="Accepter"
                                        className="btn btn-primary"
                                        onClick={() => refuseRequest(sentNotification)}
                                    />
                                    <Button
                                        text="Refuser"
                                        className="btn btn-primary"
                                        onClick={() => acceptRequest(sentNotification)}
                                    />
                                </div>
                            </>
                        )}
                        {acceptedProjectMemberRequest && (
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
                        {refusedProjectMemberRequest && (
                            <>
                                <div className="notification-content">
                                    <div className="left">
                                        <div className="sender">{sentNotification.requester}</div>
                                        <div className="content">Vous avez rejoint le project {sentNotification.projectTitle} !</div>
                                    </div>
                                    <div className="right" style={avatar(sentNotification.requesterPicture)}></div>
                                </div>
                                <div className="flex bottom"></div>
                            </>
                        )}
                    </div>
                )}
            </>
        )
    )
}

export default NotificationCard