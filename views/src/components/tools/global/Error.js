import React from 'react'
import styled from 'styled-components'
import Icon from '../icons/Icon'

export const ErrorCard = (props) => {
    const { text, display, useRef, className, clean } = props

    return (
        display && (
            <Error
                className={className}
                ref={useRef}
                display={(display).toString()}
            >
                <Icon name="CrossCircle" className="error-icon" />
                <div className="is_error-content">
                    <div className="text">{text}</div>
                </div>
                <Icon name="Cross" className="close-icon" onClick={clean} />
            </Error>
        )
    )
}

const Error = styled.div`
    position         : relative;
    display          : flex;
    align-items      : center;
    padding          : 10px;
    max-width        : 100%;
    background-color : rgba(var(--red-rgb), 0.4);
    border           : 1px solid var(--red);
    border-left      : 5px solid var(--red);
    font-size        : 14px;
    margin-top       : 4px;
    border-radius    : var(--rounded-sm);

    .title {
        font-size      : 16px;
        font-weight    : 600;
        letter-spacing : 0.6px;
    }

    .error-icon {
        min-height   : 20px;
        min-width    : 20px;
        margin-right : 8px;
    }

    .close-icon {
        position   : absolute;
        top        : 5px;
        right      : 5px;
        min-height : 18px;
        min-width  : 18px;
        cursor     : pointer;
    }
`