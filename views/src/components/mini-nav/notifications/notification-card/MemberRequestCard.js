import React, { useState } from 'react'
import axios from 'axios'
import { acceptMemberRequest, refuseMemberRequest } from '../../../../actions/project.action'
import { useDispatch } from 'react-redux'
import { Button } from '../../../tools/global/Button'
import { avatar } from '../../../tools/hooks/useAvatar'
import { FaUserFriends } from 'react-icons/fa'

const MemberRequestCard = ({ sentNotification, websocket, user }) => {
    const [accepted, setAccepted] = useState(false)
    const [refused, setRefused] = useState(false)
    const dispatch = useDispatch()

    const acceptProjectMemberRequest = async () => {
        const member = { id: user._id, pseudo: user.pseudo, picture: user.picture, role: "user", since: new Date().toISOString() }
        await axios.get(`${process.env.REACT_APP_API_URL}api/project/${sentNotification.projectId}`)
            .then(res => {
                res.data.members.map(member => {
                    return websocket.current.emit("acceptMemberRequest", {
                        member: member,
                        receiverId: member.id
                    })
                })
            })
        dispatch(acceptMemberRequest(user._id, member, sentNotification.projectId, "project-member-request"))
        setAccepted(true)
    }

    const refuseProjectMemberRequest = () => {
        dispatch(refuseMemberRequest(user._id, sentNotification.projectId, "project-member-request"))
        setRefused(true)
    }

    return (
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
                            onClick={() => acceptProjectMemberRequest(sentNotification)}
                        />
                        <Button
                            text="Refuser"
                            className="btn btn-primary"
                            onClick={() => refuseProjectMemberRequest(sentNotification)}
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
}

export default MemberRequestCard