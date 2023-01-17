import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import formatDistance from 'date-fns/formatDistance'
import fr from 'date-fns/locale/fr'
import { Button } from '../../tools/global/Button';
import { acceptRequest, refuseRequest } from '../../tools/functions/contact';
import { fullImage } from '../../Utils'

const ContactRequest = ({ notification, user, websocket, onClick }) => {
    const dispatch = useDispatch()

    return (
        <div className={`${!notification.seen && !notification.state ? "notification-ticket unseen" : "notification-ticket" }`} onClick={onClick}>
            <div className="left">
                <NavLink to={'/' + notification.requester}>
                    <div className="w-12 h-12 rounded-full" style={fullImage(notification.requesterPicture)}></div>
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
                            <Button onClick={() => acceptRequest(notification, user, websocket, dispatch)}>Accepter</Button>
                            <Button onClick={() => refuseRequest(notification, user, websocket, dispatch)}>Refuser</Button>
                        </div>
                    </>
                }
                {notification.state === "accepted" &&
                    <div className="notification-infos">
                        <p><strong><NavLink to={'/' + notification.requester}>{notification.requester}</NavLink></strong> et vous êtes maintenant ami</p>
                        <div className="date">À l'instant</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ContactRequest