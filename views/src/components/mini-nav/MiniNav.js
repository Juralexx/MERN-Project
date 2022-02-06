import React, { useState } from "react";
import { useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";
import { BsFillCaretDownFill, BsChatRightTextFill } from 'react-icons/bs'
import { IoNotifications } from 'react-icons/io5'
import SettingsMenu from "../tools/SettingsMenu";
import NotificationsMenu from "./Notifications";

const MiniNav = () => {
    const userData = useSelector((state) => state.userReducer)
    const [openSettingsMenu, setOpenSettingsMenu] = useState(true)
    const [openNotificationsMenu, setOpenNotificationsMenu] = useState(true)
    const avatar = {
        backgroundImage: "url(" + userData.picture + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
    }

    return (
        <>
            <div className="mini-nav-container">
                <ul>
                    <li className="to-profil">
                        <NavLink to="/profil">
                            <div className="avatar" style={avatar}></div>
                            <p>{userData.pseudo}</p>
                        </NavLink>
                    </li>
                    <li className="to-messages">
                        <NavLink to="/messenger">
                            <BsChatRightTextFill />
                        </NavLink>
                    </li>
                    <li className="to-notifications" onClick={() => setOpenNotificationsMenu(!openNotificationsMenu)}>
                        <div>
                            <IoNotifications />
                        </div>
                    </li>
                    <li className="to-settings-menu" onClick={() => setOpenSettingsMenu(!openSettingsMenu)}>
                        <div>
                            <BsFillCaretDownFill />
                        </div>
                    </li>
                </ul>
            </div>
            <>
                {!openSettingsMenu && (<SettingsMenu />)}
            </>
            <>
                {!openNotificationsMenu && (<NotificationsMenu />)}
            </>
        </>
    )
}

export default MiniNav;