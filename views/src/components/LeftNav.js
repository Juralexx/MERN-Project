import React from "react";
import { NavLink } from "react-router-dom";
import { IoIosLink } from 'react-icons/io'
import { AiOutlineHome, AiOutlineEye, AiOutlineHeart, AiOutlineDownload } from 'react-icons/ai'

const LeftNav = () => {

    return (
        <div className="left-nav">
            <div className="left-nav-container">
                <ul>
                    <li className="to-general">
                        <NavLink to="/">
                            <AiOutlineHome />
                            <p>Général</p>
                        </NavLink>
                    </li>
                    <li className="to-most-followed">
                        <NavLink to="/most-followed">
                            <IoIosLink />
                            <p>Plus suivis</p>
                        </NavLink>
                    </li>
                    <li className="to-most-viewed">
                        <NavLink to="/most-viewed">
                            <AiOutlineEye />
                            <p>Plus consultés</p>
                        </NavLink>
                    </li>
                    <li className="to-most-liked">
                        <NavLink to="/most-liked">
                            <AiOutlineHeart />
                            <p>Plus aimés</p>
                        </NavLink>
                    </li>
                    <li className="to-latest-added">
                        <NavLink to="/latest-added">
                            <AiOutlineDownload />
                            <p>Derniers ajoutés</p>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default LeftNav;