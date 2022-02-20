import React, { useEffect, useRef, useState } from 'react'
import { dateParser } from '../Utils'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { useClickOutside } from '../tools/functions/useClickOutside'

const MessageDate = ({ message }) => {
    const [open, setOpen] = useState(false)
    const wrapperRef = useRef()

    useClickOutside(wrapperRef, setOpen)

    return (
        <div className="messages-date" ref={wrapperRef}>
            <p onClick={() => setOpen(!open)}>{dateParser(message.createdAt)} <MdOutlineKeyboardArrowDown /></p>
            {open && (
                <div className="message-date-sort-tools">
                    <ul>
                        <li>Hier</li>
                        <li>La semaine dernière</li>
                        <li>Le mois dernier</li>
                        <li>Premiers messages</li>
                        <li>Accèder à une date spécifique</li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default MessageDate