import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./log/Logout";

const Navbar = () => {
    const uid = useContext(UidContext)

    return (
        <nav>
            <div className="container">
                <div className="logo-container">
                    <NavLink to="/">
                        <div className="logo">
                            <img src="/img/logo.png" alt="" />
                        </div>
                    </NavLink>
                </div>

                { uid ? (
                    <ul>
                        <li className="to-profil">
                            <NavLink to="/profil">
                                <i class="fas fa-user"></i>
                                <p>Pseudo</p>
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                ) : (
                    <ul>
                        <li>
                            <NavLink to="/login">
                                <i class="fas fa-user"></i>
                                <p>Se connecter</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/register">
                                <i class="fas fa-edit"></i>
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