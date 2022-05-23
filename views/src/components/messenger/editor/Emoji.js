import React from 'react'
import { checkTheme } from '../../Utils'
import { placeUponCursor } from '../tools/function'

const Emoji = ({ quill, isEmoji, setEmoji, emojisResults, setEmojisResults, position, setPosition }) => {
    
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
        <div tabIndex="0" className="auto-complete-container custom-scrollbar max-w-[300px]" style={placeUponCursor(quill)}>
            {emojisResults.slice(0, 20).map((emoji, key) => {
                return (
                    <div
                        className={`${emojisResults.some(e => e.id) ? "auto-complete-item" : "auto-complete-item hidden"}`}
                        key={key}
                        onClick={() => onEmoji(emoji)}
                    >
                        <div className="flex items-center">
                            <div>{emoji.skins[0].native}</div>
                            <p>:{emoji.id}:</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Emoji