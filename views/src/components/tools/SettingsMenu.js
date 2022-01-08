import React, { useEffect, useRef, useState } from "react";
import Logout from "../log/Logout";
import { AiFillSetting } from 'react-icons/ai'
import { BsFillSunFill } from 'react-icons/bs'
import { IoCaretForwardOutline } from 'react-icons/io5'

const SettingsMenu = () => {
    const [isOpen, setOpen] = useState(true)
    const settingsWrapper = useRef()

    const handleClickOutside = (e) => {
        const { current: wrap } = settingsWrapper;
        if (wrap && !wrap.contains(e.target)) {
            setOpen(!isOpen);
        }
    }; useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            {isOpen && (
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
                            <li className="to-screenmode">
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
        </>
    )

}

export default SettingsMenu;