import React, { useContext } from "react";
import { useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./log/Logout";

const Navbar = () => {
    const uid = useContext(UidContext)
    const userData = useSelector((state) => state.userReducer)

    return (
        <nav>
            <div className="container">
                <div className="logo-container">
                    <NavLink to="/">
                        <div className="logo">
                            <img src="/img/logo-top.png" alt="" />
                        </div>
                    </NavLink>
                </div>

                { uid ? (
                    <ul>
                        <li className="to-profil">
                            <NavLink to="/profil">
                                <i className="fas fa-user"></i>
                                <p>{ userData.pseudo }</p>
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                ) : (
                    <ul>
                        <li>
                            <NavLink to="/login">
                                <i className="fas fa-user"></i>
                                <p>Se connecter</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/register">
                                <i className="fas fa-edit"></i>
                                <p>S'inscrire</p>
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    )
}

export default Navbar;