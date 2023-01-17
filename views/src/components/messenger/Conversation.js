import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessengerContext } from '../AppContext';
import Icon from '../tools/icons/Icon';
import ToolsMenu from '../tools/global/ToolsMenu';
import MobileMenu from '../tools/global/MobileMenu';
import { useClickOutside } from '../tools/hooks/useClickOutside';
import { useLongPress } from '../tools/hooks/useLongPress';
import { addClass, fullImage } from '../Utils';
import { convertDeltaToStringNoHTML, getDate, getMembers, returnConversationPseudo, returnMembersPseudos } from './functions';
import { deleteConv } from './actions';

const Conversation = ({ conversation, newMessage, notification }) => {
    const { uid, user, websocket, conversations, changeCurrentChat, xs, navigate, dispatch } = useContext(MessengerContext)
    const members = useMemo(() => getMembers(conversation, uid), [conversation, uid])

    const lastMessageFound = conversation.messages.length > 0 ? conversation.messages[conversation.messages.length - 1] : {}

    const [lastMessage, setLastMessage] = useState({
        message: lastMessageFound,
        date: Object.keys(lastMessageFound).length > 0 ? getDate(lastMessageFound.createdAt) : getDate(conversation.createdAt),
        unseen: false,
    })

    /**
     * 
     */

    useEffect(() => {
        if (conversation.messages.length > 0) {
            const conv = user.conversations.find(e => e.id === conversation._id)
            if (conv?.last_message_seen !== (null || "")) {
                const index = conversation.messages.findIndex(e => e._id === conv.last_message_seen)
                if (Math.abs((conversation.messages.length - 1) - index) > 0) {
                    setLastMessage(prevState => ({ ...prevState, unseen: true }))
                }
            }
        }
    }, [user.conversations, conversation.messages, conversation._id])

    /**
     * 
     */

    useEffect(() => {
        if (newMessage && newMessage.conversationId === conversation._id) {
            setLastMessage(prevState => ({
                ...prevState,
                message: newMessage,
                date: 'À l\'instant'
            }))
        }
        if (notification && notification.conversationId === conversation._id) {
            setLastMessage({
                message: notification,
                date: 'À l\'instant',
                unseen: true
            })
        }
    }, [newMessage, notification, conversation._id])

    /**
     * 
     */

    const menuRef = useRef()
    const [opened, setOpened] = useState(false)
    useClickOutside(menuRef, () => setOpened(false))

    const longPressProps = useLongPress({
        onClick: () => {
            changeCurrentChat(conversation)
            setLastMessage(prevState => ({ ...prevState, unseen: false }))
            navigate(`/messenger/` + conversation._id)
        },
        onLongPress: () => xs ? setOpened(true) : {},
    })

    /**
     * 
     */

    return (
        <div className={`conversation ${addClass(conversation._id === conversations.currentChat._id || opened, "active")}`}>
            <div className="conversation_inner" {...longPressProps}>
                <div className="conversation-img-container">
                    {conversation.type === 'group' ? (
                        conversation.picture ? (
                            <div className="conversation-img" style={fullImage(conversation.picture)}></div>
                        ) : (
                            members.slice(0, 2).map((element, key) => {
                                return <div className="conversation-group-img" key={key} style={fullImage(element.picture)}></div>
                            })
                        )
                    ) : (
                        <div className="conversation-img" style={fullImage(members[0].picture)}></div>
                    )}
                </div>
                <div className="conversation-infos">
                    <div className="conversation-infos-top">
                        <div className="conversation-name">
                            {conversation.name ? conversation.name : returnMembersPseudos(members)}
                        </div>
                        <div className="conversation-date">
                            {lastMessage.date}
                        </div>
                    </div>
                    <div className="last-message-wrapper">
                        {Object.keys(lastMessage.message)?.length > 0 ? (
                            <div className={`last-message ${lastMessage.unseen ? "notification" : "clear"}`}>
                                {returnConversationPseudo(conversation, lastMessage.message, uid)}
                                <p>
                                    {Object.keys(lastMessage?.message.text).length > 0 ? (
                                        convertDeltaToStringNoHTML(lastMessage.message)
                                    ) : (
                                        lastMessage?.message?.files?.length > 0 && lastMessage.message.files[0].name
                                    )}
                                </p>
                            </div>
                        ) : (
                            <div className="last-message">
                                <p>Nouvelle conversation - <em>Envoyer un message</em></p>
                            </div>
                        )}
                    </div>
                </div>
                {lastMessage.unseen &&
                    <div className="unseen-badge"></div>
                }
            </div>
            <div className={`conversation-toolbox ${addClass(opened, 'active')}`} ref={menuRef}>
                <ToolsMenu mobile mobileFull onClick={() => setOpened(!opened)}>
                    <div className="tools_choice">
                        <Icon name="Check" /> Marquer comme lu
                    </div>
                    {conversation.type === 'dialog' &&
                        <div className="tools_choice">
                            <Link to={`/user/${members[0].pseudo}`}>
                                <Icon name="Reply" /> Voir le profil
                            </Link>
                        </div>
                    }
                    <div className="tools_choice">
                        <Icon name="Signout" /> Quitter la conversation
                    </div>
                    {conversation.creator._id === uid &&
                        <div className="tools_choice red" onClick={() => deleteConv(conversation, conversations, user, websocket, dispatch)}>
                            <Icon name="Trash" /> Supprimer
                        </div>
                    }
                </ToolsMenu>
                <MobileMenu open={opened} setOpen={setOpened} onClick={() => setOpened(!opened)}>
                    <div className="tools_choice">
                        <Icon name="Check" /> Marquer comme lu
                    </div>
                    {conversation.type === 'dialog' &&
                        <div className="tools_choice">
                            <Link to={`/user/${members[0].pseudo}`}>
                                <Icon name="Reply" /> Voir le profil
                            </Link>
                        </div>
                    }
                    <div className="tools_choice">
                        <Icon name="Signout" /> Quitter la conversation
                    </div>
                    {conversation.creator._id === uid &&
                        <div className="tools_choice red" onClick={() => deleteConv(conversation, conversations, user, websocket, dispatch)}>
                            <Icon name="Trash" /> Supprimer
                        </div>
                    }
                </MobileMenu>
            </div>
        </div>
    );
};

export default Conversation;