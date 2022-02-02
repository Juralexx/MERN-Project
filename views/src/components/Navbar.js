import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import MiniNav from "./mini-nav/MiniNav";
import { AiOutlineHome, AiOutlineUnorderedList, AiOutlineFundProjectionScreen } from 'react-icons/ai'
import { IoPersonCircleSharp } from 'react-icons/io5'
import { RiLoginCircleLine } from 'react-icons/ri'

const Navbar = () => {
    const uid = useContext(UidContext)
    //const active = (navData) => navData.isActive ? "activeLink" : ""

    return (
        <header>
            <nav>
                <div className="logo-container">
                    <NavLink to="/">
                        <div className="logo">
                            <img src="/img/logo-top.png" alt="" />
                        </div>
                    </NavLink>
                </div>

                {uid ? (
                    <>
                        <div className="navbar-container">
                            <ul>
                                <li className="to-home">
                                    <NavLink to="/">
                                        <AiOutlineHome />
                                        <p>Accueil</p>
                                    </NavLink>
                                </li>
                                <li className="to-search-history">
                                    <NavLink to="/">
                                        <AiOutlineUnorderedList />
                                        <p>Mes recherches</p>
                                    </NavLink>
                                </li>
                                <li className="to-favorites">
                                    <NavLink to="/projects">
                                        <AiOutlineFundProjectionScreen />
                                        <p>Mes Projets</p>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <>
                            <MiniNav />
                        </>
                    </>
                ) : (
                    <div className="navbar-container">
                        <ul>
                            <li className="to-home">
                                <NavLink to="/">
                                    <AiOutlineHome />
                                    <p>Accueil</p>
                                </NavLink>
                            </li>
                            <li className="to-search-history">
                                <NavLink to="/">
                                    <AiOutlineUnorderedList />
                                    <p>Mes recherches</p>
                                </NavLink>
                            </li>
                            <li className="to-favorites">
                                <NavLink to="/">
                                    <AiOutlineFundProjectionScreen />
                                    <p>Projets</p>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/login">
                                    <IoPersonCircleSharp />
                                    <p>Se connecter</p>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/register">
                                    <RiLoginCircleLine />
                                    <p>S'inscrire</p>
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