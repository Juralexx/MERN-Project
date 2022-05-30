import React, { useRef } from 'react'
import { useClickOutside } from '../../tools/functions/useClickOutside'
import { checkTheme } from '../../Utils'
import { placeUponCursor } from '../functions/function'

const Emoji = ({ quill, isEmoji, setEmoji, emojisResults, setEmojisResults, position, setPosition }) => {
    const emojiRef = useRef()
    useClickOutside(emojiRef, setEmoji, false)

    const onEmoji = (emoji) => {
        quill.focus()
        let range = quill.getSelection()
        quill.deleteText(position, range.index)
        quill.insertText(position, emoji.skins[0].native)
        quill.insertText(position + 2, "\u00a0", {
            'color': `${checkTheme('#232221', '#ffffff')}`,
            'bold': false
        })
        setEmoji(false)
        setPosition(0)
        setEmojisResults([])
    }

    return (
        isEmoji &&
        emojisResults.length > 0 &&
        <div tabIndex="0" className="auto-complete-container custom-scrollbar max-w-[300px]" style={placeUponCursor(quill)} ref={emojiRef}>
            {emojisResults.slice(0, 20).map((emoji, key) => {
                return (
                    <div
                        className={`${emojisResults.some(e => e.id) ? "auto-complete-item" : "auto-complete-item hidden"}`}
                        key={key}
                        onClick={() => onEmoji(emoji)}
                    >
                        <div className="flex items-center">
                            <div className="w-5 h-5 flex items-center justify-center">{emoji.skins[0].native}</div>
                            <p className="ml-3 bold one_line">:{emoji.id}:</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Emoji