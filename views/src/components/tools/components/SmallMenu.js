import React from 'react'

const SmallMenu = (props) => {
    const { right, top, className, useRef } = props
    return (
        <div ref={useRef} className={`${className ? "tools_menu " + className : "tools_menu"} ${right ? right : "right-[36px]"} ${top ? top : "top-2"}`}>
            {props.children}
        </div>
    )
}

export default SmallMenu