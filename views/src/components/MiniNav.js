import React, { useContext, useState } from "react";
import { useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";
import { BsFillCaretDownFill, BsChatRightTextFill } from 'react-icons/bs'
import { IoNotifications } from 'react-icons/io5'
import SettingsMenu from "./tools/SettingsMenu";

const MiniNav = () => {
    const userData = useSelector((state) => state.userReducer)
    const [isOpen, setOpen] = useState(true)
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
                            <NavLink to="/">
                                <BsChatRightTextFill />
                            </NavLink>
                        </li>
                        <li className="to-notifications">
                            <div>
                                <IoNotifications />
                            </div>
                        </li>
                        <li className="to-settings-menu" onClick={() => setOpen(!isOpen)}>
                            <div>
                                <BsFillCaretDownFill />
                            </div>
                        </li>
                    </ul>
                </div>
            <>
                {!isOpen && ( <SettingsMenu /> )}
            </>
        </>
    )
}

export default MiniNav;