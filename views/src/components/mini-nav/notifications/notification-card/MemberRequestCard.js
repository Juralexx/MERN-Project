import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import Icon from '../../../tools/icons/Icon';
import { Button } from '../../../tools/global/Button'
import { fullImage } from '../../../Utils'
//import { acceptMemberRequest, refuseMemberRequest } from '../../../../reducers/project.action'

const MemberRequestCard = ({ notification, websocket, user }) => {
    const [action, setAction] = useState('')
    const dispatch = useDispatch()

    const acceptProjectMemberRequest = async () => {
        const member = {
            _id: user._id,
            pseudo: user.pseudo,
            picture: user.picture,
            role: "user",
            since: new Date().toISOString()
        }
        await axios.get(`${process.env.REACT_APP_API_URL}api/project/${notification.project._id}`)
            .then(res => {
                res.data.members.map(member => {
                    return websocket.current.emit("acceptMemberRequest", {
                        member: member,
                        receiverId: member._id
                    })
                })
            })
        //dispatch(acceptMemberRequest(user._id, member, notification.project._id, "project-member-request"))
        setAction('accepted')
    }

    const refuseProjectMemberRequest = () => {
        //dispatch(refuseMemberRequest(user._id, notification.project._id, "project-member-request"))
        setAction('refused')
    }

    return (
        <div className="notification-message">
            <div className="top">
                <Icon name="Group" />
                <div className="subject">Demande d'adhésion</div>
                <div className="date">À l'instant</div>
            </div>
            {action === '' && (
                <>
                    <div className="notification-content">
                        <div className="left">
                            <div className="sender">{notification.requester.pseudo}</div>
                            <div className="content">
                                {notification.requester.pseudo} vous invite à rejoindre le project :<br />{notification.project.title}
                            </div>
                        </div>
                        <div className="right" style={fullImage(notification.requester.picture)}></div>
                    </div>
                    <div className="flex bottom">
                        <Button
                            className="btn btn-primary"
                            onClick={() => acceptProjectMemberRequest(notification)}
                        >
                            Accepter
                        </Button>
                        <Button
                            className="btn btn-primary"
                            onClick={() => refuseProjectMemberRequest(notification)}
                        >
                            Refuser
                        </Button>
                    </div>
                </>
            )}
            {action === 'accepted' && (
                <>
                    <div className="notification-content">
                        <div className="left">
                            <div className="sender">
                                {notification.requester}
                            </div>
                            <div className="content">
                                Vous avez rejoint le project {notification.project.title} !
                            </div>
                        </div>
                        <div className="right" style={fullImage(notification.requester.picture)}></div>
                    </div>
                </>
            )}
            {action === 'refused' && (
                <>
                    <div className="notification-content">
                        <div className="left">
                            <div className="sender">{notification.requester.pseudo}</div>
                            <div className="content">
                                Vous avez refuser le demande d'invitation de {notification.requester.pseudo}
                            </div>
                        </div>
                        <div className="right" style={fullImage(notification.requester.picture)}></div>
                    </div>
                </>
            )}
        </div>
    )
}

export default MemberRequestCard