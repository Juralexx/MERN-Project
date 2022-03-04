import React from "react";

export const Button = (props) => {
    return (
        <div className={`w-auto h-10 flex justify-center items-center px-5 rounded-[4px] bg-primary hover:bg-primary_semi_dark cursor-pointer`}>
            {props.text}
        </div>
    )
}

export const IconButton = (props) => {
    return (
        <button className={`w-auto h-10 flex justify-between items-center px-5 rounded-[4px] bg-primary hover:bg-primary_semi_dark cursor-pointer`}>
            {props.startIcon && (
                <div className="relative h-full w-auto flex justify-center items-center mr-2">
                    {props.startIcon}
                </div>
            )}
            <div>
                {props.text}
            </div>
            {props.endIcon && (
                <div className="relative h-full w-auto flex justify-center items-center ml-2">
                    {props.endIcon}
                </div>
            )}
        </button>
    )
}

export const IconToggle = (props) => {
    return (
        <button className={`w-10 h-10 px-2 py-2 rounded-full ${props.color} hover:${props.hover}`}>
            {props.icon}
        </button>
    )
}