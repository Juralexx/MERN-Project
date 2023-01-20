import React, { useRef } from 'react'
import styled from 'styled-components'
import { useClickOutside } from '../hooks/useClickOutside'

const MobileMenu = (props) => {
    const { className, onClick, open, setOpen } = props
    const ref = useRef()
    useClickOutside(ref, () => setOpen(false))

    return (
        <MenuMobile ref={ref} className={`${className ? "mobile-menu " + className : "mobile-menu"} ${open ? 'active' : 'unactive'}`} onClick={onClick}>
            <div className="mobile-menu-tools" onClick={() => setOpen(false)}>
                {props.children}
            </div>
        </MenuMobile>
    )
}

export default MobileMenu

const MenuMobile = styled.div`
    display          : none;
    position         : fixed;
    min-width        : 100%;
    top              : unset;
    transform        : none;
    bottom           : -100px;
    left             : 0;
    right            : 0 !important;
    background-color : var(--content-light);
    z-index          : 1000;
    border-radius    : var(--rounded-lg) var(--rounded-lg) 0 0;
    box-shadow       : var(--shadow-top);
    visibility       : hidden;
    opacity          : 0;
    transition       : visibility .4s, opacity .4s, bottom .4s;

    &.active {
       visibility : visible;
       opacity    : 1;
       bottom     : 0;
       transition : visibility .4s, opacity .4s, bottom .4s;
    }

    .mobile-menu-tools {
        position         : relative;
        min-width        : 100%;
        top              : unset;
        transform        : none;
        bottom           : 0;
        left             : 0;
        right            : 0 !important;
        padding          : 10px 0;
        border           : none;
        border-radius    : 8px 8px 0 0;
        background-color : var(--content-light);
    }

    .tools_choice {
        display       : flex;
        align-items   : center;
        min-width     : 220px;
        text-align    : left;
        padding       : 8px 20px;
        color         : var(--text);
        cursor        : pointer;

        a {
            display     : flex;
            align-items : center;
            width       : 100%;
            height      : 100%;
        }

        svg {
            height       : 16px;
            width        : 16px;
            margin-right : 9px;
            color        : var(--svg-x-light);
        }

        &:hover {
            background-color : var(--light);
            svg {
                color : var(--primary);
            }
        }
    }

    @media(max-width: 576px) {
        display : block;
    }
`