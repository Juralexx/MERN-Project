import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import FriendRequest from "./FriendRequest";
import MemberRequest from "./MemberRequest";
import { setNotifSeen } from "../../tools/functions/notifications";
import { IoMdNotificationsOff } from 'react-icons/io'
import ToolsMenu from "../../tools/global/ToolsMenu";

const NotificationsMenu = ({ open, user, websocket }) => {
    const [showUnread, setShowUnread] = useState(false)
    const [unread, setUnread] = useState([])
    const dispatch = useDispatch()
    useEffect(() => { if (user.notifications) { setUnread(user.notifications.filter(element => element.seen !== true)) } }, [user.notifications])

    return (
        open &&
        <div className="notifications-menu">
            <div className="notifications-header">
                <div className="title">Notifications</div>
                <ToolsMenu>
                    <div className="tools_choice">Tout marquer comme lu</div>
                    <div className="tools_choice">Voir toutes les notifications</div>
                </ToolsMenu>
            </div>
            <div className="notifications-navbar">
                <div className={`navlink ${showUnread ? "" : "active"}`} onClick={() => setShowUnread(false)}>Tout</div>
                <div className={`navlink ${showUnread ? "active" : ""}`} onClick={() => setShowUnread(true)}>Non lu</div>
            </div>
            {user.notifications.length !== 0 && (
                (!showUnread ? user.notifications : unread).map((element, key) => {
                    return (
                        <>
                            {(element.type === "friend-request") &&
                                <FriendRequest notification={element} key={key} user={user} websocket={websocket} onClick={() => setNotifSeen(user._id, element._id, dispatch)} />
                            }
                            {(element.type === "project-member-request") &&
                                <MemberRequest notification={element} key={key} user={user} websocket={websocket} onClick={() => setNotifSeen(user._id, element._id, dispatch)} />
                            }
                        </>
                    )
                })
            )}
            {!showUnread && user.notifications.length === 0 && (
                <div className="empty-notifications">
                    <div><IoMdNotificationsOff /></div>
                    <div>Vous n'avez pas de nouvelles notifications</div>
                </div>
            )}
            {showUnread && unread.length === 0 && (
                <div className="empty-notifications">
                    <div><IoMdNotificationsOff /></div>
                    <div>Vous n'avez pas de nouvelles notifications non lu</div>
                </div>
            )}
        </div>
    )
}

export default NotificationsMenu;