import React from 'react'

const Modal = (props) => {
    const { open, setOpen, css } = props
    const coverClass = open ? 'modal-cover modal-cover-active' : 'modal-cover'
    const containerClass = open ? `modal-container modal-container-active show-modal ${css ? css : null}` : 'modal-container hide-modal'
    const modalClose = () => { setOpen(false) }

    return (
        <>
            <div className={containerClass}>
                <div className="modal-inner">
                    {props.children}
                </div>
            </div>
            <div className={coverClass} onClick={modalClose}></div>
        </>
    )
}

export default Modal