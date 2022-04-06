import React from "react";
import { Link } from "react-router-dom";
import { IoIosLink } from 'react-icons/io'
import { FiLayers } from 'react-icons/fi'
import { AiOutlineHome, AiOutlineEye, AiOutlineHeart, AiOutlineDownload } from 'react-icons/ai'

const HeaderNavbar = () => {

    return (
        <div className="header-nav">
            <ul className="header-nav-ul">
                <li className="header-nav-li">
                    <Link to="/">
                        <AiOutlineHome />
                        <p>Général</p>
                    </Link>
                </li>
                <li className="header-nav-li">
                    <Link to="/all-projects">
                        <FiLayers />
                        <p>Tous les projets</p>
                    </Link>
                </li>
                <li className="header-nav-li">
                    <Link to="/most-followed">
                        <IoIosLink />
                        <p>Plus suivis</p>
                    </Link>
                </li>
                <li className="header-nav-li">
                    <Link to="/most-viewed">
                        <AiOutlineEye />
                        <p>Plus consultés</p>
                    </Link>
                </li>
                <li className="header-nav-li">
                    <Link to="/most-liked">
                        <AiOutlineHeart />
                        <p>Plus aimés</p>
                    </Link>
                </li>
                <li className="header-nav-li">
                    <Link to="/latest-added">
                        <AiOutlineDownload />
                        <p>Derniers ajoutés</p>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default HeaderNavbar;