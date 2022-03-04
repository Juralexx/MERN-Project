import React, { useState } from "react";
import { useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";
import { BsFillCaretDownFill, BsChatRightTextFill } from 'react-icons/bs'
import { IoNotifications } from 'react-icons/io5'
import SettingsMenu from "./SettingsMenu";
import NotificationsMenu from "./Notifications";
import { avatar } from "../tools/functions/useAvatar";

const MiniNav = () => {
    const userData = useSelector((state) => state.userReducer)
    const [openSettingsMenu, setOpenSettingsMenu] = useState(true)
    const [openNotificationsMenu, setOpenNotificationsMenu] = useState(true)

    const classes = {
        container: "absolute top-0 right-0 h-[60px] w-auto flex mr-5",
        ul: "relative flex justify-center items-center list-none m-0 p-0",
        li: "group flex h-full min-w-[50px] justify-center items-center cursor-pointer",
        avatar: "w-[26px] h-[26px] rounded-lg mt-1 mb-1 mx-auto group-hover:ring-1 group-hover:ring-primary",
        a: "!no-underline h-full w-full text-slate-300 flex flex-col items-center justify-center py-0 px-3 border-b-2 border-b-transparent group-hover:border-b-primary group-hover:text-slate-300 mr-3",
        button: "h-11 w-11 bg-background_primary_light text-slate-300 flex flex-col items-center justify-center rounded-full hover:bg-background_primary_x_light"
    }

    return (
        <>
            <div className={classes.container}>
                <ul className={classes.ul}>
                    <li className={classes.li}>
                        <NavLink to="/profil" className={classes.a}>
                            <div className={classes.avatar} style={avatar(userData.picture)}></div>
                            <p className="m-0 leading-[16px] text-[16px]">{userData.pseudo}</p>
                        </NavLink>
                    </li>
                    <li className={classes.li}>
                        <div className={classes.button}>
                            <BsChatRightTextFill />
                        </div>
                    </li>
                    <li className={classes.li} onClick={() => setOpenNotificationsMenu(!openNotificationsMenu)}>
                        <div className={classes.button}>
                            <IoNotifications />
                        </div>
                    </li>
                    <li className={classes.li} onClick={() => setOpenSettingsMenu(!openSettingsMenu)}>
                        <div className={classes.button}>
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