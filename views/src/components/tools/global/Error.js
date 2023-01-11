import React from 'react'
import Icon from '../icons/Icon'

export const ErrorCard = (props) => {
    const { text, display, useRef, className, clean } = props

    return (
        display && (
            <div
                className={`${className ? 'is_error ' + className : 'is_error'}`}
                ref={useRef}
                display={(display).toString()}
            >
                <Icon name="CrossCircle" className="error-icon" />
                <div className="is_error-content">
                    <div className="text">{text}</div>
                </div>
                <Icon name="Cross" className="close-icon" onClick={clean} />
            </div>
        )
    )
}