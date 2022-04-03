import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import MiniNav from "./mini-nav/MiniNav";
import { AiFillHome } from 'react-icons/ai'
import { MdOutlineMessage, MdOutlineScreenSearchDesktop } from 'react-icons/md'
import { IoPersonCircleSharp } from 'react-icons/io5'
import { RiLoginCircleLine } from 'react-icons/ri'
import { FaProjectDiagram } from 'react-icons/fa'
import { StartIconOutlinedButton } from "./tools/components/Button";
import { MdOutlineLibraryAdd } from "react-icons/md";

const Navbar = ({ websocket, user }) => {
    const uid = useContext(UidContext)
    const isThisActive = ({ isActive }) => (!isActive ? "nav-link" : "nav-link active")

    return (
        <header>
            <nav className="navbar">
                <div className="logo-container">
                    <Link to="/">
                        <div className="logo-inner">
                            <img src="/img/logo-top.png" alt="" />
                        </div>
                    </Link>
                    <Link to="/add-project" className="ml-10">
                        <StartIconOutlinedButton text="Ajouter un projet" icon={<MdOutlineLibraryAdd />} />
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
                                    <NavLink to="/recent-searches" className={isThisActive}>
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
                        <>
                            <MiniNav user={user} websocket={websocket} />
                        </>
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
                                    <NavLink to="/" className={isThisActive}>
                                        <MdOutlineScreenSearchDesktop className="nav-icon" />
                                        <p className="nav-p">Recherches</p>
                                    </NavLink>
                                </li>
                                <li className="nav-li">
                                    <NavLink to="/" className={isThisActive}>
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
                        <div className="nav-container-right">
                            <ul className="nav-ul">
                                <li className="nav-li">
                                    <NavLink to="/login" className={isThisActive}>
                                        <IoPersonCircleSharp className="nav-icon" />
                                        <p className="nav-p">Se connecter</p>
                                    </NavLink>
                                </li>
                                <li className="nav-li">
                                    <NavLink to="/register" className={isThisActive}>
                                        <RiLoginCircleLine className="nav-icon" />
                                        <p className="nav-p">S'inscrire</p>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </>
                )}
            </nav>
        </header >
    )
}

export default Navbar;