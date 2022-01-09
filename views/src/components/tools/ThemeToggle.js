import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { ThemeContext, themes } from './Theme';
import { BsFillSunFill, BsFillMoonStarsFill } from 'react-icons/bs'
import { updateTheme } from '../../actions/user.action';

const ThemeToggle = () => {
    const userData = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()
    const [darkMode, setDarkMode] = useState(true);

    const handleTheme = () => {
        if (userData.theme === "dark")
            dispatch(updateTheme(userData._id, "light"))
        if (userData.theme === "light")
            dispatch(updateTheme(userData._id, "dark"))
    }

    return (
        <>
            <div className="left">
                {darkMode ? (
                    <><BsFillSunFill /> <p>Activer le mode clair</p></>
                ) : (
                    <><BsFillMoonStarsFill /> <p>Activer le mode sombre</p></>
                )}
            </div>
            <div className="right">
                <ThemeContext.Consumer>
                    {({ changeTheme }) => (
                        <label className="switch">
                            <input type="checkbox"
                                onClick={() => {
                                    handleTheme();
                                    setDarkMode(!darkMode);
                                    changeTheme(darkMode ? themes.light : themes.dark);
                                }}
                            />
                            <span className="slider round"></span>
                        </label>
                    )}
                </ThemeContext.Consumer>
            </div>
        </>
    )
}

export default ThemeToggle;