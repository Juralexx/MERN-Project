import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Button, TextButton } from './Button'

const Warning = (props) => {
    const { open, setOpen, css, title, text, cancelBtn, validateBtn, onValidate, onClose } = props
    const coverClass = open ? 'modal_cover modal_cover-active' : 'modal_cover'
    const containerClass = open ? `modal_container warning_modal modal_container-active show_modal ${css ? css : null}` : 'modal_container warning_modal hide_modal'

    const close = onClose ? () => { setOpen(false); onClose() } : () => setOpen(false)
    const validate = onValidate ? () => { setOpen(false); onValidate() } : () => setOpen(false)

    return (
        open &&
        <div className="modal_wrapper">
            <div className={containerClass}>
                <div className="close_modal" onClick={close}><IoClose /></div>
                <div className="warning_title">{title}</div>
                <div className="warning_text">{text}</div>
                {props.children}
                <div className="btn_container">
                    <TextButton text={cancelBtn || "Annuler"} className="mr-2" onClick={close} />
                    <Button text={validateBtn || "Valider"} onClick={validate} />
                </div>
            </div>
            <div className={coverClass} onClick={close}></div>
        </div>
    )
}

export default Warning