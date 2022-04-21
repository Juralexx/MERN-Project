import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Button, TextButton } from './Button'

const Warning = (props) => {
    const { open, setOpen, css, title, text, onValidate } = props
    const coverClass = open ? 'modal-cover modal-cover-active' : 'modal-cover'
    const containerClass = open ? `modal-container warning-modal modal-container-active show-modal ${css ? css : null}` : 'modal-container warning-modal hide-modal'
    const modalClose = () => { setOpen(false) }

    return (
        open &&
        <div className="modal-wrapper">
            <div className={containerClass}>
                <div className="close-modal" onClick={() => modalClose()}><IoClose /></div>
                <div className="warning-title">{title}</div>
                <div className="warning-text">{text}</div>
                {props.children}
                <div className="btn-container">
                    <TextButton text="Annuler" className="mr-2" onClick={() => modalClose()} />
                    <Button text="Valider" onClick={onValidate} />
                </div>
            </div>
            <div className={coverClass} onClick={modalClose}></div>
        </div>
    )
}

export default Warning