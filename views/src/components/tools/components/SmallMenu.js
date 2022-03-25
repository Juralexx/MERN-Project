import React from 'react'

const SmallMenu = (props) => {
    const { right, top, className, useRef } = props
    return (
        <div ref={useRef} className={`tools-menu ${right ? right : "right-10"} ${top ? top : "top-3"} ${className ? className : ""}`}>
            {props.children}
        </div>
    )
}

export default SmallMenu