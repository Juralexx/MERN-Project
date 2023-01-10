import React from 'react'
import { VscError } from 'react-icons/vsc'
import { IoCloseOutline } from 'react-icons/io5'

export const ErrorCard = (props) => {
    const { text, display, useRef, className, clean } = props

    return (
        display && (
            <div
                className={`${className ? 'is_error ' + className : 'is_error'}`}
                ref={useRef}
                display={(display).toString()}
            >
                <VscError className="error-icon" />
                <div className="is_error-content">
                    <div className="text">{text}</div>
                </div>
                <IoCloseOutline className="close-icon" onClick={clean} />
            </div>
        )
    )
}