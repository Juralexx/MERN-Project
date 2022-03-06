import React, { useState, useRef } from "react";
import { useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";
import { BsFillCaretDownFill, BsChatRightTextFill } from 'react-icons/bs'
import { IoNotifications } from 'react-icons/io5'
import SettingsMenu from "./SettingsMenu";
import NotificationsMenu from "./Notifications";
import { avatar } from "../tools/functions/useAvatar";
import { useClickOutside } from "../tools/functions/useClickOutside";

const MiniNav = () => {
    const userData = useSelector((state) => state.userReducer)
    const [openSettingsMenu, setOpenSettingsMenu] = useState(false)
    const [openNotificationsMenu, setOpenNotificationsMenu] = useState(false)
    const wrapperRef = useRef()
    useClickOutside(wrapperRef, setOpenSettingsMenu, false, setOpenNotificationsMenu, false)

    const classes = {
        container: "absolute top-0 right-0 h-[60px] w-auto flex mr-5",
        ul: "relative flex justify-center items-center list-none m-0 p-0",
        li: "group flex h-full min-w-[50px] justify-center items-center cursor-pointer",
        avatar: "w-[26px] h-[26px] rounded-full mt-1 mb-1 mx-auto",
        a: "!no-underline h-full w-full flex flex-col items-center justify-center py-0 px-3 border-b-2 border-b-transparent group-hover:border-b-primary text-slate-500 dark:text-slate-300 group-hover:text-slate-500 dark:group-hover:text-slate-300 mr-3",
        button: "h-11 w-11 bg-slate-100 dark:bg-background_primary_light hover:bg-slate-200 dark:hover:bg-background_primary_x_light text-slate-500 dark:text-slate-300 flex flex-col items-center justify-center rounded-full"
    }

    return (
        <div >
            <div className={classes.container} ref={wrapperRef}>
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
                    <li className={classes.li}>
                        <div className={classes.button} onClick={() => setOpenNotificationsMenu(!openNotificationsMenu)}>
                            <IoNotifications />
                        </div>
                    </li>
                    <li className={classes.li}>
                        <div className={classes.button} onClick={() => setOpenSettingsMenu(!openSettingsMenu)}>
                            <BsFillCaretDownFill />
                        </div>
                    </li>
                </ul>
                <SettingsMenu open={openSettingsMenu} setOpen={setOpenSettingsMenu} />
                <NotificationsMenu open={openNotificationsMenu} setOpen={setOpenNotificationsMenu} />
            </div>
        </div>
    )
}

export default MiniNav;