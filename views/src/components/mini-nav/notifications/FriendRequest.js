import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import formatDistance from 'date-fns/formatDistance'
import fr from 'date-fns/locale/fr'
import { avatar } from "../../tools/hooks/useAvatar";
import { Button } from '../../tools/global/Button';
import { acceptRequest, refuseRequest } from '../../tools/functions/friend';

const FriendRequest = ({ notification, user, websocket, onClick, className }) => {
    const dispatch = useDispatch()

    return (
        <div className={`${className ? "notification-ticket " + className : "notification-ticket" }`} onClick={onClick}>
            <div className="left">
                <NavLink to={'/' + notification.requester}>
                    <div className="w-12 h-12 rounded-full" style={avatar(notification.requesterPicture)}></div>
                </NavLink>
            </div>
            <div className="right">
                {!notification.state &&
                    <>
                        <div className="notification-infos">
                            <NavLink to={'/' + notification.requester}>{notification.requester}</NavLink> vous a envoyé une demande d'ami
                        </div>
                        <div className="date">il y a {formatDistance(new Date(notification.date), new Date(), { locale: fr })}</div>
                        <div className="notification-actions">
                            <Button text="Accepter" onClick={() => acceptRequest(notification, user, websocket, dispatch)} />
                            <Button text="Refuser" onClick={() => refuseRequest(notification, user, websocket, dispatch)} />
                        </div>
                    </>
                }
                {notification.state === "accepted" &&
                    <div className="body">
                        <p><strong><NavLink to={'/' + notification.requester}>{notification.requester}</NavLink></strong> et vous êtes maintenant ami</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default FriendRequest