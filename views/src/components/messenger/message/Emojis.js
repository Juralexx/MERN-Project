import React from 'react'

const Emojis = () => {
    const [emojis, setEmojis] = useState([])

    useEffect(() => {
        if (message.emojis.length > 0)
            setEmojis(concatSameEmojis(message.emojis))
    }, [message.emojis.length, message.emojis])

    const handleEmoji = (emoji) => {
        let emoj = { ...emoji, _id: randomNbID(24), sender_pseudo: user.pseudo, sender_id: uid }
        otherMembersIDs(currentChat, uid).map(memberId => {
            return websocket.current.emit("addEmoji", {
                receiverId: memberId,
                conversationId: currentChat._id,
                messageId: message._id,
                emoji: emoj
            })
        })
        dispatch(addEmoji(currentChat._id, message._id, emoj))
    }

    const deleteEmoji = (emojisGrouped) => {
        let emoji = emojisGrouped.find(e => e.sender_id === uid)
        otherMembersIDs(currentChat, uid).map(memberId => {
            return websocket.current.emit("removeEmoji", {
                receiverId: memberId,
                conversationId: currentChat._id,
                messageId: message._id,
                emojiId: emoji._id
            })
        })
        dispatch(removeEmoji(currentChat._id, message._id, emoji._id))
    }

    return (
        emojis.length > 0 &&
        <div className="message-emoji-container">
            {emojis.map((emojisGrouped, key) => {
                let names = emojisGrouped.map(e => { return e.sender_pseudo })
                let ids = emojisGrouped.map(e => { return e.sender_id })
                let emoji = emojisGrouped[0]
                return (
                    <div className={`${ids.includes(uid) ? "emoji own" : "emoji"}`} key={key} onClick={() => ids.includes(uid) ? deleteEmoji(emojisGrouped) : handleEmoji(emojisGrouped[0])}>
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
            <EmojiPicker btnClassName="emoji-add" onSelect={handleEmoji} onClick={() => setOpened(!opened)} />
        </div>
    )
}

export default Emojis