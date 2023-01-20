import React from 'react'
import styled from 'styled-components'

const NavbarToggle = (props) => {
    return (
        <Toggle className="navbar-toggle" onClick={props.onClick}>
            <svg viewBox="0 0 800 600" className={`${props.open ? "open" : ""}`}>
                <path d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" className="top-bar" />
                <path d="M300,320 L540,320" className="middle-bar" />
                <path d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190" className="bottom-bar" transform="translate(480, 320) scale(1, -1) translate(-480, -318)" />
            </svg>
        </Toggle>
    )
}

export default NavbarToggle

const Toggle = styled.div`
    display    : none;
    right      : 0;
    top        : 0;
    cursor     : pointer;
    margin-top : 5px;

    svg {
        width     : 44px;
        height    : auto;

        path {
            stroke-width   : 30;
            stroke-linecap : round;
            stroke         : var(--svg-x-light);
            fill           : none;
            transition     : all .5s ease-in-out;
        }
    }

    svg {
        &.open {
            path {
                stroke : var(--primary);
            }
        }
    }

    .top-bar {
        stroke-dasharray : 240px 910px;
    }

    .bottom-bar {
        stroke-dasharray : 150px 910px;
    }

    .middle-bar {
        stroke-dasharray : 240px 240px;
    }

    // CROSS FORM

    .open .top-bar,
    .open .bottom-bar {
        stroke-dashoffset : -650px;
        stroke-dasharray  : 240px 910px;
    }

    .open .middle-bar {
        stroke-dasharray  : 0px 220px;
        stroke-dashoffset : -120px;
    }

    @media(max-width:992px) {
        display         : flex;
        align-items     : center;
        justify-content : center;
        margin-bottom   : 7px;
    }
`