import React, { useContext, useState } from "react";
import { useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";
import { BsFillCaretDownFill, BsChatRightTextFill, BsHeartFill } from 'react-icons/bs'
import { AiFillHome } from 'react-icons/ai'
import { IoIosAlbums } from 'react-icons/io'
import { ImLink } from 'react-icons/im'
import { FaEye } from 'react-icons/fa'

const LeftNav = () => {
    const userData = useSelector((state) => state.userReducer)
    const avatar = {
        backgroundImage: "url(" + userData.picture + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
    }

    return (
        <div className="left-nav-container">
            <ul>
                <li className="to-general">
                    <NavLink to="/">
                    <AiFillHome />
                        <p>Général</p>
                    </NavLink>
                </li>
                <li className="to-most-followed">
                    <NavLink to="/most-followed">
                        <ImLink />
                        <p>Les plus suivis</p>
                    </NavLink>
                </li>
                <li className="to-most-viewed">
                    <NavLink to="/most-viewed">
                        <FaEye />
                        <p>Les plus consultés</p>
                    </NavLink>
                </li>
                <li className="to-most-liked">
                    <NavLink to="/most-liked">
                        <BsHeartFill />
                        <p>Les plus aimés</p>
                    </NavLink>
                </li>
                <li className="to-latest-added">
                    <NavLink to="/latest-added">
                        <IoIosAlbums />
                        <p>Les derniers ajoutés</p>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default LeftNav;