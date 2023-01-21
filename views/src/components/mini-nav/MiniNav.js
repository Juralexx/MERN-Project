import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../tools/icons/Icon";
import SettingsMenu from "./SettingsMenu";
import NotificationsMenu from "./Notifications";
import MessengerMenu from "./Messenger";
import { fullImage } from "../Utils";
import { useClickOutside } from "../tools/hooks/useClickOutside";
import { useDispatch } from "react-redux";
import { removeNotifications } from "../../reducers/user.action";
import OnlineUsers from "./OnlineUsers";

const MiniNav = ({ user, websocket, onlineUsers, onClick }) => {
    const [open, setOpen] = useState('')

    const wrapperRef = useRef()
    useClickOutside(wrapperRef, () => setOpen(''))
    const dispatch = useDispatch()

    const resetNotifications = () => {
        if (user.unseen_notifications > 0) {
            dispatch(removeNotifications(user._id))
        }
        setOpen(open === 'notifications' ? '' : 'notifications')
    }

    return (
        <div className="mini_nav" ref={wrapperRef} onClick={onClick}>
            <ul className="mini_nav-ul">
                <li className="mini_nav-li">
                    <NavLink to="/profil" className={({ isActive }) => (!isActive ? "mini_nav-a" : "mini_nav-a active")}>
                        <div className="mini_nav-avatar" style={fullImage(user.picture)}></div>
                        <p className="mini_nav-pseudo">{user.pseudo}</p>
                    </NavLink>
                </li>
                <div className="bordered"></div>
                <li className="mini_nav-li">
                    <div className="mini_nav-button" onClick={() => setOpen(open === 'messenger' ? '' : 'messenger')}>
                        <Icon name="Message" />
                    </div>
                </li>
                <li className="mini_nav-li">
                    <div className="mini_nav-button" onClick={() => resetNotifications()}>
                        {user.unseen_notifications > 0 && (
                            <div className="mini-badge">{user.unseen_notifications}</div>
                        )}
                        <Icon name="Notification" />
                    </div>
                </li>
                <li className="mini_nav-li">
                    <div className="mini_nav-button" onClick={() => setOpen(open === 'users' ? '' : 'users')}>
                        <Icon name="Group" />
                    </div>
                </li>
                <li className="mini_nav-li">
                    <div className="mini_nav-button" onClick={() => setOpen(open === 'settings' ? '' : 'settings')}>
                        <Icon name="DoubleCheckbox" />
                    </div>
                </li>
            </ul>
            <MessengerMenu
                user={user}
                websocket={websocket}
                open={open === 'messenger'}
                setOpen={setOpen}
            />
            <NotificationsMenu
                user={user}
                websocket={websocket}
                open={open === 'notifications'}
            />
            <OnlineUsers
                user={user}
                onlineUsers={onlineUsers}
                open={open === 'users'}
                setOpen={setOpen}
            />
            <SettingsMenu
                user={user}
                websocket={websocket}
                onlineUsers={onlineUsers}
                open={open === 'settings'}
            />
        </div>
    )
}

export default MiniNav;