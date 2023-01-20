import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Icon from '../icons/Icon';
import Switch from '../global/Switch';
import { ThemeContext, themes } from './Theme';
import { updateTheme } from '../../../reducers/user.action';

const ThemeToggle = () => {
    const userData = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()
    const [checked, setChecked] = useState(false)
    const localStorageTheme = localStorage.getItem("theme")

    const handleTheme = () => {
        if (localStorageTheme === "dark") {
            dispatch(updateTheme(userData._id, "light"))
            setChecked(false)
        }
        if (localStorageTheme === "light") {
            dispatch(updateTheme(userData._id, "dark"))
            setChecked(true)
        }
    }

    return (
        <>
            {localStorageTheme === "dark" ? (
                <div className="settings-menu-li-left">
                    <Icon name="Sun" className="nav_icon" />
                    <p>Activer le mode clair</p>
                </div>
            ) : (
                <div className="settings-menu-li-left">
                    <Icon name="Moon" className="nav_icon" />
                    <p>Activer le mode sombre</p>
                </div>
            )}
            {localStorageTheme === "dark" ? (
                <ThemeContext.Consumer>
                    {({ changeTheme }) => (
                        <Switch
                            defaultChecked={!checked}
                            onClick={() => {
                                changeTheme(themes.light)
                                handleTheme()
                            }}
                        />
                    )}
                </ThemeContext.Consumer>
            ) : (
                <ThemeContext.Consumer>
                    {({ changeTheme }) => (
                        <Switch
                            defaultChecked={checked}
                            onClick={() => {
                                changeTheme(themes.dark)
                                handleTheme()
                            }}
                        />
                    )}
                </ThemeContext.Consumer>
            )}
        </>
    )
}

export default ThemeToggle;