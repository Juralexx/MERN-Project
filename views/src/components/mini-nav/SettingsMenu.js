import React, { useState } from "react";
import axios from "axios";
import cookie from "js-cookie"
import ThemeToggle from "../tools/theme/ThemeToggle";
import Icon from "../tools/icons/Icon";

const SettingsMenu = ({ open, user, websocket, onlineUsers }) => {
    const [value, setValue] = useState(0)

    const removeCookie = (key) => {
        if (window !== "undefined") {
            cookie.remove(key, { expires: 1 })
        }
    }

    const logout = async () => {
        onlineUsers.forEach(u => {
            websocket.current.emit("logout", {
                receiverId: u._id,
                userId: user._id,
            })
        })
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
                                    <Icon name="DoubleCheckbox" />
                                    <p>Paramètres</p>
                                </div>
                                <div className="settings-menu-li-right">
                                    <Icon name="CaretRight" />
                                </div>
                            </li>
                            <li className="settings-menu-li" onClick={() => { setValue(1) }}>
                                <div className="settings-menu-li-left">
                                    <Icon name="Sun" />
                                    <p>Affichage</p>
                                </div>
                                <div className="settings-menu-li-right">
                                    <Icon name="CaretRight" />
                                </div>
                            </li>
                            <li className="settings-menu-li" onClick={logout}>
                                <div className="settings-menu-li-left">
                                    <Icon name="Logout" />
                                    <p>Se déconnecter</p>
                                </div>
                            </li>
                        </ul>
                    }
                    {value === 1 &&
                        <>
                            <div className="settings-menu-header">
                                <Icon name="ArrowLeft" onClick={() => setValue(0)} />
                                Affichage
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