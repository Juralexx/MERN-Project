import React, { useRef } from 'react'
import { IoClose } from 'react-icons/io5'
import { useClickOutside } from '../hooks/useClickOutside'

const Modal = (props) => {
    const { open, setOpen, className } = props
    const mapRef = useRef()
    useClickOutside(mapRef, () => setOpen(false))

    return (
        <>
            <div className={open ? "modal_wrapper" : "modal_wrapper hide_wrapper"}>
                <div className={open ? className ? "modal_container show_modal " + className : "modal_container show_modal " : 'modal_container hide_modal'} ref={mapRef}>
                    <div className="close_modal" onClick={() => setOpen(false)}>
                        <IoClose />
                    </div>
                    {props.children}
                </div>
            </div>
            <div className={open ? 'modal_cover modal_cover-active' : 'modal_cover'} onClick={() => setOpen(false)}></div>
        </>
    )
}

export default Modal