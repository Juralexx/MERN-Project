import React from 'react'

const SmallMenu = (props) => {
    const { right, top, className } = props
    return (
        <div className={`absolute ${right ? right : "right-10"} ${top ? top : "top-3"} ${className ? className : ""} min-w-[200px] py-3 px-4 z-[1000] bg-background_light dark:bg-background_primary_x_light shadow-lg rounded-lg`}>
            {props.children}
        </div>
    )
}

export default SmallMenu