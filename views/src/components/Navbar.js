import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import MiniNav from "./mini-nav/MiniNav";
import { AiOutlineHome, AiOutlineUnorderedList, AiOutlineFundProjectionScreen } from 'react-icons/ai'
import { MdOutlineMessage } from 'react-icons/md'
import { IoPersonCircleSharp } from 'react-icons/io5'
import { RiLoginCircleLine } from 'react-icons/ri'

const Navbar = () => {
    const uid = useContext(UidContext)

    const classes = {
        container: "absolute top-0 left-1/2 translate-x-[-50%] flex justify-between w-auto my-0 mx-auto h-[60px]",
        ul: "relative flex list-none m-0 p-0",
        li: "group flex h-full py-0 px-5 min-w-20 text-center justify-center items-center text-slate-500 dark:text-slate-300 cursor-pointer border-b-2 border-b-transparent hover:border-b-primary",
        a: "!no-underline h-full w-full  text-slate-500 dark:text-slate-300 flex flex-col items-center justify-center py-0 px-2 dark:group-hover:text-slate-300 group-hover:text-slate-500 ",
        svg: "w-5 h-5 mb-[6px] text-slate-500 dark:text-slate-300 group-hover:text-primary",
        p: "m-0 leading-[14px] font-medium text-[16px] whitespace-nowrap"
    }

    return (
        <header className="relative w-full h-[60px]">
            <nav className="flex fixed h-[60px] w-full bg-white dark:bg-background_primary z-10 shadow-lg">
                <div className="relative pl-5">
                    <NavLink to="/">
                        <div className="flex w-auto h-full items-center">
                            <img src="/img/logo-top.png" alt="" className="h-9 w-auto ml-1" />
                        </div>
                    </NavLink>
                </div>

                {uid ? (
                    <>
                        <div className={classes.container}>
                            <ul className={classes.ul}>
                                <li className={classes.li}>
                                    <NavLink to="/" className={classes.a}>
                                        <AiOutlineHome className={classes.svg} />
                                        <p className={classes.p}>Accueil</p>
                                    </NavLink>
                                </li>
                                <li className={classes.li}>
                                    <NavLink to="/" className={classes.a}>
                                        <AiOutlineUnorderedList className={classes.svg} />
                                        <p className={classes.p}>Mes recherches</p>
                                    </NavLink>
                                </li>
                                <li className={classes.li}>
                                    <NavLink to="/projects" className={classes.a}>
                                        <AiOutlineFundProjectionScreen className={classes.svg} />
                                        <p className={classes.p}>Mes Projets</p>
                                    </NavLink>
                                </li>
                                <li className={classes.li}>
                                    <NavLink to="/messenger" className={classes.a}>
                                        <MdOutlineMessage className={classes.svg} />
                                        <p className={classes.p}>Messages</p>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <>
                            <MiniNav />
                        </>
                    </>
                ) : (
                    <div className={classes.container}>
                        <ul className={classes.ul}>
                            <li className={classes.li}>
                                <NavLink to="/" className={classes.a}>
                                    <AiOutlineHome className={classes.svg} />
                                    <p className={classes.p}>Accueil</p>
                                </NavLink>
                            </li>
                            <li className={classes.li}>
                                <NavLink to="/" className={classes.a}>
                                    <AiOutlineUnorderedList className={classes.svg} />
                                    <p className={classes.p}>Mes recherches</p>
                                </NavLink>
                            </li>
                            <li className={classes.li}>
                                <NavLink to="/" className={classes.a}>
                                    <AiOutlineFundProjectionScreen className={classes.svg} />
                                    <p className={classes.p}>Projets</p>
                                </NavLink>
                            </li>
                            <li className={classes.li}>
                                <NavLink to="/messenger" className={classes.a}>
                                    <MdOutlineMessage className={classes.svg} />
                                    <p className={classes.p}>Messages</p>
                                </NavLink>
                            </li>
                            <li className={classes.li}>
                                <NavLink to="/login" className={classes.a}>
                                    <IoPersonCircleSharp className={classes.svg} />
                                    <p className={classes.p}>Se connecter</p>
                                </NavLink>
                            </li>
                            <li className={classes.li}>
                                <NavLink to="/register" className={classes.a}>
                                    <RiLoginCircleLine className={classes.svg} />
                                    <p className={classes.p}>S'inscrire</p>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
        </header >
    )
}

export default Navbar;