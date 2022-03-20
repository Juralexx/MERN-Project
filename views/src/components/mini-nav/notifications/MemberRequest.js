import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { acceptProjectMemberRequest, refuseProjectMemberRequest } from "../../../actions/project.action";
import formatDistance from 'date-fns/formatDistance'
import fr from 'date-fns/locale/fr'
import { avatar } from "../../tools/functions/useAvatar";
import { Button } from '../../tools/components/Button';
import axios from 'axios';

const MemberRequest = ({ notification, user, websocket }) => {
    const dispatch = useDispatch()

    const acceptMemberRequest = async (element) => {
        const member = { id: user._id, pseudo: user.pseudo, picture: user.picture, role: "user", since: new Date().toISOString() }
        await axios.get(`${process.env.REACT_APP_API_URL}api/project/single/${notification.projectId}`)
            .then(res => {
                res.data.members.map(async element => {
                    return await websocket.current.emit("acceptMemberProjectRequestNotification", {
                        member: member,
                        receiverId: element.id
                    })
                })
            })
        Object.assign(element, { state: "accepted" })
        dispatch(acceptProjectMemberRequest(user._id, member, element.projectId, element.type))
    }

    const refuseMemberRequest = (element) => {
        Object.assign(element, { state: "accepted" })
        dispatch(refuseProjectMemberRequest(user._id, element.projectId, element.type))
    }

    return (
        <div className="flex">
            <div className="mr-3">
                <NavLink to={'/' + notification.requester}>
                    <div className="w-12 h-12 rounded-full" style={avatar(notification.requesterPicture)}></div>
                </NavLink>
            </div>
            <div className="right">
                {!notification.state && (
                    <div className="body">
                        <p className="text-gray-500 dark:text-slate-300">
                            <strong><NavLink to={'/' + notification.requester}>{notification.requester}</NavLink></strong> vous invite a rejoindre le projet : {notification.projectTitle}<br />
                            <span className="text-primary">il y a {formatDistance(new Date(notification.date), new Date(), { locale: fr })}</span>
                        </p>
                        <div className="flex mt-3">
                            <Button text="Accepter" className="btn btn-primary" onClick={() => acceptMemberRequest(notification)} />
                            <Button text="Refuser" className="btn btn-secondary" onClick={() => refuseMemberRequest(notification)} />
                        </div>
                    </div>
                )}
                {notification.state === "accepted" && (
                    <div className="body">
                        <p>Vous avez rejoint le projet {notification.projectTitle} !</p>
                    </div>
                )}
                {notification.state === "refused" && (
                    <div className="body">
                        <p>Vous avez refusé d'adhérer au projet {notification.projectTitle}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MemberRequest