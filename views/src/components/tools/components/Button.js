import React from "react";

export const Button = (props) => {
    const { text, fullwidth, color, hoverColor, onClick, className, disabled } = props
    return (
        <div onClick={onClick} className={`h-10 flex justify-center items-center px-4 py-2 rounded-full text-white cursor-pointer
            ${fullwidth ? "w-full" : "max-w-[300px]"}
            ${color ? `bg-${color}` : "bg-primary"}
            ${hoverColor ? `hover:bg-${hoverColor}` : "hover:bg-primary_semi_dark"}
            ${className ? className : null}
        `} disabled={disabled}>
            {text}
        </div>
    )
}

export const TextButton = (props) => {
    const { text, fullwidth, color, onClick, className } = props
    return (
        <div onClick={onClick} className={`h-10 flex justify-center items-center px-4 py-2 rounded-full cursor-pointer
            ${fullwidth ? "w-full" : "w-auto"} 
            ${color ? `text-${color} hover:bg-${color}/[.15]` : "text-primary_light hover:bg-primary_semi_dark/[.15]"}
            ${className ? className : null}
        `}>
            {text}
        </div>
    )
}

export const OutlinedButton = (props) => {
    const { text, fullwidth, color, onClick, className } = props
    return (
        <div onClick={onClick} className={`h-10 flex justify-center items-center px-4 py-2 rounded-full cursor-pointer border
            ${fullwidth ? "w-full" : "w-auto"} 
            ${color ? `border-${color}/50 text-${color} hover:bg-${color}/[.15]` : "border-primary/50 text-primary hover:bg-primary_semi_dark/[.15]"}
            ${className ? className : null}
        `}>
            {text}
        </div>
    )
}

export const IconButton = (props) => {
    const { startIcon, endIcon, text, fullwidth, color, hoverColor, onClick, className } = props
    return (
        <div onClick={onClick} className={`h-10 flex justify-between items-center px-5 py-2 rounded-full text-white cursor-pointer
            ${fullwidth ? "w-full" : "w-auto"}
            ${color ? `bg-${color}` : "bg-primary"}
            ${hoverColor ? `hover:bg-${hoverColor}` : "hover:bg-primary_semi_dark"}
            ${className ? className : null}
        `}>
            {startIcon && (
                <div className="relative h-5 w-5 flex justify-center items-center mr-2">
                    {startIcon}
                </div>
            )}
            <div className="flex items-center">
                {text}
            </div>
            {endIcon && (
                <div className="relative h-5 w-5 flex justify-center items-center ml-2">
                    {endIcon}
                </div>
            )}
        </div>
    )
}

export const IconToggle = (props) => {
    const { color, icon, onClick, className } = props
    return (
        <div onClick={onClick} className={`w-10 h-10 px-2 py-2 rounded-full hover:bg-${color}/75 ${className ? className : null}`}>
            {icon}
        </div>
    )
}

export const RoundedButton = (props) => {
    const { color, hoverColor, icon, onClick, className } = props
    return (
        <div onClick={onClick} className={`px-2 py-2 rounded-full bg-${color} hover:bg-${hoverColor} ${className ? className : null} cursor-pointer`}>
            {icon}
        </div>
    )
}