import React from "react";
import { NavLink } from "react-router-dom";
import { avatar } from "../../tools/functions/useAvatar";

const HoverModal = ({ user, style }) => {

    return (
        <div className="user-info-modal" style={style}>
            <div className="top">
                <div className="left">
                    <NavLink to={"/" + user.pseudo}><div className="avatar" style={avatar(user.picture)}></div></NavLink>
                </div>
                <div className="right">
                    <p><NavLink to={"/" + user.pseudo}>{user.pseudo}</NavLink></p>
                    <p>{user.location}</p>
                    <p>{user.created_projects.length} projets créés</p>
                    <p>{user.current_projects.length} projets en cours</p>
                </div>
            </div>
            <div className="bottom">
                <button className="btn btn-secondary"><NavLink to={"/" + user.pseudo}>Voir le profil</NavLink></button>
                <button className="btn btn-secondary"><NavLink to={"/projects/" + user.pseudo}>Voir les projets</NavLink></button>
            </div>
        </div>
    )
}

export default HoverModal;