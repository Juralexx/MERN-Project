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

    const classes = {
        svg: "w-9 h-9 p-2 rounded-full text-slate-500 dark:text-slate-300 bg-slate-100 dark:bg-background_primary_x_light group-hover:bg-white dark:group-hover:bg-background_primary_light",
        p: "pl-[10px] font-xs text-slate-500 dark:text-slate-300"
    }

    return (
        <>
            <div className="flex items-center pl-[10px] h-full w-auto">
                {localStorageTheme === "dark" ? (
                    <div className="flex items-center">
                        <BsFillSunFill className={classes.svg} />
                        <p className={classes.p}>Activer le mode clair</p>
                    </div>
                ) : (
                    <div className="flex items-center">
                        <BsFillMoonStarsFill className={classes.svg} />
                        <p className={classes.p}>Activer le mode sombre</p>
                    </div>
                )}
            </div>
            <div className="flex items-center h-full">
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
            </div>
        </>
    )
}

export default ThemeToggle;