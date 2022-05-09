import React, { useEffect, useState } from 'react';
import { avatar } from '../tools/functions/useAvatar';
import { convertEditorToHTML, getDate, getMembers } from './tools/function';

const Conversation = ({ uid, user, conversation, newMessage, notification }) => {
    const convMembers = getMembers(conversation, uid)
    const [lastMessageFound, setLastMessageFound] = useState(conversation.messages[conversation.messages.length - 1])
    const [date, setDate] = useState()
    const [unseen, setUnseen] = useState(null)
    const removeNotification = () => { if (unseen !== null) setUnseen(null) }

    useEffect(() => {
        if (lastMessageFound && Object.keys(lastMessageFound).length > 0)
            setDate(getDate(lastMessageFound.createdAt))
        else setDate(getDate(conversation.createdAt))
    }, [lastMessageFound, conversation.createdAt])

    useEffect(() => {
        if (user.conversations && conversation.messages.length > 0) {
            const conv = user.conversations.find(e => e.id === conversation._id)
            if (conv.last_message_seen && conv.last_message_seen !== null && conv.last_message_seen !== "") {
                const index = conversation.messages.findIndex(e => e._id === conv.last_message_seen)
                const diff = Math.abs((conversation.messages.length - 1) - index)
                if (diff > 0 && diff < 10) setUnseen(diff)
                else if (diff > 10) setUnseen('9+')
            }
        }
    }, [user.conversations, conversation.messages, conversation._id])

    useEffect(() => {
        if (newMessage && newMessage.conversationId === conversation._id) {
            setLastMessageFound(newMessage)
            setDate('À l\'instant')
        }
    }, [newMessage, conversation._id])

    useEffect(() => {
        if (notification && notification.conversationId === conversation._id) {
            setLastMessageFound(notification)
            setDate('À l\'instant')
            setUnseen(notif => notif + 1)
        }
    }, [notification, conversation._id])

    return (
        <div className={`${unseen !== null ? "conversation new-notification" : "conversation"}`} onClick={removeNotification}>
            <div className="conversation-img-container">
                {convMembers.slice(0, 3).map((element, key) => {
                    return (
                        <div className="conversation-img" key={key} style={avatar(element.picture)}></div>
                    )
                })}
            </div>
            <div className="conversation-infos">
                <div className="conversation-infos-top">
                    <div className="conversation-name">
                        <p>
                            {convMembers.length === 1 &&
                                convMembers[0].pseudo
                            }
                            {convMembers.length === 2 &&
                                convMembers[0].pseudo + ", " + convMembers[1].pseudo
                            }
                            {convMembers.length === 3 &&
                                convMembers[0].pseudo + ", " + convMembers[1].pseudo + ", " + convMembers[2].pseudo
                            }
                            {convMembers.length > 3 &&
                                convMembers[0].pseudo + ", " + convMembers[1].pseudo + ", " + convMembers[2].pseudo + " et " + (convMembers.length - 3) + " autres"
                            }
                        </p>
                    </div>
                    <div className="conversation-date">{date}</div>
                </div>
                {lastMessageFound ? (
                    <div className="last-message-wrapper">
                        <div className="last-message-pseudo"><em>{lastMessageFound.sender_pseudo}</em>&nbsp; : &nbsp;</div>
                        <div className="last-message" dangerouslySetInnerHTML={convertEditorToHTML(lastMessageFound)}></div>
                        {unseen && <div className="unseen-messages">{unseen}</div>}
                    </div>
                ) : (
                    <div className="last-message-wrapper">
                        <div className="last-message"><p>Nouvelle conversation - <em>Envoyer un message</em></p></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Conversation;