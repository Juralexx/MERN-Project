import { useContext, useEffect, useState } from "react"
import { addEmoji, removeEmoji } from "../../../actions/messenger.action"
import { MessengerContext } from "../../AppContext"
import { randomNbID } from "../../Utils"
import { otherMembersIDs } from "../functions/function"

export function useEmojis(message) {
    const { user, websocket, currentChat, dispatch } = useContext(MessengerContext)
    const [emojis, setEmojis] = useState([])

    /**
     * Concat same emojis
     */
    
    const concatSameEmojis = (emojis) => {
        let group = emojis.reduce((r, a) => {
            r[a.id] = [...r[a.id] || [], a]
            return r
        }, {})
    
        return Object.values(group)
    }

    useEffect(() => {
        if (message.emojis.length > 0)
            setEmojis(concatSameEmojis(message.emojis))
    }, [message.emojis.length, message.emojis])

    /**
     * Add emoji if user didn't add it, else remove it
     */

    const handleEmoji = (emoji) => {
        let isEmoji = {}
        if (emojis.length > 0) {
            for (let i = 0; i < emojis.length; i++) {
                let emojiArr = emojis[i]
                for (let j = 0; j < emojiArr.length; j++) {
                    if (emojiArr[j].id === emoji.id && emojiArr[j].sender_id === user._id) {
                        isEmoji = emojiArr[j]
                        break
                    }
                }
            }
        }

        if (Object.keys(isEmoji).length > 0) {
            dispatch(removeEmoji(currentChat._id, message._id, isEmoji._id))
            otherMembersIDs(currentChat, user._id).map(memberId => {
                return websocket.current.emit("removeEmoji", {
                    receiverId: memberId,
                    conversationId: currentChat._id,
                    messageId: message._id,
                    emojiId: isEmoji._id
                })
            })
        } else {
            let emoj = { ...emoji, _id: randomNbID(24), sender_pseudo: user.pseudo, sender_id: user._id }
            otherMembersIDs(currentChat, user._id).map(memberId => {
                return websocket.current.emit("addEmoji", {
                    receiverId: memberId,
                    conversationId: currentChat._id,
                    messageId: message._id,
                    emoji: emoj
                })
            })
            dispatch(addEmoji(currentChat._id, message._id, emoj))
        }
    }

    return { emojis, handleEmoji }
}