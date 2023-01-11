import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import formatDistance from 'date-fns/formatDistance'
import fr from 'date-fns/locale/fr'
import { Button } from '../../tools/global/Button';
import { acceptProjectMemberRequest, refuseProjectMemberRequest } from '../../tools/functions/member';
import { deleteNotif } from '../../tools/functions/notifications';
import { fullImage } from '../../Utils'
import Icon from '../../tools/icons/Icon'

const MemberRequest = ({ notification, user, websocket, onClick }) => {
    const [hovered, setHovered] = useState(false)
    const dispatch = useDispatch()

    return (
        <div className="relative px-2 py-1 rounded-lg cursor-pointer hover:bg-background_primary_x_light z-90" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <div className="flex relative" onClick={onClick}>
                <div className="mr-3">
                    <NavLink to={'/' + notification.requester}>
                        <div className="w-14 h-14 rounded-full" style={fullImage(notification.requesterPicture)}></div>
                    </NavLink>
                </div>
                <div className="right">
                    {!notification.state && (
                        <div className="body">
                            <div className="text-sm text-gray-500 three_lines dark:text-slate-300" style={{ display: "-webkit-box", WebkitLineClamp: 3 }}>
                                <strong><NavLink to={'/' + notification.requester}>{notification.requester}</NavLink></strong> vous invite a rejoindre le projet&nbsp;: {notification.projectTitle}<br />
                            </div>
                            <div className="text-primary text-sm">il y a {formatDistance(new Date(notification.date), new Date(), { locale: fr })}</div>
                            <div className="flex mt-3">
                                <Button className="btn btn-primary" onClick={() => acceptProjectMemberRequest(notification, user, websocket, dispatch)}>Accepter</Button>
                                <Button className="btn btn-secondary" onClick={() => refuseProjectMemberRequest(notification, user, websocket, dispatch)}>Refuser</Button>
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
            {notification.seen === false && !notification.state && (
                <div className="absolute right-2 top-1/2 translate-y-[-50%] h-4 w-4 rounded-full bg-primary"></div>
            )}
            {hovered && (
                <Icon name="Cross" onClick={() => {
                    deleteNotif(user._id, notification._id, dispatch)
                    refuseProjectMemberRequest(notification, user, websocket, dispatch)
                }} />
            )}
        </div>
    )
}

export default MemberRequest