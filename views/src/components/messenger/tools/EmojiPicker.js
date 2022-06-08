import React, { useRef, useEffect, useState } from 'react'
import { usePopper } from "react-popper";
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import { useClickOutside } from '../../tools/hooks/useClickOutside'
import { MdAddReaction } from 'react-icons/md';

const EmojiPicker = (props) => {
    const { className, btnClassName, disabled, onClick, onSelect, icon } = props
    const [open, setOpen] = useState(false)
    const [visible, setVisible] = useState(false)
    const ref = useRef()
    useClickOutside(ref, setOpen, false)

    const popperElRef = React.useRef(null);
    const [targetElement, setTargetElement] = React.useState(null);
    const [popperElement, setPopperElement] = React.useState(popperElRef.current);
    const { styles, attributes } = usePopper(targetElement, popperElement, {
        placement: props.placement || "left-start",
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
        if (open) {
            setPopperElement(popperElRef.current)
            setVisible(true)
        }
        else setPopperElement(null)
    }, [open])

    const checkTheme = () => {
        const theme = localStorage.getItem("theme")
        if (theme !== null && theme === "light")
            return 'light'
        else return 'dark'
    }

    return (
        <div ref={ref} className={`${className ? "tools_box relative " + className : "tools_box relative"}`}>
            {open &&
                <div
                    className={`${visible ? "emoji-picker opacity-trans plain" : "emoji-picker opacity-trans"}`}
                    ref={popperElRef}
                    style={styles.popper}
                    {...attributes.popper}
                >
                    <Picker
                        theme={checkTheme()}
                        set='twitter'
                        sheetSize={64}
                        color="#5a7df0"
                        emoji="grinning"
                        title=":grinning:"
                        useButton={true}
                        emojiSize={22}
                        onSelect={onSelect}
                        onClick={() => setOpen(false)}
                    />
                </div>
            }

            <button
                ref={setTargetElement}
                className={`${btnClassName ? "tools_btn " + btnClassName : "tools_btn"}`}
                disabled={disabled}
                onClick={() => {
                    onClick && onClick()
                    setOpen(!open)
                }}
            >
                {icon ? (icon) : <MdAddReaction />}
            </button>
        </div>
    )
}

export default EmojiPicker