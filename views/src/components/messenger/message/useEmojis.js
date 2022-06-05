import { useContext, useEffect, useState } from "react"
import { addEmoji, removeEmoji } from "../../../actions/messenger.action"
import { MessengerContext } from "../../AppContext"
import { randomNbID } from "../../Utils"
import { otherMembersIDs } from "../functions/function"
import { useCheckLocation } from "../functions/useCheckLocation"

export function useEmojis(message, conversation) {
    const { user, websocket, dispatch } = useContext(MessengerContext)
    const [emojis, setEmojis] = useState([])
    const { isParam } = useCheckLocation()

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
        isParam(conversation._id, '/messenger/' + conversation._id)
        
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
            dispatch(removeEmoji(conversation._id, message._id, isEmoji._id))
            otherMembersIDs(conversation, user._id).map(memberId => {
                return websocket.current.emit("removeEmoji", {
                    receiverId: memberId,
                    conversationId: conversation._id,
                    messageId: message._id,
                    emojiId: isEmoji._id
                })
            })
        } else {
            let emoj = { ...emoji, _id: randomNbID(24), sender_pseudo: user.pseudo, sender_id: user._id }
            otherMembersIDs(conversation, user._id).map(memberId => {
                return websocket.current.emit("addEmoji", {
                    receiverId: memberId,
                    conversationId: conversation._id,
                    messageId: message._id,
                    emoji: emoj
                })
            })
            dispatch(addEmoji(conversation._id, message._id, emoj))
        }
    }

    return { emojis, handleEmoji }
}