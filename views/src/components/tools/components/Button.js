import React from "react";

export const Button = (props) => {
    const { text, onClick, className, disabled, onKeyDown, style } = props
    return (
        <button onClick={onClick} className={`${className ? "btn btn_first " + className : "btn btn_first"}`} disabled={disabled} onKeyDown={onKeyDown} style={style}>
            {text}
        </button>
    )
}

export const StartIconButton = (props) => {
    const { icon, text, onClick, className, disabled } = props
    return (
        <button onClick={onClick} className={`${className ? "btn btn_icon_start " + className : "btn btn_icon_start"}`} disabled={disabled}>
            {icon && (icon)}{text}
        </button>
    )
}

export const EndIconButton = (props) => {
    const { icon, text, onClick, className, disabled } = props
    return (
        <button onClick={onClick} className={`${className ? "btn btn_icon_end " + className : "btn btn_icon_end"}`} disabled={disabled}>
            {text}{icon && (icon)}
        </button>
    )
}

export const OutlinedButton = (props) => {
    const { text, onClick, className, disabled } = props
    return (
        <button onClick={onClick} className={`${className ? "btn outlined_btn " + className : "btn outlined_btn"}`} disabled={disabled}>
            {text}
        </button>
    )
}

export const StartIconOutlinedButton = (props) => {
    const { icon, text, onClick, className, disabled } = props
    return (
        <button onClick={onClick} className={`${className ? "btn btn_outlined_icon_start " + className : "btn btn_outlined_icon_start"}`} disabled={disabled}>
            {icon && (icon)}{text}
        </button>
    )
}

export const EndIconOutlinedButton = (props) => {
    const { icon, text, onClick, className, disabled } = props
    return (
        <button onClick={onClick} className={`${className ? "btn btn_outlined_icon_end " + className : "btn btn_outlined_icon_end"}`} disabled={disabled}>
            {text}{icon && (icon)}
        </button>
    )
}

export const TextButton = (props) => {
    const { text, onClick, className, disabled } = props
    return (
        <button onClick={onClick} className={`${className ? "btn text_btn " + className : "btn text_btn"}`} disabled={disabled}>
            {text}
        </button>
    )
}

export const StartIconTextButton = (props) => {
    const { icon, text, onClick, className, disabled } = props
    return (
        <button onClick={onClick} className={`${className ? "btn text_btn_icon_start " + className : "btn text_btn_icon_start"}`} disabled={disabled}>
            {icon && (icon)}{text}
        </button>
    )
}

export const EndIconTextButton = (props) => {
    const { icon, text, onClick, className, disabled } = props
    return (
        <button onClick={onClick} className={`${className ? "btn text_btn_icon_end " + className : "btn text_btn_icon_end"}`} disabled={disabled}>
            {text}{icon && (icon)}
        </button>
    )
}

export const IconToggle = (props) => {
    const { icon, onClick, className } = props
    return (
        <div onClick={onClick} className={`${className ? "icon_toggle " + className : "icon_toggle"}`}>
            {icon}
        </div>
    )
}

export const ToolsBtn = (props) => {
    const { onClick, className, disabled } = props
    return (
        <button className={`${className ? "tools_btn " + className : "tools_btn"}`} disabled={disabled} onClick={onClick}>
            {props.children}
        </button>
    )
}

export const SmallToolsBtn = (props) => {
    const { onClick, className } = props
    return (
        <div className={`${className ? "small_tools_btn " + className : "small_tools_btn"}`} onClick={onClick}>
            {props.children}
        </div>
    )
}