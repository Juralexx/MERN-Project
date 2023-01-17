import React, { useState } from 'react'
import axios from 'axios'
import { acceptMemberRequest, refuseMemberRequest } from '../../../../reducers/project.action'
import { useDispatch } from 'react-redux'
import { Button } from '../../../tools/global/Button'
import { fullImage } from '../../../Utils'
import Icon from '../../../tools/icons/Icon';

const MemberRequestCard = ({ notification, websocket, user }) => {
    const [accepted, setAccepted] = useState(false)
    const [refused, setRefused] = useState(false)
    const dispatch = useDispatch()

    const acceptProjectMemberRequest = async () => {
        const member = { id: user._id, pseudo: user.pseudo, picture: user.picture, role: "user", since: new Date().toISOString() }
        await axios.get(`${process.env.REACT_APP_API_URL}api/project/${notification.projectId}`)
            .then(res => {
                res.data.members.map(member => {
                    return websocket.current.emit("acceptMemberRequest", {
                        member: member,
                        receiverId: member._id
                    })
                })
            })
        dispatch(acceptMemberRequest(user._id, member, notification.projectId, "project-member-request"))
        setAccepted(true)
    }

    const refuseProjectMemberRequest = () => {
        dispatch(refuseMemberRequest(user._id, notification.projectId, "project-member-request"))
        setRefused(true)
    }

    return (
        <div className="notification-message">
            <div className="top">
                <Icon name="Group" />
                <div className="subject">Demande d'adhésion</div>
                <div className="date">À l'instant</div>
            </div>
            {!accepted && !refused && (
                <>
                    <div className="notification-content">
                        <div className="left">
                            <div className="sender">{notification.requester}</div>
                            <div className="content">{notification.requester} vous invite à rejoindre le project :<br />{notification.projectTitle}</div>
                        </div>
                        <div className="right" style={fullImage(notification.requesterPicture)}></div>
                    </div>
                    <div className="flex bottom">
                        <Button
                            className="btn btn-primary"
                            onClick={() => acceptProjectMemberRequest(notification)}
                        >Accepter</Button>
                        <Button
                            className="btn btn-primary"
                            onClick={() => refuseProjectMemberRequest(notification)}
                        >Refuser</Button>
                    </div>
                </>
            )}
            {accepted && (
                <>
                    <div className="notification-content">
                        <div className="left">
                            <div className="sender">{notification.requester}</div>
                            <div className="content">Vous avez rejoint le project {notification.projectTitle} !</div>
                        </div>
                        <div className="right" style={fullImage(notification.requesterPicture)}></div>
                    </div>
                </>
            )}
            {refused && (
                <>
                    <div className="notification-content">
                        <div className="left">
                            <div className="sender">{notification.requester}</div>
                            <div className="content">Vous avez refuser le demande d'invitation de {notification.requester}</div>
                        </div>
                        <div className="right" style={fullImage(notification.requesterPicture)}></div>
                    </div>
                </>
            )}
        </div>
    )
}

export default MemberRequestCard