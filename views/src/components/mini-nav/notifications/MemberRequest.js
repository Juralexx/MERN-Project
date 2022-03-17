import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { acceptProjectMemberRequest, refuseProjectMemberRequest } from "../../../actions/project.action";
import formatDistance from 'date-fns/formatDistance'
import fr from 'date-fns/locale/fr'
import { avatar } from "../../tools/functions/useAvatar";
import { Button } from '../../tools/components/Button';

const MemberRequest = ({ notification, uniqueKey, user }) => {
    const dispatch = useDispatch()
    const [accepted, setAccepted] = useState(false)
    const [refused, setRefused] = useState(false)

    const acceptMemberRequest = () => {
        const member = {
            id: user._id,
            pseudo: user.pseudo,
            picture: user.picture,
            role: "user",
            since: new Date().toISOString()
        }
        dispatch(acceptProjectMemberRequest(user._id, member, notification.projectId, "project-member-request"))
        setAccepted(true)
    }
    const refuseMemberRequest = () => {
        dispatch(refuseProjectMemberRequest(user._id, notification.projectId, "project-member-request"))
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
                        <strong><NavLink to={'/' + notification.requester}>{notification.requester}</NavLink></strong> vous invite a rejoindre le projet : {notification.projectTitle}<br />
                        <span className="text-primary">il y a {formatDistance(new Date(notification.date), new Date(), { locale: fr })}</span>
                    </p>

                    <div className="flex mt-3">
                        <Button
                            text="Accepter"
                            className="btn btn-primary"
                            onClick={acceptMemberRequest} />
                        <Button
                            text="Refuser"
                            className="btn btn-secondary"
                            onClick={refuseMemberRequest} />
                    </div>
                </div>
                {accepted && (
                    <div className="body">
                        <p>Vous avez rejoint le projet {notification.projectTitle} !</p>
                    </div>
                )}
                {refused && (
                    <div className="body">
                        <p>Vous avez refusé d'adhérer au projet {notification.projectTitle}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MemberRequest