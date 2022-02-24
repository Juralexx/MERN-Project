import React, { useRef, useState } from "react";
import { ImArrowLeft2 } from 'react-icons/im'
import { useClickOutside } from "./functions/useClickOutside";
import SettingsMenu from "./SettingsMenu";
import ThemeToggle from "./theme/ThemeToggle";

const ScreenMenu = () => {
    const [isOpen, setOpen] = useState(true)
    const [isSettingsMenu, setSettingsMenu] = useState(false)
    const settingsWrapper = useRef()

    useClickOutside(settingsWrapper, setOpen, false)

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
                        </ul>
                    </div>
                </div>
            )}

            {isSettingsMenu ? openSettingsMenu() : null}
        </>
    )

}

export default ScreenMenu;