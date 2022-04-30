import React from "react";
import { avatar } from "../functions/useAvatar";

export const BigAvatar = (props) => {
    const { className, pic } = props
    return (
        <div className={`${className ? "big_avatar " + className : "big_avatar"}`} style={avatar(pic)}></div>
    )
}

export const MediumAvatar = (props) => {
    const { className, pic } = props
    return (
        <div className={`${className ? "medium_avatar " + className : "medium_avatar"}`} style={avatar(pic)}></div>
    )
}

export const SmallAvatar = (props) => {
    const { className, pic } = props
    return (
        <div className={`${className ? "small_avatar " + className : "small_avatar"}`} style={avatar(pic)}></div>
    )
}

export const TinyAvatar = (props) => {
    const { className, pic } = props
    return (
        <div className={`${className ? "tiny_avatar " + className : "tiny_avatar"}`} style={avatar(pic)}></div>
    )
}