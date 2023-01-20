import React from "react";
import styled from 'styled-components'

const fullImage = (props) => {
    return ({
        backgroundImage: `url(${props})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover"
    })
}

/**
 * 
 */

export const BigAvatar = (props) => {
    const { className, pic } = props
    return (
        <AvatarBig className={`${className ? "big_avatar " + className : "big_avatar"}`} style={fullImage(pic)}></AvatarBig>
    )
}

const AvatarBig = styled.div`
    max-height    : 42px;
    max-width     : 42px;
    min-height    : 42px;
    min-width     : 42px;
    border-radius : 50%;
    margin-right  : 14px;
`

/**
 * 
 */

export const MediumAvatar = (props) => {
    const { className, pic } = props
    return (
        <AvatarMedium className={`${className ? "medium_avatar " + className : "medium_avatar"}`} style={fullImage(pic)}></AvatarMedium>
    )
}

const AvatarMedium = styled.div`
    max-height    : 34px;
    max-width     : 34px;
    min-height    : 34px;
    min-width     : 34px;
    border-radius : 50%;
    margin-right  : 10px;
`

/**
 * 
 */

export const SmallAvatar = (props) => {
    const { className, pic } = props
    return (
        <AvatarSmall className={`${className ? "small_avatar " + className : "small_avatar"}`} style={fullImage(pic)}></AvatarSmall>
    )
}

const AvatarSmall = styled.div`
    max-height    : 28px;
    max-width     : 28px;
    min-height    : 28px;
    min-width     : 28px;
    border-radius : 50%;

    &:nth-child(n+2) {
        margin-left : -6px;
    }
`

/**
 * 
 */

export const TinyAvatar = (props) => {
    const { className, pic } = props
    return (
        <AvatarTiny className={`${className ? "tiny_avatar " + className : "tiny_avatar"}`} style={fullImage(pic)}></AvatarTiny>
    )
}

const AvatarTiny = styled.div`
    max-height    : 20px;
    max-width     : 20px;
    min-height    : 20px;
    min-width     : 20px;
    border-radius : 50%;
    margin-right  : 6px;
`