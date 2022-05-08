import React, { useRef, useState } from 'react'
import { dateParser } from '../Utils'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { useClickOutside } from '../tools/functions/useClickOutside'

const MessageDate = ({ message }) => {
    const [open, setOpen] = useState(false)
    const wrapperRef = useRef()

    useClickOutside(wrapperRef, setOpen, false)

    return (
        <div className="messages-date" ref={wrapperRef}>
            <div className="date" onClick={() => setOpen(!open)}>{dateParser(message.createdAt)} <MdOutlineKeyboardArrowDown /></div>
            {open &&
                <div className="message-date-sort-tools">
                    <div>Hier</div>
                    <div>La semaine dernière</div>
                    <div>Le mois dernier</div>
                    <div>Premiers messages</div>
                    <div>Accèder à une date spécifique</div>
                </div>
            }
        </div>
    )
}

export default MessageDate