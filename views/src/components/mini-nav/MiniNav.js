import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { avatar } from "../tools/functions/useAvatar";
import { useClickOutside } from "../tools/functions/useClickOutside";
import { useDispatch } from "react-redux";
import { removeNotifications } from "../../actions/user.action";
import SettingsMenu from "./SettingsMenu";
import NotificationsMenu from "./notifications/Notifications";
import MessengerMenu from "./Messenger";
import { BsFillCaretDownFill } from 'react-icons/bs'
import { IoNotifications, IoChatboxEllipses } from 'react-icons/io5'
import { MdMessage } from "react-icons/md";

const MiniNav = ({ user, websocket }) => {
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
        <div className="mini-nav" ref={wrapperRef}>
            <ul className="mini-nav_ul">
                <li className="mini-nav-li">
                    <NavLink to="/profil" className="mini-nav-a">
                        <div className="mini-nav-avatar" style={avatar(user.picture)}></div>
                        <p className="mini-nav-pseudo">{user.pseudo}</p>
                    </NavLink>
                </li>
                <div className="bordered"></div>
                <li className="mini-nav-li">
                    <div className="mini-nav-button" onClick={() => { setOpenMessengerMenu(!openMessengerMenu); setOpenNotificationsMenu(false); setOpenSettingsMenu(false) }}>
                        <MdMessage />
                    </div>
                </li>
                <li className="mini-nav-li">
                    <div className="mini-nav-button" onClick={resetNotifications}>
                        {user.unseen_notifications > 0 && (
                            <div className="mini-badge">{user.unseen_notifications}</div>
                        )}
                        <IoNotifications />
                    </div>
                </li>
                <li className="mini-nav-li">
                    <div className="mini-nav-button" onClick={() => { setOpenSettingsMenu(!openSettingsMenu); setOpenMessengerMenu(false); setOpenNotificationsMenu(false) }}>
                        <BsFillCaretDownFill />
                    </div>
                </li>
            </ul>
            <SettingsMenu
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