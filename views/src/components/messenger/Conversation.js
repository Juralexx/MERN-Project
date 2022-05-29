import React, { useEffect, useMemo, useRef, useState } from 'react';
import ToolsMenu from '../tools/components/ToolsMenu';
import { avatar } from '../tools/functions/useAvatar';
import { useClickOutside } from '../tools/functions/useClickOutside';
import { addActive } from '../Utils';
import { convertDeltaToStringNoHTML, getDate, getMembers, returnConversationPseudo, returnMembers } from './tools/function';

const Conversation = ({ uid, user, conversation, currentChat, newMessage, notification, onConversationClick }) => {
    const members = useMemo(() => getMembers(conversation, uid), [conversation, uid])
    const [lastMessage, setLastMessageFound] = useState(conversation.messages.length > 0 ? conversation.messages[conversation.messages.length - 1] : null)
    const [date, setDate] = useState()
    const [unseen, setUnseen] = useState(false)

    const [open, setOpen] = useState(false)
    const [opened, setOpened] = useState(false)
    const menuRef = useRef()
    useClickOutside(menuRef, setOpened, false)

    useEffect(() => {
        if (Object.keys(lastMessage).length > 0)
            setDate(getDate(lastMessage.createdAt))
        else setDate(getDate(conversation.createdAt))
    }, [lastMessage, conversation.createdAt])

    useEffect(() => {
        if (conversation.messages.length > 0) {
            const conv = user.conversations.find(e => e.id === conversation._id)

            if (conv.last_message_seen && conv.last_message_seen !== (null || "")) {
                const index = conversation.messages.findIndex(e => e._id === conv.last_message_seen)
                if (Math.abs((conversation.messages.length - 1) - index) > 0)
                    setUnseen(true)
            }
        }
    }, [user.conversations, conversation.messages, conversation._id])

    useEffect(() => {
        if (newMessage && newMessage.conversationId === conversation._id) {
            setLastMessageFound(newMessage)
            setDate('À l\'instant')
        }
        if (notification && notification.conversationId === conversation._id) {
            setLastMessageFound(notification)
            setDate('À l\'instant')
            setUnseen(true)
        }
    }, [newMessage, notification, conversation._id])

    return (
        <div className={`conversation ${addActive(conversation._id === currentChat._id, "active")}`} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <div className="conversation_inner" onClick={() => { onConversationClick(conversation); setUnseen(null) }}>
                <div className="conversation-img-container">
                    {members.slice(0, 3).map((element, key) => {
                        return <div className="conversation-img" key={key} style={avatar(element.picture)}></div>
                    })}
                </div>
                <div className="conversation-infos">
                    <div className="conversation-infos-top">
                        <div className="conversation-name">
                            {conversation.name ? conversation.name : returnMembers(members)}
                        </div>
                        <div className="conversation-date">{date}</div>
                    </div>
                    {lastMessage && Object.keys(lastMessage).length > 0 ? (
                        <div className="last-message-wrapper">
                            <div className={`${unseen ? "last-message notification" : "last-message"}`}>
                                {returnConversationPseudo(conversation, lastMessage, uid)}
                                <p>
                                    {Object.keys(lastMessage.text).length > 0 ? (
                                        convertDeltaToStringNoHTML(lastMessage)
                                    ) : (
                                        lastMessage.files.length > 0 && lastMessage.files[0].name
                                    )}
                                </p>
                            </div>
                            {unseen && <div className="unseen-badge"></div>}
                        </div>
                    ) : (
                        <div className="last-message-wrapper">
                            <div className="last-message"><p>Nouvelle conversation - <em>Envoyer un message</em></p></div>
                        </div>
                    )}
                </div>
            </div>
            {(open || opened) &&
                <div ref={menuRef}>
                    <ToolsMenu onClick={() => setOpened(!opened)}>
                        <div className="tools_choice">Marquer comme lu</div>
                        <div className="tools_choice">Supprimer la conversation</div>
                        <div className="tools_choice">Quitter la conversation</div>
                    </ToolsMenu>
                </div>
            }
        </div>
    );
};

export default Conversation;