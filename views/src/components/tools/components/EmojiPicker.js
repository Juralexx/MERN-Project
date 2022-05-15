import React, { useRef, useEffect, useState } from 'react'
import { useClickOutside } from '../functions/useClickOutside'
import { usePopper } from "react-popper";
import { MdOutlineAddReaction } from 'react-icons/md';
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

const EmojiPicker = (props) => {
    const { className, btnClassName, disabled, onClick, onSelect, icon } = props
    const [open, setOpen] = useState(false)
    const ref = useRef()
    useClickOutside(ref, setOpen, false)

    const popperElRef = React.useRef(null);
    const [targetElement, setTargetElement] = React.useState(null);
    const [popperElement, setPopperElement] = React.useState(popperElRef.current);
    const { styles, attributes } = usePopper(targetElement, popperElement, {
        placement: props.placement || "left",
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, 0]
                }
            }
        ]
    })

    useEffect(() => {
        if (open)
            setPopperElement(popperElRef.current)
        else setPopperElement(null)
    }, [open])

    const checkTheme = () => {
        const theme = localStorage.getItem("theme")
        if (theme !== null && theme === "light")
            return 'light'
        else return 'dark'
    }

    return (
        <div ref={ref} className={`${className ? "tools_box relative " + className : "tools_box relative"}`} >
            {open &&
                <div className={`${open ? "emoji-picker transition open" : "emoji-picker transition"}`}
                    ref={popperElRef}
                    style={styles.popper}
                    {...attributes.popper}
                >
                    <Picker
                        theme={checkTheme()}
                        set='twitter'
                        sheetSize={64}
                        tooltip='false'
                        emojiTooltip={false}
                        color="#18A5D6"
                        emoji="grinning"
                        onSelect={emoji => {
                            onSelect(emoji)
                            setOpen(false)
                        }}
                    />
                </div>
            }

            <button className={`${btnClassName ? "tools_btn " + btnClassName : "tools_btn"}`} ref={setTargetElement} disabled={disabled} onClick={() => {
                onClick && onClick()
                setOpen(!open)
            }}>
                {icon ? (icon) : <MdOutlineAddReaction />}
            </button>
        </div>
    )
}

export default EmojiPicker