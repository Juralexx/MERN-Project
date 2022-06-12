import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import FriendRequest from "./FriendRequest";
import MemberRequest from "./MemberRequest";
import { setNotifSeen } from "../../tools/functions/notifications";
import { addClass } from '../../Utils'
import ToolsMenu from "../../tools/global/ToolsMenu";
import { IoMdNotificationsOff } from 'react-icons/io'

const NotificationsMenu = ({ open, user, websocket }) => {
    const [navbar, setNavbar] = useState(1)
    const [unread, setUnread] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        if (user.notifications) {
            setUnread(user.notifications.filter(element => element.seen !== true))
        }
    }, [user.notifications])

    return (
        open && (
            <div className="notifications-menu">
                <div className="notifications-header">
                    <div className="title">Notifications</div>
                    <ToolsMenu>
                        <div className="tools_choice">Tout marquer comme lu</div>
                        <div className="tools_choice">Voir toutes les notifications</div>
                    </ToolsMenu>
                </div>
                <div className="notifications-navbar">
                    <div className={`navlink ${addClass(navbar === 1, "active")}`} onClick={() => setNavbar(1)}>Tout</div>
                    <div className={`navlink ${addClass(navbar === 2, "active")}`} onClick={() => setNavbar(2)}>Non lu</div>
                </div>
                {user.notifications.length !== 0 && (
                    (navbar === 1 ? user.notifications : unread).map((element, key) => {
                        return (
                            <div key={key}>
                                {element.type === "friend-request" &&
                                    <FriendRequest
                                        notification={element}
                                        key={key} user={user}
                                        websocket={websocket}
                                        onClick={() => setNotifSeen(user._id, element._id, dispatch)}
                                    />
                                }
                                {element.type === "project-member-request" &&
                                    <MemberRequest notification={element} key={key} user={user} websocket={websocket} onClick={() => setNotifSeen(user._id, element._id, dispatch)} />
                                }
                            </div>
                        )
                    })
                )}
                {navbar === 1 && user.notifications.length === 0 &&
                    <div className="empty-notifications">
                        <div><IoMdNotificationsOff /></div>
                        <div>Vous n'avez pas de nouvelles notifications</div>
                    </div>
                }
                {navbar === 2 && unread.length === 0 &&
                    <div className="empty-notifications">
                        <div><IoMdNotificationsOff /></div>
                        <div>Vous n'avez pas de nouvelles notifications non lu</div>
                    </div>
                }
            </div>
        )
    )
}

export default NotificationsMenu;