import React from 'react'
import { dateParser } from '../../Utils'
import ToolsMenu from '../../tools/components/ToolsMenu'

const MessageDate = ({ message }) => {

    return (
        <div className="messages-date">
            <div className="date">{dateParser(message.createdAt)}</div>
            {/* <ToolsMenu placement="bottom" target={
            }>
                <div className="tools_choice">Hier</div>
                <div className="tools_choice">La semaine dernière</div>
                <div className="tools_choice">Le mois dernier</div>
                <div className="tools_choice">Premiers messages</div>
                <div className="tools_choice">Accèder à une date spécifique</div>
            </ToolsMenu> */}
        </div>
    )
}

export default MessageDate