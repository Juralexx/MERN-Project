import React from 'react'

const NavbarToggle = (props) => {
    return (
        <div className="navbar-toggle" onClick={props.onClick}>
            <svg viewBox="0 0 800 600" className={`${props.open ? "open" : ""}`}>
                <path d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" className="top-bar" />
                <path d="M300,320 L540,320" className="middle-bar" />
                <path d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190" className="bottom-bar" transform="translate(480, 320) scale(1, -1) translate(-480, -318)" />
            </svg>
        </div>
    )
}

export default NavbarToggle