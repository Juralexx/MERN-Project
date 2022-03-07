import React from "react";
import { NavLink } from "react-router-dom";
import { avatar } from "../../tools/functions/useAvatar";
import { OutlinedButton } from "./Button";

const HoverModal = ({ user, style }) => {

    return (
        <div className="absolute bottom-[10px] left-[-120px] p-8" style={style}>
            <div className="bg-background_primary p-4 shadow-custom dark:shadow-lg w-[330px] rounded-xl">
                <div className="flex w-full mb-3">
                    <div className="pr-3">
                        <NavLink to={"/" + user.pseudo}><div className="w-16 h-16 rounded-full" style={avatar(user.picture)}></div></NavLink>
                    </div>
                    <div className="right">
                        <p className="text-lg font-semibold"><NavLink to={"/" + user.pseudo}>{user.pseudo}</NavLink></p>
                        <p>{user.location}</p>
                        <p>{user.created_projects.length} projets créés</p>
                        <p>{user.current_projects.length} projets en cours</p>
                    </div>
                </div>
                <div className="flex justify-between w-full">
                    <NavLink to={"/" + user.pseudo} className="w-1/2">
                        <OutlinedButton fullwidth className="mr-1" text="Voir le profil"></OutlinedButton>
                    </NavLink>
                    <NavLink to={"/projects/" + user.pseudo} className="w-1/2">
                        <OutlinedButton fullwidth className="ml-1" text="Voir les projets"></OutlinedButton>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default HoverModal;