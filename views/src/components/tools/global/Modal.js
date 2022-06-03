import React from 'react'
import { IoClose } from 'react-icons/io5'

const Modal = (props) => {
    const { open, setOpen, className } = props
    const wrapperClass = open ? "modal_wrapper" : "modal_wrapper hide_wrapper"
    const coverClass = open ? 'modal_cover modal_cover-active' : 'modal_cover'
    const containerClass = open ? (
        className ? "modal_container show_modal " + className : "modal_container show_modal "
    ) : (
        'modal_container hide_modal'
    )

    return (
        <div className={wrapperClass}>
            <div className={containerClass}>
                <div className="close_modal" onClick={() => setOpen(false)}><IoClose /></div>
                {props.children}
            </div>
            <div className={coverClass} onClick={() => setOpen(false)}></div>
        </div>
    )
}

export default Modal