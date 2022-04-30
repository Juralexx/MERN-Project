import React from 'react'
import { IoClose } from 'react-icons/io5'

const Modal = (props) => {
    const { open, setOpen, css } = props
    const coverClass = open ? 'modal_cover modal_cover-active' : 'modal_cover'
    const containerClass = open ? `modal_container modal_container-active show_modal ${css ? css : null}` : 'modal_container hide_modal'
    const modalClose = () => { setOpen(false) }

    return (
        open &&
        <div className="modal_wrapper">
            <div className={containerClass}>
                <div className="close_modal" onClick={() => modalClose()}><IoClose /></div>
                {props.children}
            </div>
            <div className={coverClass} onClick={modalClose}></div>
        </div>
    )
}

export default Modal