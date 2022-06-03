import { useEffect, useState } from "react"
import axios from "axios"

export function useEmoji(quill) {
    const [isEmoji, setEmoji] = useState(false)
    const [emojisResults, setEmojisResults] = useState([])
    const [emojiArr, setEmojiArr] = useState([])
    const [hasShortcuts, setHasShortcuts] = useState([])
    const [shortcuts, setShortcuts] = useState([])

    useEffect(() => {
        if (emojiArr.length === 0) {
            const fetch = async () => {
                await axios.get(`${process.env.REACT_APP_API_URL}files/native.json`)
                    .then(res => {
                        setEmojiArr(Object.values(res.data))
                        Object.values(res.data).forEach(e => {
                            if (e.emoticons) {
                                setHasShortcuts(s => [...s, e])
                                e.emoticons.forEach(shortcut => {
                                    setShortcuts(s => [...s, shortcut])
                                })
                            }
                        })
                    })
            }
            fetch()
        }
    }, [emojiArr.length])

    /**
     * Insert emoji if shortcut is detected
     */

    const detectEmojis = (event) => {
        let txt = quill.getText()
        let index = quill.getSelection().index

        if (event.keyCode === 32 || event.keyCode === 13) {
            if (shortcuts.length > 0) {
                shortcuts.some(shortcut => {
                    let word = quill.getText(index - 4, 3)
                    if (word.includes(shortcut)) {
                        let emoji = hasShortcuts.find(e => e.emoticons.includes(shortcut))
                        if (event.keyCode === 13) {
                            quill.deleteText(index - shortcut.length, shortcut.length)
                            quill.insertText(index - shortcut.length, emoji.skins[0].native)
                            quill.setSelection(quill.getSelection().index + 1)
                        }
                        else if (event.keyCode === 32) {
                            quill.deleteText(index - (shortcut.length + 1), shortcut.length)
                            quill.insertText(index - (shortcut.length + 1), emoji.skins[0].native)
                            quill.setSelection(quill.getSelection().index)
                        }
                    }
                })
            }
            if (emojiArr.length > 0) {
                emojiArr.some(emoji => {
                    if (txt.includes(`:${emoji.id}:`)) {
                        let emoticon = emojiArr.find(e => e.id === emoji.id)
                        if (event.keyCode === 13) {
                            quill.deleteText(index - (emoji.id.length + 2), emoji.id.length + 2)
                            quill.insertText(index - (emoji.id.length + 2), emoticon.skins[0].native)
                            quill.setSelection(quill.getSelection().index + 1)
                        }
                        else if (event.keyCode === 32) {
                            quill.deleteText(index - (emoji.id.length + 3), emoji.id.length + 3)
                            quill.insertText(index - (emoji.id.length + 3), emoticon.skins[0].native)
                            quill.setSelection(quill.getSelection().index)
                        }
                    }
                })
            }
        }
    }

    return { isEmoji, setEmoji, emojisResults, setEmojisResults, emojiArr, detectEmojis }
}