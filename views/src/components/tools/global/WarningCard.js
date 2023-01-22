import React, { useState } from 'react'
import styled from 'styled-components'
import Icon from '../icons/Icon'

export const WarningCard = (props) => {
    const { text, display, useRef, className, clean } = props

    return (
        display && (
            <Warning
                className={className}
                ref={useRef}
                display={display}
            >
                <Icon name="WarningTriangle" className="warning-icon" />
                <div className="is_error-content">
                    <div className="text">{text}</div>
                </div>
                <Icon name="Cross" className="close-icon" onClick={clean} />
            </Warning>
        )
    )
}

const Warning = styled.div`
    position         : relative;
    display          : flex;
    align-items      : center;
    padding          : 10px;
    max-width        : 100%;
    background-color : rgba(var(--warning-rgb), 0.3);
    border           : 1px solid var(--warning);
    border-left      : 5px solid var(--warning);
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

    .warning-icon {
        min-height   : 24px;
        min-width    : 24px;
        margin-right : 8px;
        color        : var(--orange);
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