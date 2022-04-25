import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import MiniNav from "./mini-nav/MiniNav";
import { AiFillHome } from 'react-icons/ai'
import { MdOutlineMessage, MdOutlineScreenSearchDesktop } from 'react-icons/md'
import { IoPersonCircleSharp } from 'react-icons/io5'
import { RiLoginCircleLine } from 'react-icons/ri'
import { FaProjectDiagram } from 'react-icons/fa'
import { ImArrowLeft2 } from 'react-icons/im'

const Navbar = ({ websocket, user, uid }) => {
    const isThisActive = ({ isActive }) => (!isActive ? "nav-link" : "nav-link active")
    const location = useLocation()

    return (
        <header>
            <nav className="navbar">
                {location.pathname !== "/register" && location.pathname !== "/login" ? (
                    <>
                        <div className="logo-container">
                            <Link to="/">
                                <div className="logo-inner">
                                    <img src="/img/logo-top.png" alt="" />
                                </div>
                            </Link>
                        </div>

                        {uid ? (
                            <>
                                <div className="nav-container">
                                    <ul className="nav-ul">
                                        <li className="nav-li">
                                            <NavLink to="/" className={isThisActive}>
                                                <AiFillHome className="nav-icon" />
                                                <p className="nav-p">Accueil</p>
                                            </NavLink>
                                        </li>
                                        <li className="nav-li">
                                            <NavLink to="/searches" className={isThisActive}>
                                                <MdOutlineScreenSearchDesktop className="nav-icon" />
                                                <p className="nav-p">Recherches</p>
                                            </NavLink>
                                        </li>
                                        <li className="nav-li">
                                            <NavLink to="/projects" className={isThisActive}>
                                                <FaProjectDiagram className="nav-icon" />
                                                <p className="nav-p">Projets</p>
                                            </NavLink>
                                        </li>
                                        <li className="nav-li">
                                            <NavLink to="/messenger" className={isThisActive}>
                                                <MdOutlineMessage className="nav-icon" />
                                                <p className="nav-p">Messages</p>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                                <MiniNav user={user} websocket={websocket} />
                            </>
                        ) : (
                            <>
                                <div className="nav-container">
                                    <ul className="nav-ul">
                                        <li className="nav-li">
                                            <NavLink to="/" className={isThisActive}>
                                                <AiFillHome className="nav-icon" />
                                                <p className="nav-p">Accueil</p>
                                            </NavLink>
                                        </li>
                                        <li className="nav-li">
                                            <NavLink to="/login" className={isThisActive}>
                                                <MdOutlineScreenSearchDesktop className="nav-icon" />
                                                <p className="nav-p">Recherches</p>
                                            </NavLink>
                                        </li>
                                        <li className="nav-li">
                                            <NavLink to="/login" className={isThisActive}>
                                                <FaProjectDiagram className="nav-icon" />
                                                <p className="nav-p">Projets</p>
                                            </NavLink>
                                        </li>
                                        <li className="nav-li">
                                            <NavLink to="/login" className={isThisActive}>
                                                <MdOutlineMessage className="nav-icon" />
                                                <p className="nav-p">Messages</p>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                                <div className="nav-container-right">
                                    <ul className="nav-ul">
                                        <li className="nav-li">
                                            <NavLink to="/login" className={isThisActive}>
                                                <IoPersonCircleSharp className="nav-icon" />
                                                <p className="nav-p">Connexion</p>
                                            </NavLink>
                                        </li>
                                        <li className="nav-li">
                                            <NavLink to="/register" className={isThisActive}>
                                                <RiLoginCircleLine className="nav-icon" />
                                                <p className="nav-p">Inscription</p>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {location.pathname === "/register" &&
                            <>
                                <div className="move-back">
                                    <Link to="/">
                                        <ImArrowLeft2 />
                                    </Link>
                                </div>
                                <div className="navbar-form-pages">
                                    <Link to="/">
                                        <div className="logo-inner">
                                            <img src="/img/logo-top.png" alt="" />
                                        </div>
                                    </Link>
                                    <div className="right">
                                        <RiLoginCircleLine className="nav-icon" />
                                        <p>Inscription</p>
                                    </div>
                                </div>
                            </>
                        }
                        {location.pathname === "/login" &&
                            <>
                                <div className="move-back">
                                    <Link to="/">
                                        <ImArrowLeft2 />
                                    </Link>
                                </div>
                                <div className="navbar-form-pages">
                                    <Link to="/">
                                        <div className="logo-inner">
                                            <img src="/img/logo-top.png" alt="" />
                                        </div>
                                    </Link>
                                    <div className="right">
                                        <IoPersonCircleSharp className="nav-icon" />
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
}

export default Navbar;