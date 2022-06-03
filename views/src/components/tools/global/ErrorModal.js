import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Button } from './Button'

const ErrorModal = (props) => {
    const { css, title, text } = props
    const [open, setOpen] = useState(true)
    const coverClass = open ? 'modal_cover modal_cover-active' : 'modal_cover'
    const containerClass = open ? `modal_container warning_modal modal_container-active show_modal ${css ? css : null}` : 'modal_container warning_modal hide_modal'

    const close = () => setOpen(false)

    return (
        open &&
        <div className="modal_wrapper">
            <div className={containerClass}>
                <div className="close_modal" onClick={close}><IoClose /></div>
                <div className="warning_title">{title}</div>
                <div className="warning_text">{text}</div>
                {props.children}
                <div className="btn_container">
                    <Button text="Fermer" onClick={close} />
                </div>
            </div>
            <div className={coverClass} onClick={close}></div>
        </div>
    )
}

export default ErrorModal