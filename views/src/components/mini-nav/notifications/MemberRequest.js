import React, { useState, useContext } from 'react'
import { UidContext } from '../../AppContext';
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { acceptProjectMemberRequest, refuseProjectMemberRequest } from "../../../actions/user.action";
import formatDistance from 'date-fns/formatDistance'
import fr from 'date-fns/locale/fr'
import { avatar } from "../../tools/functions/useAvatar";
import { Button } from '../../tools/components/Button';

const MemberRequest = ({ notification, uniqueKey }) => {
    const uid = useContext(UidContext)
    const dispatch = useDispatch()
    const [accepted, setAccepted] = useState(false)
    const [refused, setRefused] = useState(false)

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
                            onClick={() => {
                                dispatch(acceptProjectMemberRequest(notification.requesterId, uid, "project-member-request"))
                                setAccepted(true)
                            }} />
                        <Button
                            text="Refuser"
                            className="btn btn-secondary"
                            onClick={() => {
                                dispatch(refuseProjectMemberRequest(notification.requesterId, uid, "project-member-request"))
                                setRefused(true)
                            }} />
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