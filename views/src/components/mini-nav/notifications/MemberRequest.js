import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import formatDistance from 'date-fns/formatDistance'
import fr from 'date-fns/locale/fr'
import { avatar } from "../../tools/functions/useAvatar";
import { Button } from '../../tools/components/Button';
import { acceptProjectMemberRequest, refuseProjectMemberRequest } from '../../tools/functions/member';

const MemberRequest = ({ notification, user, websocket }) => {
    const dispatch = useDispatch()

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
                            <Button text="Accepter" className="btn btn-primary" onClick={() => acceptProjectMemberRequest(notification, user, websocket, dispatch)} />
                            <Button text="Refuser" className="btn btn-secondary" onClick={() => refuseProjectMemberRequest(notification, user, websocket, dispatch)} />
                        </div>
                    </div>
                )}
                {notification.state === "accepted" && (
                    <div className="body">
                        <p>Vous avez rejoint le projet {notification.projectTitle} !</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MemberRequest