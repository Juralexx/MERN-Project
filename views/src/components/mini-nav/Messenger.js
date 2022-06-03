import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addClass } from "../Utils";
import { IconInput } from "../tools/global/Inputs";
import ToolsMenu from "../tools/global/ToolsMenu";
import { IoMdNotificationsOff } from 'react-icons/io'
import { HiPencilAlt } from 'react-icons/hi'
import { AiOutlineFullscreen } from 'react-icons/ai'
import { GoSearch } from 'react-icons/go'

const MessengerMenu = ({ open, setOpen, user, websocket }) => {
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
                        <ToolsMenu>
                            <div className="tools_choice">Tout marquer comme lu</div>
                            <div className="tools_choice">Voir toutes les messages</div>
                        </ToolsMenu>
                    </div>
                </div>
                <div className="messages-navbar">
                    <div className={`navlink ${addClass(!showUnread, "active")}`} onClick={() => setShowUnread(false)}>Tout</div>
                    <div className={`navlink ${addClass(showUnread, "active")}`} onClick={() => setShowUnread(true)}>Non lu</div>
                </div>
                <IconInput className="is_start_icon" placeholder="Rechercher un projet" icon={<GoSearch />} cross />
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