import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { acceptFriendRequest, refuseFriendRequest } from "../../../actions/user.action";
import formatDistance from 'date-fns/formatDistance'
import fr from 'date-fns/locale/fr'
import { avatar } from "../../tools/functions/useAvatar";
import { Button } from '../../tools/components/Button';

const FriendRequest = ({ notification, uniqueKey, user }) => {
    const dispatch = useDispatch()
    const [accepted, setAccepted] = useState(false)
    const [refused, setRefused] = useState(false)

    const acceptRequest = (element) => {
        dispatch(acceptFriendRequest(element.sender, user._id, "friend-request"))
        setAccepted(true)
    }
    const refuseRequest = (element) => {
        dispatch(refuseFriendRequest(element.sender, user._id, "friend-request"))
        setRefused(true)
    }

    return (
        <div className="flex" key={uniqueKey}>
            <div className="mr-3">
                <NavLink to={'/' + notification.requester}>
                    <div className="w-12 h-12 rounded-full" style={avatar(notification.requesterPicture)}></div>
                </NavLink>
            </div>
            <div className="right">
                <div className="body">
                    <p className="text-gray-500 dark:text-slate-300">
                        <strong><NavLink to={'/' + notification.requester}>{notification.requester}</NavLink></strong> vous a envoyé une demande d'ami<br />
                        <span className="text-primary">il y a {formatDistance(new Date(notification.date), new Date(), { locale: fr })}</span>
                    </p>

                    <div className="flex mt-3">
                        <Button
                            text="Accepter"
                            className="btn btn-primary"
                            onClick={acceptRequest} />
                        <Button
                            text="Refuser"
                            className="btn btn-secondary"
                            onClick={refuseRequest} />
                    </div>
                </div>
                {accepted && (
                    <div className="body">
                        <p><strong><NavLink to={'/' + notification.requester}>{notification.requester}</NavLink></strong> et vous êtes maintenant ami</p>
                    </div>
                )}
                {refused && (
                    <div className="body">
                        <p><strong>Vous avez refusé la demande d'ami de <NavLink to={'/' + notification.requester}>{notification.requester}</NavLink></strong></p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FriendRequest