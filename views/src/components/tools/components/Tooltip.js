import React, { useState, useEffect } from 'react'
import { usePopper } from "react-popper";

const Tooltip = (props) => {
    const { className } = props
    const [open, setOpen] = useState(false)

    const popperElRef = React.useRef(null);
    const [targetElement, setTargetElement] = useState(null);
    const [popperElement, setPopperElement] = useState(popperElRef.current);
    const { styles, attributes } = usePopper(targetElement, popperElement, {
        placement: "top",
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, 0]
                }
            }
        ]
    })

    useEffect(() => {
        if (open)
            setPopperElement(popperElRef.current)
    }, [open])

    return (
        <>
            {open &&
                <div
                    className={`${className ? "tooltip " + className : "tooltip"}`}
                    ref={popperElRef}
                    style={styles.popper}
                    {...attributes.popper}
                >
                    {props.content}
                </div>
            }
            <div ref={setTargetElement} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                {props.children}
            </div>
        </>
    )
}

export default Tooltip