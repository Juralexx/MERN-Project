import React, { useEffect, useRef, useState } from "react";
import { ThemeContext, themes } from './Theme';
import { ImArrowLeft2 } from 'react-icons/im'
import SettingsMenu from "./SettingsMenu";
import ThemeToggle from "./ThemeToggle";

const ScreenMenu = () => {
    const [isOpen, setOpen] = useState(true)
    const [isSettingsMenu, setSettingsMenu] = useState(false)
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
    });

    const openSettingsMenu = () => {
        return (
            <SettingsMenu />
        )
    }

    return (
        <>
            {isOpen && (
                <div className="settings-menu" ref={settingsWrapper}>
                    <div className="settings-menu-header">
                        <ImArrowLeft2 onClick={() => setSettingsMenu(true)} />
                        <h5>Affichage</h5>
                    </div>
                    <div className="settings-menu-nav">
                        <ul>
                            <li className="to-screenmode">
                                <ThemeToggle />
                            </li>
                            <li>
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            {isSettingsMenu ? openSettingsMenu() : null}
        </>
    )

}

export default ScreenMenu;