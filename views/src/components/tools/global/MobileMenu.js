import React, { useRef } from 'react'
import { useClickOutside } from '../hooks/useClickOutside'

const MobileMenu = (props) => {
    const { className, onClick, open, setOpen } = props
    const ref = useRef()
    useClickOutside(ref, setOpen, false)

    return (
        open && (
            <div ref={ref} className={`${className ? "mobile-menu " + className : "mobile-menu"}`} onClick={onClick}>
                <div className="mobile-menu-tools" onClick={() => setOpen(false)}>
                    {props.children}
                </div>
            </div>
        )
    )
}

export default MobileMenu