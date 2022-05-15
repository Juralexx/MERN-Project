import React, { useRef, useState } from 'react'
import { dateParser } from '../Utils'
import { useClickOutside } from '../tools/functions/useClickOutside'
import ToolsMenu from '../tools/components/ToolsMenu'

const MessageDate = ({ message }) => {

    return (
        <div className="messages-date">
            <ToolsMenu placement="bottom" target={
                <div className="date">{dateParser(message.createdAt)}</div>
            }>
                <div className="tools_choice">Hier</div>
                <div className="tools_choice">La semaine dernière</div>
                <div className="tools_choice">Le mois dernier</div>
                <div className="tools_choice">Premiers messages</div>
                <div className="tools_choice">Accèder à une date spécifique</div>
            </ToolsMenu>
        </div>
    )
}

export default MessageDate