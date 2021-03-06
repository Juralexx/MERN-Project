import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { ThemeContext, themes } from './Theme';
import { BsFillSunFill, BsFillMoonStarsFill } from 'react-icons/bs'
import { updateTheme } from '../../../actions/user.action';

const ThemeToggle = () => {
    const userData = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()
    const [darkMode, setDarkMode] = useState(true);
    const [checked, setChecked] = useState()
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
                    <BsFillSunFill />
                    <p>Activer le mode clair</p>
                </div>
            ) : (
                <div className="settings-menu-li-left">
                    <BsFillMoonStarsFill />
                    <p>Activer le mode sombre</p>
                </div>
            )}
            {localStorageTheme === "dark" ? (
                <ThemeContext.Consumer>
                    {({ changeTheme }) => (
                        <label className="switch">
                            <input type="checkbox" defaultChecked={!checked}
                                onClick={() => {
                                    handleTheme();
                                    setDarkMode(!darkMode);
                                    changeTheme(themes.light);
                                }}
                            />
                            <span className="slider round"></span>
                        </label>
                    )}
                </ThemeContext.Consumer>
            ) : (
                <ThemeContext.Consumer>
                    {({ changeTheme }) => (
                        <label className="switch">
                            <input type="checkbox" defaultChecked={checked}
                                onClick={() => {
                                    handleTheme();
                                    setDarkMode(darkMode);
                                    changeTheme(themes.dark);
                                }}
                            />
                            <span className="slider round"></span>
                        </label>
                    )}
                </ThemeContext.Consumer>
            )}
        </>
    )
}

export default ThemeToggle;