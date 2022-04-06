import React from "react";
import { Link } from "react-router-dom";
import { avatar } from "../../tools/functions/useAvatar";
import { Button } from "./Button";

const HoverModal = ({ user, style }) => {

    return (
        <div className="hovered-card" style={style}>
            <div className="hovered-modal-container">
                <div className="hovered-modal-head">
                    <div className="left">
                        <Link to={"/" + user.pseudo}><div className="hovered-modal-avatar" style={avatar(user.picture)}></div></Link>
                    </div>
                    <div className="right">
                        <div className="hovered-card-name">
                            <Link to={"/" + user.pseudo}>{user.pseudo}</Link>
                        </div>
                        {user.location && <p>{user.location}</p>}
                        <p>{user.created_projects.length} projets créés</p>
                        <p>{user.current_projects.length} projets en cours</p>
                    </div>
                </div>
                <div className="flex mt-5">
                    <Link to={"/" + user.pseudo} className="mr-1">
                        <Button text="Voir le profil" />
                    </Link>
                    <Link to={"/projects/" + user.pseudo}>
                        <Button text="Voir les projets" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HoverModal;