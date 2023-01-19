import React, { useRef } from 'react'
import { useClickOutside } from '../hooks/useClickOutside'
import Icon from '../icons/Icon'

const Modal = (props) => {
    const { open, setOpen, onClose, className } = props
    const modalRef = useRef()

    const close = () => {
        if (onClose) {
            onClose()
        } else {
            if (open !== typeof Object) {
                setOpen(false)
            } else {
                setOpen(prevState => ({ ...prevState, open: false }))
            }
        }
    }

    useClickOutside(modalRef, () => close())

    return (
        <>
            <div className={open ? "modal_wrapper" : "modal_wrapper hide_wrapper"}>
                <div className={open ? className ? "modal_container show_modal " + className : "modal_container show_modal " : 'modal_container hide_modal'} ref={modalRef}>
                    <div className="close_modal" onClick={() => close()}>
                        <Icon name="Cross" />
                    </div>
                    {props.children}
                </div>
            </div>
            <div className={open ? 'modal_cover modal_cover-active' : 'modal_cover'} onClick={() => close()}></div>
        </>
    )
}

export default Modal