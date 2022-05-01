import React, { useState, useEffect } from "react";
import { BsThreeDots } from 'react-icons/bs'
import SmallMenu from "../tools/components/SmallMenu";
import { IconInput } from "../tools/components/Inputs";
import { IoMdNotificationsOff } from 'react-icons/io'
import { HiPencilAlt } from 'react-icons/hi'
import { AiOutlineFullscreen } from 'react-icons/ai'
import { GoSearch } from 'react-icons/go'
import { Link } from "react-router-dom";

const MessengerMenu = ({ open, setOpen, user, websocket }) => {
    const [openMenu, setOpenMenu] = useState(false)
    const [showUnread, setShowUnread] = useState(false)

    return (
        open &&
        <div className="messages-menu">
            <div className="messages-header">
                <div className="messages-header-inner">
                    <div className="title">Messenger</div>
                    <div className="menu">
                        <div className="tools_btn"><HiPencilAlt /></div>
                        <Link to={"/messenger"}><div className="tools_btn" onClick={() => setOpen(false)}><AiOutlineFullscreen /></div></Link>
                        <div className="tools_btn" onClick={() => setOpenMenu(!openMenu)}><BsThreeDots /></div>
                    </div>
                </div>
                {openMenu &&
                    <SmallMenu>
                        <div className="tools_choice">Tout marquer comme lu</div>
                        <div className="tools_choice">Voir toutes les messages</div>
                    </SmallMenu>
                }
                <div className="messages-navbar">
                    <div className={`navlink ${showUnread ? "" : "active"}`}>Tout</div>
                    <div className={`navlink ${showUnread ? "active" : ""}`}>Non lu</div>
                </div>
                <IconInput className="is_start_icon" placeholder="Rechercher un projet" icon={<GoSearch />} cross/>
            </div>
            <div className="messenger-menu-content">
                {!showUnread &&
                    <div className="empty-messages">
                        <div><IoMdNotificationsOff /></div>
                        <div>Vous n'avez pas de conversations en cours</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default MessengerMenu;