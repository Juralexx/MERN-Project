import React, { useState, useRef } from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { useClickOutside } from '../functions/useClickOutside'

const ToolsMenu = (props) => {
    const { className, disabled } = props
    const [open, setOpen] = useState(false)
    const ref = useRef()
    useClickOutside(ref, setOpen, false)

    return (
        <div ref={ref} className={`${className ? "tools_box " + className : "tools_box"}`}>
            {open &&
                <div className="tools_menu" onClick={() => setOpen(false)}>
                    {props.children}
                </div>
            }
            <button className="tools_btn" disabled={disabled} onClick={() => setOpen(!open)}>
                <BiDotsHorizontalRounded />
            </button>
        </div>
    )
}

export default ToolsMenu