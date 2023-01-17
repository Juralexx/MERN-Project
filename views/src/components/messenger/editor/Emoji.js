import React, { useContext, useRef } from 'react'
import { MediaContext } from '../../AppContext'
import { useClickOutside } from '../../tools/hooks/useClickOutside'
import { checkTheme } from '../../Utils'
import { placeUponCursor } from '../functions'

const Emoji = ({ quill, isEmoji, setEmoji, emojisResults, setEmojisResults, position, setPosition }) => {
    const emojiRef = useRef()
    useClickOutside(emojiRef, () => setEmoji(false))
    const { sm } = useContext(MediaContext)
    const styles = quill ? placeUponCursor(quill) : { left: 0, right: 0, bottom: 0 }

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
        isEmoji && (
            emojisResults.length > 0 && (
                <div tabIndex="0" className="auto-complete-container custom-scrollbar emojis" style={{ left: !sm && styles.left, right: !sm && styles.right, bottom: !sm && styles.bottom}} ref={emojiRef}>
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
        )
    )
}

export default Emoji