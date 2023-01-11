import React, { useState } from 'react'
import Icon from '../icons/Icon'
import { Button } from './Button'

const ErrorModal = (props) => {
    const { css, title, text } = props
    const [open, setOpen] = useState(true)

    return (
        open && (
            <div className="modal_wrapper">
                <div className={open ? `modal_container warning_modal modal_container-active show_modal ${css ? css : null}` : 'modal_container warning_modal hide_modal'}>
                    <div className="close_modal" onClick={() => setOpen(false)}>
                        <Icon name="Cross" />
                    </div>
                    <div className="warning_title">{title}</div>
                    <div className="warning_text">{text}</div>
                    {props.children}
                    <div className="btn_container">
                        <Button onClick={() => setOpen(false)}>Fermer</Button>
                    </div>
                </div>
                <div className={open ? 'modal_cover modal_cover-active' : 'modal_cover'} onClick={() => setOpen(false)}></div>
            </div>
        )
    )
}

export default ErrorModal