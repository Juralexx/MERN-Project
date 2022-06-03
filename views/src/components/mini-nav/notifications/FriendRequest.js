import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import formatDistance from 'date-fns/formatDistance'
import fr from 'date-fns/locale/fr'
import { avatar } from "../../tools/hooks/useAvatar";
import { Button } from '../../tools/global/Button';
import { acceptRequest, refuseRequest } from '../../tools/functions/friend';

const FriendRequest = ({ notification, user, websocket, onClick }) => {
    const dispatch = useDispatch()

    return (
        <div className="flex" onClick={onClick}>
            <div className="mr-3">
                <NavLink to={'/' + notification.requester}>
                    <div className="w-12 h-12 rounded-full" style={avatar(notification.requesterPicture)}></div>
                </NavLink>
            </div>
            <div className="right">
                {!notification.state && (
                    <div className="body">
                        <p className="text-gray-500 text-justify dark:text-slate-300">
                            <strong><NavLink to={'/' + notification.requester}>{notification.requester}</NavLink></strong> vous a envoyé une demande d'ami<br />
                            <span className="text-primary">il y a {formatDistance(new Date(notification.date), new Date(), { locale: fr })}</span>
                        </p>
                        <div className="flex mt-3">
                            <Button text="Accepter" className="btn btn-primary" onClick={() => acceptRequest(notification, user, websocket, dispatch)} />
                            <Button text="Refuser" className="btn btn-secondary" onClick={() => refuseRequest(notification, user, websocket, dispatch)} />
                        </div>
                    </div>
                )}
                {notification.state === "accepted" && (
                    <div className="body">
                        <p><strong><NavLink to={'/' + notification.requester}>{notification.requester}</NavLink></strong> et vous êtes maintenant ami</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FriendRequest