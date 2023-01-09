import React, { useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import MiniNav from "./mini-nav/MiniNav";
import { OutlinedButton } from "./tools/global/Button";
import { useClickOutside } from "./tools/hooks/useClickOutside";
import { AiOutlineHome, AiOutlinePlus } from 'react-icons/ai'
import { MdOutlineMessage, MdOutlineScreenSearchDesktop } from 'react-icons/md'
import { BiUser } from 'react-icons/bi'
import { RiLoginCircleLine } from 'react-icons/ri'
import { MdOutlineInsertChart } from 'react-icons/md'
import { ImArrowLeft2 } from 'react-icons/im'
import NavbarToggle from "./tools/global/NavbarToggle";

const Navbar = ({ websocket, user, uid, onlineUsers }) => {
    const isThisActive = ({ isActive }) => (!isActive ? "nav_link" : "nav_link active")
    const location = useLocation()
    const [toggled, setToggled] = useState(false)
    const closeOnClick = () => { if (toggled) setToggled(false) }
    const navRef = useRef()
    useClickOutside(navRef, () => setToggled(false))

    return (
        location.pathname !== "/add-project" && (
            <header>
                <nav className="navbar">
                    {location.pathname !== "/register" && location.pathname !== "/login" ? (
                        <>
                            <div className="logo_container">
                                <Link to="/">
                                    <div className="logo_inner">
                                        <img className="logo-main" src="/img/logo-top.png" alt="" />
                                    </div>
                                </Link>
                                <div className="hidden lg:flex ml-8">
                                    <NavLink to="/add-project">
                                        <OutlinedButton className="btn_icon_start"><AiOutlinePlus />Déposer un projet</OutlinedButton>
                                    </NavLink>
                                </div>
                            </div>

                            {uid ? (
                                <>
                                    <div className={`${toggled ? "nav_container open" : "nav_container"}`}>
                                        <ul className="nav_ul">
                                            <li className="nav_li flex lg:!hidden border-b" onClick={closeOnClick}>
                                                <NavLink to="/add-project" className={isThisActive}>
                                                    <AiOutlinePlus className="nav_icon" />
                                                    <p className="nav_p">Déposer un projet</p>
                                                </NavLink>
                                            </li>
                                            <li className="nav_li" onClick={closeOnClick}>
                                                <NavLink to="/" className={isThisActive}>
                                                    <AiOutlineHome className="nav_icon" />
                                                    <p className="nav_p">Accueil</p>
                                                </NavLink>
                                            </li>
                                            <li className="nav_li" onClick={closeOnClick}>
                                                <NavLink to="/searches" className={isThisActive}>
                                                    <MdOutlineScreenSearchDesktop className="nav_icon" />
                                                    <p className="nav_p">Recherches</p>
                                                </NavLink>
                                            </li>
                                            <li className="nav_li" onClick={closeOnClick}>
                                                <NavLink to="/projects" className={isThisActive}>
                                                    <MdOutlineInsertChart className="nav_icon" />
                                                    <p className="nav_p">Projets</p>
                                                </NavLink>
                                            </li>
                                            <li className="nav_li" onClick={closeOnClick}>
                                                <NavLink to="/messenger" className={isThisActive}>
                                                    <MdOutlineMessage className="nav_icon" />
                                                    <p className="nav_p">Messages</p>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mini_nav_container">
                                        <MiniNav user={user} websocket={websocket} onlineUsers={onlineUsers} onClick={closeOnClick} />
                                        <NavbarToggle open={toggled} onClick={() => setToggled(!toggled)} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={`${toggled ? "nav_container open" : "nav_container"}`}>
                                        <ul className="nav_ul">
                                            <li className="nav_li flex lg:!hidden border-b" onClick={closeOnClick}>
                                                <NavLink to="/add-project" className={isThisActive}>
                                                    <AiOutlinePlus className="nav_icon" />
                                                    <p className="nav_p">Déposer un projet</p>
                                                </NavLink>
                                            </li>
                                            <li className="nav_li" onClick={closeOnClick}>
                                                <NavLink to="/" className={isThisActive}>
                                                    <AiOutlineHome className="nav_icon" />
                                                    <p className="nav_p">Accueil</p>
                                                </NavLink>
                                            </li>
                                            <li className="nav_li" onClick={closeOnClick}>
                                                <NavLink to="/login" className={isThisActive}>
                                                    <MdOutlineScreenSearchDesktop className="nav_icon" />
                                                    <p className="nav_p">Recherches</p>
                                                </NavLink>
                                            </li>
                                            <li className="nav_li" onClick={closeOnClick}>
                                                <NavLink to="/login" className={isThisActive}>
                                                    <MdOutlineInsertChart className="nav_icon" />
                                                    <p className="nav_p">Projets</p>
                                                </NavLink>
                                            </li>
                                            <li className="nav_li" onClick={closeOnClick}>
                                                <NavLink to="/login" className={isThisActive}>
                                                    <MdOutlineMessage className="nav_icon" />
                                                    <p className="nav_p">Messages</p>
                                                </NavLink>
                                            </li>
                                            <li className="nav_li flex lg:!hidden border-t mt-10" onClick={closeOnClick}>
                                                <NavLink to="/login" className={isThisActive}>
                                                    <BiUser className="nav_icon" />
                                                    <p className="nav_p">Connexion</p>
                                                </NavLink>
                                            </li>
                                            <li className="nav_li flex lg:!hidden" onClick={closeOnClick}>
                                                <NavLink to="/register" className={isThisActive}>
                                                    <RiLoginCircleLine className="nav_icon" />
                                                    <p className="nav_p">Inscription</p>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="nav_container-right">
                                        <ul className="nav_ul">
                                            <li className="nav_li login">
                                                <NavLink to="/login" className={isThisActive}>
                                                    <BiUser className="nav_icon" />
                                                    <p className="nav_p">Connexion</p>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mini_nav_container lg:!hidden">
                                        <NavbarToggle open={toggled} onClick={() => setToggled(!toggled)} />
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            {location.pathname === "/register" &&
                                <>
                                    <Link to="/" className="move-back">
                                        <ImArrowLeft2 />
                                    </Link>
                                    <div className="navbar_form_pages">
                                        <Link to="/">
                                            <div className="logo_inner">
                                                <img className="logo-main" src="/img/logo-top.png" alt="" />
                                            </div>
                                        </Link>
                                        <div className="right">
                                            <RiLoginCircleLine className="nav_icon" />
                                            <p>Inscription</p>
                                        </div>
                                    </div>
                                </>
                            }
                            {location.pathname === "/login" &&
                                <>
                                    <Link to="/" className="move-back">
                                        <ImArrowLeft2 />
                                    </Link>
                                    <div className="navbar_form_pages">
                                        <Link to="/">
                                            <div className="logo_inner">
                                                <img className="logo-main" src="/img/logo-top.png" alt="" />
                                            </div>
                                        </Link>
                                        <div className="right">
                                            <BiUser className="nav_icon" />
                                            <p>Connexion</p>
                                        </div>
                                    </div>
                                </>
                            }
                        </>
                    )}
                </nav>
            </header >
        )
    )
}

export default Navbar;