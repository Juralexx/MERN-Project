import React, { useEffect, useRef } from 'react'
import { IoClose } from 'react-icons/io5'
import { useClickOutside } from '../hooks/useClickOutside'

const Modal = (props) => {
    const { open, setOpen, className } = props
    const mapRef = useRef()
    useClickOutside(mapRef, () => setOpen(false))

    const removeScrollY = () => {
        if (document.body.classList.contains('no-scroll-y')) {
            document.body.classList.remove('no-scroll-y');
        } else {
            document.body.classList.add('no-scroll-y');
        }
    }

    useEffect(() => { if (open) removeScrollY() }, [open])

    const close = () => {
        setOpen(false)
        removeScrollY()
    }

    return (
        <>
            <div className={open ? "modal_wrapper" : "modal_wrapper hide_wrapper"}>
                <div className={open ? className ? "modal_container show_modal " + className : "modal_container show_modal " : 'modal_container hide_modal'} ref={mapRef}>
                    <div className="close_modal" onClick={close}>
                        <IoClose />
                    </div>
                    {props.children}
                </div>
            </div>
            <div className={open ? 'modal_cover modal_cover-active' : 'modal_cover'} onClick={close}></div>
        </>
    )
}

export default Modal