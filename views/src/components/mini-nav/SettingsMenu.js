import React, { useState } from "react";
import axios from "axios";
import cookie from "js-cookie"
import { HiLogout } from 'react-icons/hi'
import { AiFillSetting } from 'react-icons/ai'
import { BsFillSunFill } from 'react-icons/bs'
import { IoCaretForwardOutline } from 'react-icons/io5'
import { ImArrowLeft2 } from 'react-icons/im'
import ThemeToggle from "../tools/theme/ThemeToggle";

const SettingsMenu = ({ open }) => {
    const [value, setValue] = useState(0)

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
            .then(() => {
                removeCookie('jwt')
                localStorage.removeItem("auth")
            })
            .catch(err => console.log(err))
        window.location.pathname = '/'
    }

    return (
        <>
            {open &&
                <div className="settings-menu">
                    {value === 0 &&
                        <ul className="settings-menu-ul">
                            <li className="settings-menu-li">
                                <div className="settings-menu-li-left">
                                    <AiFillSetting />
                                    <p>Paramètres</p>
                                </div>
                                <div className="settings-menu-li-right">
                                    <IoCaretForwardOutline />
                                </div>
                            </li>
                            <li className="settings-menu-li" onClick={() => { setValue(1) }}>
                                <div className="settings-menu-li-left">
                                    <BsFillSunFill />
                                    <p>Affichage</p>
                                </div>
                                <div className="settings-menu-li-right">
                                    <IoCaretForwardOutline />
                                </div>
                            </li>
                            <li className="settings-menu-li" onClick={logout}>
                                <div className="settings-menu-li-left">
                                    <HiLogout />
                                    <p>Se déconnecter</p>
                                </div>
                            </li>
                        </ul>
                    }
                    {value === 1 &&
                        <>
                            <div className="settings-menu-header">
                                <ImArrowLeft2 onClick={() => { setValue(0) }} />
                                <div className="brand">Affichage</div>
                            </div>
                            <ul className="settings-menu-ul">
                                <li className="settings-menu-li">
                                    <ThemeToggle />
                                </li>
                            </ul>
                        </>
                    }
                </div>
            }
        </>
    )

}

export default SettingsMenu;