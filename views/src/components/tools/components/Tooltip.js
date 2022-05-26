import React, { useState, useEffect, useRef } from 'react'
import { usePopper } from "react-popper";

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
            }
        ]
    })

    useEffect(() => {
        if (open)
            setPopperElement(popperElRef.current)
    }, [open])

    return (
        <>
            <div
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
            </div>
            <div className="tooltip-target" ref={setTargetElement} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                {props.children}
            </div>
        </>
    )
}

export default Tooltip