import React from "react";
import { avatar } from "../functions/useAvatar";

export const BigAvatar = (props) => {
    const { className, pic } = props
    return (
        <div className={`${className ? "big-avatar " + className : "big-avatar"}`} style={avatar(pic)}></div>
    )
}

export const MediumAvatar = (props) => {
    const { className, pic } = props
    return (
        <div className={`${className ? "medium-avatar " + className : "medium-avatar"}`} style={avatar(pic)}></div>
    )
}

export const SmallAvatar = (props) => {
    const { className, pic } = props
    return (
        <div className={`${className ? "small-avatar " + className : "small-avatar"}`} style={avatar(pic)}></div>
    )
}

export const TinyAvatar = (props) => {
    const { className, pic } = props
    return (
        <div className={`${className ? "tiny-avatar " + className : "tiny-avatar"}`} style={avatar(pic)}></div>
    )
}