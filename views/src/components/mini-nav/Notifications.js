import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Icon from "../tools/icons/Icon";
import ToolsMenu from "../tools/global/ToolsMenu";
import ContactRequest from "./notifications/ContactRequest";
import MemberRequest from "./notifications/MemberRequest";
import { setNotifSeen } from "../tools/functions/notifications";
import { addClass } from '../Utils'

const NotificationsMenu = ({ open, user, websocket }) => {
    const dispatch = useDispatch()

    const [navbar, setNavbar] = useState(1)
    const [notifications, setNotifications] = useState({
        read: user.notifications || [],
        unread: user?.notifications?.filter(element => element.seen !== true) || []
    })

    return (
        open && (
            <div className="notifications-menu">
                <div className="notifications-header">
                    <h5>Notifications</h5>
                    <ToolsMenu>
                        <div className="tools_choice">Tout marquer comme lu</div>
                        <div className="tools_choice">Voir toutes les notifications</div>
                    </ToolsMenu>
                </div>
                <div className="notifications-navbar">
                    <div className={addClass(navbar === 1, "active")} onClick={() => setNavbar(1)}>
                        Tout
                    </div>
                    <div className={addClass(navbar === 2, "active")} onClick={() => setNavbar(2)}>
                        Non lu
                    </div>
                </div>
                {user.notifications.length !== 0 && (
                    (navbar === 1 ? user.notifications : notifications.unread).map((element, key) => {
                        return (
                            <div key={key}>
                                {element.type === "contact-request" &&
                                    <ContactRequest
                                        notification={element}
                                        key={key}
                                        user={user}
                                        websocket={websocket}
                                        onClick={() => setNotifSeen(user._id, element._id, dispatch)}
                                    />
                                }
                                {element.type === "project-member-request" &&
                                    <MemberRequest
                                        notification={element}
                                        key={key}
                                        user={user}
                                        websocket={websocket}
                                        onClick={() => setNotifSeen(user._id, element._id, dispatch)}
                                    />
                                }
                            </div>
                        )
                    })
                )}
                {navbar === 1 && user.notifications.length === 0 &&
                    <div className="empty-notifications">
                        <Icon name="BoxEmpty" />
                        <div>Vous n'avez pas de nouvelles notifications</div>
                    </div>
                }
                {navbar === 2 && notifications.unread.length === 0 &&
                    <div className="empty-notifications">
                        <Icon name="BoxEmpty" />
                        <div>Vous n'avez pas de nouvelles notifications non lu</div>
                    </div>
                }
            </div>
        )
    )
}

export default NotificationsMenu;