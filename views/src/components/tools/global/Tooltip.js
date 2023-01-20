import React, { useState, useEffect, useRef } from 'react'
import { usePopper } from "react-popper";
import styled from 'styled-components';

const Tooltip = (props) => {
    const [open, setOpen] = useState(false)

    const popperElRef = useRef(null);
    const [targetElement, setTargetElement] = useState(null);
    const [popperElement, setPopperElement] = useState(popperElRef.current);
    const [arrowElement, setArrowElement] = useState(null);
    const { styles, attributes } = usePopper(targetElement, popperElement, {
        placement: props.placement || "top",
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, 12]
                }
            },
            {
                name: 'arrow',
                options: {
                    element: arrowElement,
                    padding: 5,
                },
            },
        ]
    })

    useEffect(() => {
        if (open)
            setPopperElement(popperElRef.current)
    }, [open])

    return (
        <>
            <ToolTip
                className={`${open ? "open" : "closed"}`}
                id="tooltip"
                role="tooltip"
                ref={popperElRef}
                style={styles.popper}
                {...attributes.popper}
                key={props.key}
            >
                {props.content}
                <div className="tooltip-arrow" ref={setArrowElement} style={styles.arrow} data-popper-arrow></div>
            </ToolTip>
            <div className="tooltip-target flex" ref={setTargetElement} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                {props.children}
            </div>
        </>
    )
}

export default Tooltip

const ToolTip = styled.div`
    display       : flex;
    position      : absolute;
    width         : auto;
    padding       : 7px 10px;
    border-radius : var(--rounded-md);
    background    : var(--tooltip);
    border        : 1px solid var(--light-border);
    z-index       : 700;
    visibility    : hidden;
    opacity       : 0;
    transition    : visibility 5s, opacity .2s;
    box-shadow    : var(--shadow-light);

    &.open {
        visibility : visible;
        opacity    : 1;

        .tooltip-arrow {
            &:before {
                visibility : visible;
            }
        }
    }
    
    .tooltip-arrow {
        position   : absolute;
        width      : 12px;
        height     : 12px;
        background : inherit;
        visibility : hidden;
        
        &:before {
            position      : absolute;
            width         : 12px;
            height        : 12px;
            background    : inherit;
            visibility    : hidden;
            border-radius : 3px;
            content       : '';
            transform     : rotate(45deg);
            transition    : visibility 5s;
        }
    }

    &[data-popper-placement^='top'] > .tooltip-arrow {
        bottom : -6px;

        &:before {
            border-bottom   : 1px solid var(--light-border);
            border-right : 1px solid var(--light-border);
        }
    }

    &[data-popper-placement^='bottom'] > .tooltip-arrow {
        top : -6px;

        &:before {
            border-top  : 1px solid var(--light-border);
            border-left : 1px solid var(--light-border);
        }
    }

    &[data-popper-placement^='left'] > .tooltip-arrow {
        right : -6px;

        &:before {
            border-top   : 1px solid var(--light-border);
            border-right : 1px solid var(--light-border);
        }
    }

    &[data-popper-placement^='right'] > .tooltip-arrow {
        left : -6px;
        
        &:before {
            border-top  : 1px solid var(--light-border);
            border-left : 1px solid var(--light-border);
        }
    }

    p {
        color      : var(--white);
        font-size  : 13px;
        text-align : center;
    }
`