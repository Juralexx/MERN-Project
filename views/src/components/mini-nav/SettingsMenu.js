import React, { useRef, useState } from "react";
import axios from "axios";
import cookie from "js-cookie"
import { HiLogout } from 'react-icons/hi'
import { AiFillSetting } from 'react-icons/ai'
import { BsFillSunFill } from 'react-icons/bs'
import { IoCaretForwardOutline } from 'react-icons/io5'
import ScreenMenu from "./ScreenMenu";
import { useClickOutside } from "../tools/functions/useClickOutside";

const SettingsMenu = () => {
    const [isOpen, setOpen] = useState(true)
    const [isScreenMenu, setScreenMenu] = useState(false)
    const settingsWrapper = useRef()
    useClickOutside(settingsWrapper, setOpen, false)

    const removeCookie = (key) => {
        if (window !== "undefined") {
            cookie.remove(key, { expires: 1 })
        }
    }

    const logout = async () => {
        await axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/user/logout`,
            withCredentials: true,
        })
            .then(() => removeCookie('jwt'))
            .catch((err) => console.log(err))
        window.location = '/'
    }

    const classes = {
        li: "group flex justify-between items-center h-11 border-l-2 border-transparent cursor-pointer hover:bg-background_primary_x_light hover:border-l-2 hover:border-primary",
        li_left: "flex items-center pl-[10px] h-full w-auto",
        li_right: "flex items-center pr-[10px] h-full w-auto",
        svg: "w-9 h-9 p-2 rounded-full bg-background_primary_x_light text-slate-300 group-hover:bg-background_primary_light",
        p: "pl-[10px] font-xs text-slate-300"
    }

    return (
        <>
            {isOpen && !isScreenMenu && (
                <div className="w-[270px] h-auto py-2 absolute bg-background_primary_light shadow-xl rounded-md top-[65px] right-4 z-[1100] before:content-[''] before:absolute before:w-0 before:h-0 border-10 border-background_primary_light before:right-9 before:top-[-19px]" ref={settingsWrapper}>
                    <ul className="p-0 m-0 list-none">
                        <li className={classes.li}>
                            <div className={classes.li_left}>
                                <AiFillSetting className={classes.svg} />
                                <p className={classes.p}>Paramètres</p>
                            </div>
                            <div className={classes.li_right}>
                                <IoCaretForwardOutline className={classes.svg} />
                            </div>
                        </li>
                        <li className={classes.li} onClick={() => setScreenMenu(true)}>
                            <div className={classes.li_left}>
                                <BsFillSunFill className={classes.svg} />
                                <p className={classes.p}>Affichage</p>
                            </div>
                            <div className={classes.li_right}>
                                <IoCaretForwardOutline className={classes.svg} />
                            </div>
                        </li>
                        <li className={classes.li} onClick={logout}>
                            <div className={classes.li_left}>
                                <HiLogout className={classes.svg} />
                                <p className={classes.p}>Se déconnecter</p>
                            </div>
                        </li>
                    </ul>
                </div>
            )}

            {isScreenMenu && <ScreenMenu />}
        </>
    )

}

export default SettingsMenu;