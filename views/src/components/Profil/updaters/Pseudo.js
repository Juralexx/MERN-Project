import React from "react";
import { useSelector } from "react-redux";

const Pseudo = () => {
    const userData = useSelector((state) => state.userReducer)
    return (
        <div className="user-info">
            <p><i className="fas fa-user-circle"></i>{userData.pseudo}</p>
        </div>
    )
}

export default Pseudo;