import React from "react";
import { NavLink } from "react-router-dom";
import { IoIosLink } from 'react-icons/io'
import { FiLayers } from 'react-icons/fi'
import { AiOutlineHome, AiOutlineEye, AiOutlineHeart, AiOutlineDownload } from 'react-icons/ai'

const LeftNav = () => {

    const classes = {
        ul: "relative flex justify-center items-center list-none m-0",
        li: "group flex h-[60px] py-0 px-3 min-w-15 text-center justify-center items-center text-slate-300 cursor-pointer border-t hover:border-t-[3px] hover:border-t-primary border-slate-300",
        a: "!no-underline h-full w-full text-gray-500 dark:text-slate-300 flex flex-col items-center justify-center py-0 px-2 group-hover:text-gray-500 dark:group-hover:text-slate-300",
        svg: "w-5 h-5 mb-[6px] text-gray-500 dark:text-slate-300 group-hover:text-primary",
        p: "m-0 leading-[14px] font-medium text-[16px] whitespace-nowrap"
    }

    return (
        <div className="absolute left-0 bottom-0 w-full h-[60px]">
            <ul className={classes.ul}>
                <li className={classes.li}>
                    <NavLink to="/" className={classes.a}>
                        <AiOutlineHome className={classes.svg} />
                        <p className={classes.p}>Général</p>
                    </NavLink>
                </li>
                <li className={classes.li}>
                    <NavLink className={classes.a} to="/all-projects">
                        <FiLayers className={classes.svg} />
                        <p className={classes.p}>Tous les projets</p>
                    </NavLink>
                </li>
                <li className={classes.li}>
                    <NavLink className={classes.a} to="/most-followed">
                        <IoIosLink className={classes.svg} />
                        <p className={classes.p}>Plus suivis</p>
                    </NavLink>
                </li>
                <li className={classes.li}>
                    <NavLink className={classes.a} to="/most-viewed">
                        <AiOutlineEye className={classes.svg} />
                        <p className={classes.p}>Plus consultés</p>
                    </NavLink>
                </li>
                <li className={classes.li}>
                    <NavLink className={classes.a} to="/most-liked">
                        <AiOutlineHeart className={classes.svg} />
                        <p className={classes.p}>Plus aimés</p>
                    </NavLink>
                </li>
                <li className={classes.li}>
                    <NavLink className={classes.a} to="/latest-added">
                        <AiOutlineDownload className={classes.svg} />
                        <p className={classes.p}>Derniers ajoutés</p>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default LeftNav;