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
    padding          : 5px 5px;
    max-width        : 100%;
    background-color : rgba(var(--danger-rgb), 0.3);
    border           : 1px solid var(--danger);
    border-left      : 5px solid var(--danger);
    font-size        : 14px;
    margin-top       : 4px;
    border-radius    : var(--rounded-sm);

    .title {
        font-size      : 16px;
        font-weight    : 600;
        letter-spacing : 0.6px;
    }

    .text {
        padding-right : 10px;
    }

    .error-icon {
        min-height   : 22px;
        min-width    : 22px;
        margin-right : 8px;
        color        : var(--danger);
    }

    .close-icon {
        position : absolute;
        top      : 5px;
        right    : 5px;
        height   : 18px;
        width    : 18px;
        cursor   : pointer;
    }
`