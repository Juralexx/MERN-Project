import React, { useState, useRef, useEffect } from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { useClickOutside } from '../hooks/useClickOutside'
import { usePopper } from "react-popper";

const ToolsMenu = (props) => {
    const { className, btnClassName, disabled, onClick, placement } = props
    const [open, setOpen] = useState(false)
    const ref = useRef()
    useClickOutside(ref, setOpen, false)

    const popperElRef = useRef(null);
    const [targetElement, setTargetElement] = useState(null);
    const [popperElement, setPopperElement] = useState(popperElRef.current);
    const [arrowElement, setArrowElement] = useState(null);

    const { styles, attributes } = usePopper(targetElement, popperElement, {
        placement: placement || "left-start",
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [-5, 5]
                }
            },
            {
                name: 'arrow',
                options: {
                    element: arrowElement,
                    padding: 10,
                },
            }
        ]
    })

    useEffect(() => {
        if (open)
            setPopperElement(popperElRef.current)
    }, [open])

    return (
        <div ref={ref} className={`${className ? "tools_box " + className : "tools_box"}`} onClick={onClick}>
            {open &&
                <div className="tools_menu" onClick={() => setOpen(false)}
                    ref={popperElRef}
                    style={styles.popper}
                    {...attributes.popper}
                >
                    {props.children}

                    <div className="menu-arrow" ref={setArrowElement} style={styles.arrow} data-popper-arrow></div>
                </div>
            }
            {props.target ? (
                <div ref={setTargetElement} onClick={() => setOpen(!open)}>
                    {props.target}
                </div>
            ) : (
                <button className={`${btnClassName ? "tools_btn " + btnClassName : "tools_btn"}`} ref={setTargetElement} disabled={disabled} onClick={() => setOpen(!open)}>
                    <BiDotsHorizontalRounded />
                </button>
            )}
        </div>
    )
}

export default ToolsMenu