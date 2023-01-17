import React, { useEffect, useRef } from 'react'
import { useClickOutside } from '../hooks/useClickOutside'
import Icon from '../icons/Icon'

const Modal = (props) => {
    const { open, setOpen, className } = props
    const modalRef = useRef()

    const removeScrollY = () => {
        if (document.body.classList.contains('no-scroll-y')) {
            document.body.classList.remove('no-scroll-y');
        } else {
            document.body.classList.add('no-scroll-y');
        }
    }

    useEffect(() => { if (open) removeScrollY() }, [open])

    const close = () => {
        if (open !== typeof Object) {
            setOpen(false)
        } else {
            setOpen(prevState => ({ ...prevState, open: false }))
        }
    }

    useClickOutside(modalRef, () => close())

    return (
        <>
            <div className={open ? "modal_wrapper" : "modal_wrapper hide_wrapper"}>
                <div className={open ? className ? "modal_container show_modal " + className : "modal_container show_modal " : 'modal_container hide_modal'} ref={modalRef}>
                    <div className="close_modal" onClick={() => {
                        close()
                        removeScrollY()
                    }}>
                        <Icon name="Cross" />
                    </div>
                    {props.children}
                </div>
            </div>
            <div className={open ? 'modal_cover modal_cover-active' : 'modal_cover'} onClick={() => {
                close()
                removeScrollY()
            }}></div>
        </>
    )
}

export default Modal