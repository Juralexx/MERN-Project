import React, { useState } from 'react'
import { VscError } from 'react-icons/vsc'
import { IoCloseOutline } from 'react-icons/io5'

export const ErrorCard = (props) => {
    const { text, display, useRef, className } = props
    const [open, setOpen] = useState(display)
    return (
        open && (
            <div className={`${className ? 'is-error ' + className : 'is-error'}`} ref={useRef} display={(open).toString()}>
                <VscError className="error-icon" />
                <div className="is-error-content">
                    {/* <div className="title">Erreur</div> */}
                    <div className="text">{text}</div>
                </div>
                <IoCloseOutline className="close-icon" onClick={() => setOpen(!open)}/>
            </div>
        )
    )
}