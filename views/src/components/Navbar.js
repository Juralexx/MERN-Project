import React, { useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useClickOutside } from "./tools/hooks/useClickOutside";
import { TextButton } from "./tools/global/Button";
import MiniNav from "./mini-nav/MiniNav";
import NavbarToggle from "./tools/global/NavbarToggle";
import Icon from "./tools/icons/Icon";

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
                                    <TextButton className="btn_icon_start">
                                        <Link to="/add-project">
                                            <Icon name="Plus" className="nav_icon" />Déposer un projet
                                        </Link>
                                    </TextButton>
                                </div>
                            </div>

                            {uid ? (
                                <>
                                    <div className={`${toggled ? "nav_container open" : "nav_container"}`}>
                                        <ul className="nav_ul">
                                            <li className="nav_li flex lg:!hidden border-b" onClick={closeOnClick}>
                                                <NavLink to="/add-project" className={isThisActive}>
                                                    <Icon name="Plus" className="nav_icon" />
                                                    <p className="nav_p">Déposer un projet</p>
                                                </NavLink>
                                            </li>
                                            <li className="nav_li" onClick={closeOnClick}>
                                                <NavLink to="/" className={isThisActive}>
                                                    <Icon name="Home" className="nav_icon" />
                                                    <p className="nav_p">Accueil</p>
                                                </NavLink>
                                            </li>
                                            <li className="nav_li" onClick={closeOnClick}>
                                                <NavLink to="/searches" className={isThisActive}>
                                                    <Icon name="Computer" className="nav_icon" />
                                                    <p className="nav_p">Recherches</p>
                                                </NavLink>
                                            </li>
                                            <li className="nav_li" onClick={closeOnClick}>
                                                <NavLink to="/projects" className={isThisActive}>
                                                    <Icon name="Dashboard" className="nav_icon" />
                                                    <p className="nav_p">Projets</p>
                                                </NavLink>
                                            </li>
                                            <li className="nav_li" onClick={closeOnClick}>
                                                <NavLink to="/messenger" className={isThisActive}>
                                                    <Icon name="Chat" className="nav_icon" />
                                                    <p className="nav_p">Messages</p>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mini_nav_container">
                                        <MiniNav
                                            user={user}
                                            websocket={websocket}
                                            onlineUsers={onlineUsers}
                                            onClick={closeOnClick}
                                        />
                                        <NavbarToggle
                                            open={toggled}
                                            onClick={() => setToggled(!toggled)}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={`${toggled ? "nav_container open" : "nav_container"}`}>
                                        <ul className="nav_ul">
                                            <li className="nav_li flex lg:!hidden border-b" onClick={closeOnClick}>
                                                <NavLink to="/add-project" className={isThisActive}>
                                                    <Icon name="Plus" className="nav_icon" />
                                                    <p className="nav_p">Déposer un projet</p>
                                                </NavLink>
                                            </li>
                                            <li className="nav_li" onClick={closeOnClick}>
                                                <NavLink to="/" className={isThisActive}>
                                                    <Icon name="Home" className="nav_icon" />
                                                    <p className="nav_p">Accueil</p>
                                                </NavLink>
                                            </li>
                                            <li className="nav_li" onClick={closeOnClick}>
                                                <NavLink to="/login" className={isThisActive}>
                                                    <Icon name="Computer" className="nav_icon" />
                                                    <p className="nav_p">Recherches</p>
                                                </NavLink>
                                            </li>
                                            <li className="nav_li" onClick={closeOnClick}>
                                                <NavLink to="/login" className={isThisActive}>
                                                    <Icon name="Dashboard" className="nav_icon" />
                                                    <p className="nav_p">Projets</p>
                                                </NavLink>
                                            </li>
                                            <li className="nav_li" onClick={closeOnClick}>
                                                <NavLink to="/login" className={isThisActive}>
                                                    <Icon name="Chat" className="nav_icon" />
                                                    <p className="nav_p">Messages</p>
                                                </NavLink>
                                            </li>
                                            <li className="nav_li flex lg:!hidden border-t mt-10" onClick={closeOnClick}>
                                                <NavLink to="/login" className={isThisActive}>
                                                    <Icon name="User" className="nav_icon" />
                                                    <p className="nav_p">Connexion</p>
                                                </NavLink>
                                            </li>
                                            <li className="nav_li flex lg:!hidden" onClick={closeOnClick}>
                                                <NavLink to="/register" className={isThisActive}>
                                                    <Icon name="Register" className="nav_icon" />
                                                    <p className="nav_p">Inscription</p>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="nav_container-right">
                                        <ul className="nav_ul">
                                            <li className="nav_li login">
                                                <NavLink to="/login" className={isThisActive}>
                                                    <Icon name="User" className="nav_icon" />
                                                    <p className="nav_p">Connexion</p>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mini_nav_container lg:!hidden">
                                        <NavbarToggle
                                            open={toggled}
                                            onClick={() => setToggled(!toggled)}
                                        />
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            {location.pathname === "/register" &&
                                <>
                                    <Link to="/" className="move-back">
                                        <Icon name="ArrowLeft" />
                                    </Link>
                                    <div className="navbar_form_pages">
                                        <Link to="/">
                                            <div className="logo_inner">
                                                <img className="logo-main" src="/img/logo-top.png" alt="" />
                                            </div>
                                        </Link>
                                        <div className="right">
                                            <p>Inscription</p>
                                        </div>
                                    </div>
                                </>
                            }
                            {location.pathname === "/login" &&
                                <>
                                    <Link to="/" className="move-back">
                                        <Icon name="ArrowLeft" />
                                    </Link>
                                    <div className="navbar_form_pages">
                                        <Link to="/">
                                            <div className="logo_inner">
                                                <img className="logo-main" src="/img/logo-top.png" alt="" />
                                            </div>
                                        </Link>
                                        <div className="right">
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