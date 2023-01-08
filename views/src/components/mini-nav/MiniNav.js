import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { avatar } from "../tools/hooks/useAvatar";
import { useClickOutside } from "../tools/hooks/useClickOutside";
import { useDispatch } from "react-redux";
import { removeNotifications } from "../../actions/user.action";
import SettingsMenu from "./SettingsMenu";
import NotificationsMenu from "./notifications/Notifications";
import MessengerMenu from "./Messenger";
import { MdOutlineMessage, MdOutlineNotificationsActive, MdOutlineKeyboardArrowDown } from "react-icons/md";

const MiniNav = ({ user, websocket, onlineUsers, onClick }) => {
    const [openSettingsMenu, setOpenSettingsMenu] = useState(false)
    const [openNotificationsMenu, setOpenNotificationsMenu] = useState(false)
    const [openMessengerMenu, setOpenMessengerMenu] = useState(false)
    const wrapperRef = useRef()
    useClickOutside(wrapperRef, setOpenSettingsMenu, false, setOpenNotificationsMenu, false, setOpenMessengerMenu, false)
    const dispatch = useDispatch()

    const resetNotifications = () => {
        setOpenNotificationsMenu(!openNotificationsMenu)
        setOpenMessengerMenu(false)
        setOpenSettingsMenu(false)
        if (user.unseen_notifications > 0) { dispatch(removeNotifications(user._id)) }
    }

    return (
        <div className="mini_nav" ref={wrapperRef} onClick={onClick}>
            <ul className="mini_nav-ul">
                <li className="mini_nav-li">
                    <NavLink to="/profil" className={({ isActive }) => (!isActive ? "mini_nav-a" : "mini_nav-a active")}>
                        <div className="mini_nav-avatar" style={avatar(user.picture)}></div>
                        <p className="mini_nav-pseudo">{user.pseudo}</p>
                    </NavLink>
                </li>
                <div className="bordered"></div>
                <li className="mini_nav-li">
                    <div className="mini_nav-button" onClick={() => { setOpenMessengerMenu(!openMessengerMenu); setOpenNotificationsMenu(false); setOpenSettingsMenu(false) }}>
                        <MdOutlineMessage />
                    </div>
                </li>
                <li className="mini_nav-li">
                    <div className="mini_nav-button" onClick={resetNotifications}>
                        {user.unseen_notifications > 0 && (
                            <div className="mini-badge">{user.unseen_notifications}</div>
                        )}
                        <MdOutlineNotificationsActive />
                    </div>
                </li>
                <li className="mini_nav-li">
                    <div className="mini_nav-button" onClick={() => { setOpenSettingsMenu(!openSettingsMenu); setOpenMessengerMenu(false); setOpenNotificationsMenu(false) }}>
                        <MdOutlineKeyboardArrowDown />
                    </div>
                </li>
            </ul>
            <SettingsMenu
                user={user}
                websocket={websocket}
                onlineUsers={onlineUsers}
                open={openSettingsMenu}
                setOpen={setOpenSettingsMenu}
            />
            <NotificationsMenu
                user={user}
                websocket={websocket}
                open={openNotificationsMenu}
                setOpen={setOpenNotificationsMenu}
            />
            <MessengerMenu
                user={user}
                websocket={websocket}
                open={openMessengerMenu}
                setOpen={setOpenMessengerMenu}
            />
        </div>
    )
}

export default MiniNav;