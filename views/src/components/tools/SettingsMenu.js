import React, { useEffect, useRef, useState } from "react";
import Logout from "../log/Logout";
import { AiFillSetting } from 'react-icons/ai'
import { BsFillSunFill } from 'react-icons/bs'
import { IoCaretForwardOutline } from 'react-icons/io5'
import ScreenMenu from "./ScreenMenu";
import { useClickOutside } from "./functions/useClickOutside";

const SettingsMenu = () => {
    const [isOpen, setOpen] = useState(true)
    const [isScreenMenu, setScreenMenu] = useState(false)
    const settingsWrapper = useRef()

    useClickOutside(settingsWrapper, setOpen)

    const openScreenMenu = () => {
        return (
            <ScreenMenu />
        )
    }

    return (
        <>
            {isOpen && !isScreenMenu && (
                <div className="settings-menu" ref={settingsWrapper}>
                    <div className="settings-menu-nav">
                        <ul>
                            <li className="to-settings">
                                <div className="left">
                                    <AiFillSetting />
                                    <p>Paramètres</p>
                                </div>
                                <div className="right">
                                    <IoCaretForwardOutline />
                                </div>
                            </li>
                            <li className="to-screenmode" onClick={() => setScreenMenu(true)}>
                                <div className="left">
                                    <BsFillSunFill />
                                    <p>Affichage</p>
                                </div>
                                <div className="right">
                                    <IoCaretForwardOutline />
                                </div>
                            </li>
                            <Logout />
                        </ul>
                    </div>
                </div>
            )}

            {isScreenMenu ? openScreenMenu() : null}
        </>
    )

}

export default SettingsMenu;