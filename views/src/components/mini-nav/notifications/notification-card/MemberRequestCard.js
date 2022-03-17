import React, { useState } from 'react'
import { acceptProjectMemberRequest, refuseProjectMemberRequest } from '../../../../actions/project.action'
import { useDispatch } from 'react-redux'
import { Button } from '../../../tools/components/Button'
import { avatar } from '../../../tools/functions/useAvatar'
import { FaUserFriends } from 'react-icons/fa'

const MemberRequestCard = ({ sentNotification, websocket, user }) => {
    const [accepted, setAccepted] = useState(false)
    const [refused, setRefused] = useState(false)
    const dispatch = useDispatch()

    const acceptMemberRequest = (element) => {
        const member = {
            id: user._id,
            pseudo: user.pseudo,
            picture: user.picture,
            role: "user",
            since: new Date().toISOString()
        }
        websocket.current.emit("cancelMemberProjectRequestNotification", {
            type: "project-member-request",
            requesterId: element.sender,
            receiverId: user._id
        })
        dispatch(acceptProjectMemberRequest(user._id, member, sentNotification.projectId, "project-member-request"))
        setAccepted(true)
    }
    const refuseMemberRequest = (element) => {
        websocket.current.emit("cancelMemberProjectRequestNotification", {
            type: "project-member-request",
            requesterId: element.sender,
            receiverId: user._id
        })
        dispatch(refuseProjectMemberRequest(user._id, sentNotification.projectId, "project-member-request"))
        setRefused(true)
    }

    return (
        sentNotification.type === "project-member-request" && (
            <div className="notification-message">
                <div className="top">
                    <FaUserFriends />
                    <div className="subject">Demande d'adhésion</div>
                    <div className="date">À l'instant</div>
                </div>
                {!accepted && !refused && (
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
                                onClick={() => acceptMemberRequest(sentNotification)}
                            />
                            <Button
                                text="Refuser"
                                className="btn btn-primary"
                                onClick={() => refuseMemberRequest(sentNotification)}
                            />
                        </div>
                    </>
                )}
                {accepted && (
                    <>
                        <div className="notification-content">
                            <div className="left">
                                <div className="sender">{sentNotification.requester}</div>
                                <div className="content">Vous avez rejoint le project {sentNotification.projectTitle} !</div>
                            </div>
                            <div className="right" style={avatar(sentNotification.requesterPicture)}></div>
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
                    </>
                )}
            </div>
        )
    )
}

export default MemberRequestCard