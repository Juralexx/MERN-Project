import React from "react";

export const Button = (props) => {
    const { text, onClick, className, disabled } = props
    return (
        <button onClick={onClick} className={`${className ? "btn-first " + className : "btn-first"}`} disabled={disabled}>
            {text}
        </button>
    )
}

export const StartIconButton = (props) => {
    const { icon, text, fullwidth, onClick, className, disabled } = props
    return (
        <div onClick={onClick} className={`btn-icon-start ${fullwidth ?? "w-full"} ${className ?? className}`} disabled={disabled}>
            {icon && (icon)}{text}
        </div>
    )
}

export const EndIconButton = (props) => {
    const { icon, text, fullwidth, onClick, className, disabled } = props
    return (
        <div onClick={onClick} className={`btn-icon-end ${fullwidth ?? "w-full"} ${className ?? className}`} disabled={disabled}>
            {text}{icon && (icon)}
        </div>
    )
}

export const OutlinedButton = (props) => {
    const { text, fullwidth, onClick, className, disabled } = props
    return (
        <div onClick={onClick} className={`outlined-btn ${fullwidth ?? "w-full"} ${className ?? className}`} disabled={disabled}>
            {text}
        </div>
    )
}

export const StartIconOutlinedButton = (props) => {
    const { icon, text, fullwidth, onClick, className, disabled } = props
    return (
        <div onClick={onClick} className={`${className ? "btn-outlined-icon-start " + className : "btn-outlined-icon-start"}`} disabled={disabled}>
            {icon && (icon)}{text}
        </div>
    )
}

export const EndIconOutlinedButton = (props) => {
    const { icon, text, fullwidth, onClick, className, disabled } = props
    return (
        <div onClick={onClick} className={`btn-outlined-icon-end ${fullwidth ?? "w-full"} ${className ?? className}`} disabled={disabled}>
            {text}{icon && (icon)}
        </div>
    )
}

export const TextButton = (props) => {
    const { text, onClick, className, disabled } = props
    return (
        <button onClick={onClick} className={`${className ? "text-btn " + className : "text-btn"}`} disabled={disabled}>
            {text}
        </button>
    )
}

export const StartIconTextButton = (props) => {
    const { icon, text, onClick, className, disabled } = props
    return (
        <button onClick={onClick} className={`${className ? "text-btn-icon-start " + className : "text-btn-icon-start"}`} disabled={disabled}>
            {icon && (icon)}{text}
        </button>
    )
}

export const EndIconTextButton = (props) => {
    const { icon, text, fullwidth, onClick, className, disabled } = props
    return (
        <div onClick={onClick} className={`text-btn-icon-start ${fullwidth ?? "w-full"} ${className ?? className}`} disabled={disabled}>
            {text}{icon && (icon)}
        </div>
    )
}

export const IconToggle = (props) => {
    const { color, icon, onClick, className } = props
    return (
        <div onClick={onClick} className={`icon-toggle text-${color} hover:bg-${color}/25 ${className ?? className}`}>
            {icon}
        </div>
    )
}

export const ToolsBtn = (props) => {
    const { onClick, className } = props
    return (
        <div className={`${className ? "tools-btn " + className : "tools-btn"}`} onClick={onClick}>
            {props.children}
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

export const RoundedButton = (props) => {
    const { color, hoverColor, icon, onClick, className } = props
    return (
        <div onClick={onClick} className={`px-2 py-2 rounded-full bg-${color} hover:bg-${hoverColor} ${className ? className : null} cursor-pointer`}>
            {icon}
        </div>
    )
}