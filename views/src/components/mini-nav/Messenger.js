import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addClass } from "../Utils";
import { IconInput } from "../tools/global/Inputs";
import ToolsMenu from "../tools/global/ToolsMenu";
import Icon from "../tools/icons/Icon";

const MessengerMenu = ({ open, setOpen, user, websocket }) => {
    const [showUnread, setShowUnread] = useState(false)

    return (
        open && (
            <div className="notifications-menu messages-menu">
                <div className="notifications-header">
                    <h5>Messenger</h5>
                    <div className="flex items-center">
                        <div className="tools_btn">
                            <Icon name="Edit" />
                        </div>
                        <Link to={"/messenger"}>
                            <div className="tools_btn" onClick={() => setOpen('')}>
                                <Icon name="PositionSquare" />
                            </div>
                        </Link>
                        <ToolsMenu>
                            <div className="tools_choice">Tout marquer comme lu</div>
                            <div className="tools_choice">Voir toutes les messages</div>
                        </ToolsMenu>
                    </div>
                </div>
                <div className="notifications-navbar">
                    <div className={addClass(!showUnread, "active")} onClick={() => setShowUnread(false)}>
                        Tout
                    </div>
                    <div className={addClass(showUnread, "active")} onClick={() => setShowUnread(true)}>
                        Non lu
                    </div>
                </div>
                <IconInput
                    className="is_start_icon"
                    placeholder="Rechercher une conversation"
                    icon={<Icon name="Search" />}
                    cross
                />
                <div className="messenger-menu-content">
                    {!showUnread &&
                        <div className="empty-notifications">
                            <Icon name="Chat" />
                            <div>Vous n'avez pas de conversation en cours</div>
                        </div>
                    }
                </div>
            </div>
        )
    )
}

export default MessengerMenu;