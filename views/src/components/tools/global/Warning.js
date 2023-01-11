import React from 'react'
import { Button, TextButton } from '../global/Button'
import Icon from '../icons/Icon'

const Warning = (props) => {
    const { open, setOpen, css, title, text, cancelBtn, validateBtn, onValidate, onClose, className } = props

    const close = onClose ? () => {
        setOpen(false)
        onClose()
    } : () => setOpen(false)

    const validate = onValidate ? () => {
        setOpen(false)
        onValidate()
    } : () => setOpen(false)

    return (
        <>
            <div className={open ? "modal_wrapper" : "modal_wrapper hide_wrapper"}>
                <div className={open ? `modal_container warning_modal modal_container-active show_modal ${css ? css : null}` : 'modal_container warning_modal hide_modal'}>
                    <div className="close_modal" onClick={close}>
                        <Icon name="Cross" />
                    </div>
                    <div className="warning_title">{title}</div>
                    <div className="warning_text">{text}</div>
                    {props.children}
                    <div className="btn_container">
                        <TextButton className="mr-2" onClick={close}>
                            {cancelBtn || "Annuler"}
                        </TextButton>
                        <Button className={className ? className : ""} onClick={validate}>
                            {validateBtn || "Valider"}
                        </Button>
                    </div>
                </div>
            </div>
            <div className={open ? 'modal_cover modal_cover-active' : 'modal_cover'} onClick={close}></div>
        </>
    )
}

export default Warning