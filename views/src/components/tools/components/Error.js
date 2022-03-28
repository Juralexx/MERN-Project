import React from 'react'
import { VscError } from 'react-icons/vsc'

export const ErrorCard = (props) => {
    const { text, show, useRef } = props
    return (
        show && (
            <div className="is-error" ref={useRef} show={show}>
                <VscError />
                <div className="is-error-content">
                    {/* <div className="title">Erreur</div> */}
                    <div className="text">{text}</div>
                </div>
            </div>
        )
    )
}