import React, { useState, useRef, useEffect } from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { useClickOutside } from '../functions/useClickOutside'
import { usePopper } from "react-popper";

const ToolsMenu = (props) => {
    const { className, disabled } = props
    const [open, setOpen] = useState(false)
    const ref = useRef()
    useClickOutside(ref, setOpen, false)

    const popperElRef = React.useRef(null);
    const [targetElement, setTargetElement] = React.useState(null);
    const [popperElement, setPopperElement] = React.useState(popperElRef.current);
    const { styles, attributes } = usePopper(targetElement, popperElement, {
        placement: "left",
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
        <div ref={ref} className={`${className ? "tools_box " + className : "tools_box"}`}>
            <div className={open ? "tools_menu transition open" : "tools_menu transition"} onClick={() => setOpen(false)}
                ref={popperElRef}
                style={styles.popper}
                {...attributes.popper}
            >
                {props.children}
            </div>
            <button className="tools_btn" ref={setTargetElement} disabled={disabled} onClick={()  => setOpen(!open)}>
                <BiDotsHorizontalRounded />
            </button>
        </div>
    )
}

export default ToolsMenu