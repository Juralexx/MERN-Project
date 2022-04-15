import React from "react";

export const Button = (props) => {
    const { text, onClick, className, disabled, onKeyDown } = props
    return (
        <button onClick={onClick} className={`${className ? "btn-first " + className : "btn-first"}`} disabled={disabled} onKeyDown={onKeyDown}>
            {text}
        </button>
    )
}

export const StartIconButton = (props) => {
    const { icon, text, onClick, className, disabled } = props
    return (
        <button onClick={onClick} className={`${className ? "btn-icon-start " + className : "btn-icon-start"}`} disabled={disabled}>
            {icon && (icon)}{text}
        </button>
    )
}

export const EndIconButton = (props) => {
    const { icon, text, onClick, className, disabled } = props
    return (
        <button onClick={onClick} className={`${className ? "btn-icon-end " + className : "btn-icon-end"}`} disabled={disabled}>
            {text}{icon && (icon)}
        </button>
    )
}

export const OutlinedButton = (props) => {
    const { text, onClick, className, disabled } = props
    return (
        <button onClick={onClick} className={`${className ? "outlined-btn " + className : "outlined-btn"}`} disabled={disabled}>
            {text}
        </button>
    )
}

export const StartIconOutlinedButton = (props) => {
    const { icon, text, onClick, className, disabled } = props
    return (
        <button onClick={onClick} className={`${className ? "btn-outlined-icon-start " + className : "btn-outlined-icon-start"}`} disabled={disabled}>
            {icon && (icon)}{text}
        </button>
    )
}

export const EndIconOutlinedButton = (props) => {
    const { icon, text, onClick, className, disabled } = props
    return (
        <button onClick={onClick} className={`${className ? "btn-outlined-icon-end " + className : "btn-outlined-icon-end"}`} disabled={disabled}>
            {text}{icon && (icon)}
        </button>
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
        <button onClick={onClick} className={`${className ? "text-btn-icon-end " + className : "text-btn-icon-end"}`} disabled={disabled}>
            {text}{icon && (icon)}
        </button>
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
    const { onClick, className, disabled } = props
    return (
        <button className={`${className ? "tools-btn " + className : "tools-btn"}`} disabled={disabled} onClick={onClick}>
            {props.children}
        </button>
    )
}

export const SmallToolsBtn = (props) => {
    const { onClick, className } = props
    return (
        <div className={`${className ? "small-tools-btn " + className : "small-tools-btn"}`} onClick={onClick}>
            {props.children}
        </div>
    )
}