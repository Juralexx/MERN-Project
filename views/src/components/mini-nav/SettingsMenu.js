import React, { useRef, useState } from "react";
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
            .then(() => removeCookie('jwt'))
            .catch((err) => console.log(err))
        window.location = '/'
    }

    const classes = {
        li: "group flex justify-between items-center h-11 border-l-2 border-transparent cursor-pointer hover:bg-slate-100 dark:hover:bg-background_primary_x_light hover:border-l-2 hover:border-primary",
        li_left: "flex items-center pl-[10px] h-full w-auto",
        li_right: "flex items-center pr-[10px] h-full w-auto",
        svg: "w-9 h-9 p-2 rounded-full bg-slate-100 dark:bg-background_primary_x_light text-slate-500 dark:text-slate-300 group-hover:bg-white dark:group-hover:bg-background_primary_light cursor-pointer",
        p: "pl-[10px] font-xs text-slate-500 dark:text-slate-300"
    }

    return (
        <>
            {open &&
                <div className="w-[300px] h-auto py-2 absolute bg-white dark:bg-background_primary_light shadow-xl rounded-md top-[65px] right-4 z-[1100] before:content-[''] before:absolute before:w-0 before:h-0 border-10 border-background_primary_light before:right-9 before:top-[-19px]">
                    {value === 0 &&
                        <ul className="p-0 m-0 list-none">
                            <li className={classes.li}>
                                <div className={classes.li_left}>
                                    <AiFillSetting className={classes.svg} />
                                    <p className={classes.p}>Paramètres</p>
                                </div>
                                <div className={classes.li_right}>
                                    <IoCaretForwardOutline className={classes.svg} />
                                </div>
                            </li>
                            <li className={classes.li} onClick={() => { setValue(1) }}>
                                <div className={classes.li_left}>
                                    <BsFillSunFill className={classes.svg} />
                                    <p className={classes.p}>Affichage</p>
                                </div>
                                <div className={classes.li_right}>
                                    <IoCaretForwardOutline className={classes.svg} />
                                </div>
                            </li>
                            <li className={classes.li} onClick={logout}>
                                <div className={classes.li_left}>
                                    <HiLogout className={classes.svg} />
                                    <p className={classes.p}>Se déconnecter</p>
                                </div>
                            </li>
                        </ul>
                    }
                    {value === 1 &&
                        <>
                            <div className="flex items-center h-[44px] px-[10px]">
                                <ImArrowLeft2 className={classes.svg} onClick={() => { setValue(0) }} />
                                <h4 className="text-center w-full m-0 text-slate-500 dark:text-slate-300">Affichage</h4>
                            </div>
                            <ul className="p-0 m-0 list-none">
                                <li className={classes.li}>
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