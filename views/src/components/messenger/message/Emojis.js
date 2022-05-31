import { Emoji } from 'emoji-mart'
import React from 'react'
import Tooltip from '../../tools/components/Tooltip'
import EmojiPicker from '../tools/EmojiPicker'

const Emojis = ({ uid, emojis, handleEmoji, opened, setOpened }) => {

    return (
        emojis.length > 0 &&
        <div className="message-emoji-container">
            {emojis.map((emojisGrouped, key) => {
                let names = emojisGrouped.map(e => { return e.sender_pseudo })
                let ids = emojisGrouped.map(e => { return e.sender_id })
                let emoji = emojisGrouped[0]
                return (
                    <div className={`${ids.includes(uid) ? "emoji own" : "emoji"}`} key={key} onClick={() => handleEmoji(emojisGrouped[0])}>
                        <Tooltip content={
                            <div className="emoji-popup">
                                <Emoji emoji={emoji} size={36} set='twitter' />
                                {names.length > 1 ? (
                                    <p>{names.toString().replace(",", ", ") + " ont réagit avec " + emoji.colons}</p>
                                ) : (
                                    <p>{emoji.sender_pseudo + " a réagit avec " + emoji.colons}</p>
                                )}
                            </div>
                        }>
                            <Emoji emoji={emoji} size={14} set='twitter' />
                        </Tooltip>
                        <p>{emojisGrouped.length}</p>
                    </div>
                )
            })}
            <EmojiPicker btnClassName="emoji-add" onSelect={emoji => handleEmoji(emoji)} onClick={() => setOpened(!opened)} />
        </div>
    )
}

export default Emojis