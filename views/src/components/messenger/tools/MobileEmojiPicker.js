import React, { useRef } from 'react'
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import { useClickOutside } from '../../tools/hooks/useClickOutside'

const MobileEmojiPicker = (props) => {
    const { className, open, setOpen, onClick, onSelect } = props
    const ref = useRef()
    useClickOutside(ref, setOpen, false)

    const checkTheme = () => {
        const theme = localStorage.getItem("theme")
        if (theme !== null && theme === "light")
            return 'light'
        else return 'dark'
    }

    return (
        open &&
        <div ref={ref} className={`${className ? "mobile-emoji-picker relative " + className : "mobile-emoji-picker relative"}`}>
            <Picker
                theme={checkTheme()}
                set='twitter'
                sheetSize={64}
                color="#5a7df0"
                useButton={true}
                emojiSize={26}
                perLine={7}
                showPreview={false}
                emojiTooltip={false}
                onSelect={onSelect}
                onClick={() => {
                    setOpen(false)
                    onClick && onClick()
                }}
            />
        </div>
    )
}

export default MobileEmojiPicker