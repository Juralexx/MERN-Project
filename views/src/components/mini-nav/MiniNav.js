import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { BsFillCaretDownFill } from 'react-icons/bs'
import { IoNotifications, IoChatboxEllipses } from 'react-icons/io5'
import SettingsMenu from "./SettingsMenu";
import NotificationsMenu from "./notifications/Notifications";
import { avatar } from "../tools/functions/useAvatar";
import { useClickOutside } from "../tools/functions/useClickOutside";
import { useDispatch } from "react-redux";
import { removeNotifications } from "../../actions/user.action";

const MiniNav = ({ user, websocket }) => {
    const [openSettingsMenu, setOpenSettingsMenu] = useState(false)
    const [openNotificationsMenu, setOpenNotificationsMenu] = useState(false)
    const wrapperRef = useRef()
    useClickOutside(wrapperRef, setOpenSettingsMenu, false, setOpenNotificationsMenu, false)
    const dispatch = useDispatch()

    const resetNotifications = () => {
        setOpenNotificationsMenu(!openNotificationsMenu)
        if (user.unseen_notifications > 0) { dispatch(removeNotifications(user._id)) }
    }

    return (
        <div className="mini-nav" ref={wrapperRef}>
            <ul className="mini-nav-ul">
                <li className="mini-nav-li">
                    <NavLink to="/profil" className="mini-nav-a">
                        <div className="mini-nav-avatar" style={avatar(user.picture)}></div>
                        <p className="mini-nav-pseudo">{user.pseudo}</p>
                    </NavLink>
                </li>
                <li className="mini-nav-li">
                    <div className="mini-nav-button">
                        <IoChatboxEllipses />
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
                    <div className="mini-nav-button" onClick={() => setOpenSettingsMenu(!openSettingsMenu)}>
                        <BsFillCaretDownFill />
                    </div>
                </li>
            </ul>
            <SettingsMenu
                open={openSettingsMenu}
                setOpen={setOpenSettingsMenu}
            />
            <NotificationsMenu
                open={openNotificationsMenu}
                setOpen={setOpenNotificationsMenu}
                user={user}
                websocket={websocket}
            />
        </div>
    )
}

export default MiniNav;