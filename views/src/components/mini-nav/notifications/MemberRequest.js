import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { MediumAvatar } from '../../tools/global/Avatars'
import { Button, TextButton } from '../../tools/global/Button';
import fr from 'date-fns/locale/fr'
import formatDistance from 'date-fns/formatDistance'
import { acceptProjectMemberRequest, refuseUserMemberRequest } from '../../tools/functions/member';

const MemberRequest = ({ notification, user, websocket, onClick }) => {
    const dispatch = useDispatch()

    return (
        <div className="notifications-menu-card" onClick={onClick}>
            <NavLink to={'/' + notification.requester.pseudo}>
                <MediumAvatar pic={notification.requester.picture} />
            </NavLink>
            {!notification.state &&
                <div className="notification-body">
                    <div className='notification-title'>
                        <NavLink to={'/' + notification.requester.pseudo} className="mr-1">
                            {notification.requester.pseudo}
                        </NavLink>
                        vous invite a rejoindre le projet&nbsp;: {notification.project.title}<br />
                    </div>
                    <div className="notification-date">
                        il y a {formatDistance(new Date(notification.date), new Date(), { locale: fr })}
                    </div>
                    <div className="notification-btn-container">
                        <Button onClick={() => acceptProjectMemberRequest(notification, user, websocket, dispatch)}>
                            Accepter
                        </Button>
                        <TextButton onClick={() => refuseUserMemberRequest(notification, user, websocket, dispatch)}>
                            Refuser
                        </TextButton>
                    </div>
                </div>
            }
            {!notification.seen &&
                <div className="notification-bubble"></div>
            }
            {notification.state === "accepted" &&
                <div className="notification-body">
                    <p>Vous avez rejoint le projet {notification.project.title} !</p>
                </div>
            }
        </div>
    )
}

export default MemberRequest