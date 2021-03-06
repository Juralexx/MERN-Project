import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { MessengerContext } from '../AppContext';
import { useClickOutside } from '../tools/hooks/useClickOutside';
import { useLongPress } from '../tools/hooks/useLongPress';
import ToolsMenu from '../tools/global/ToolsMenu';
import MobileMenu from '../tools/global/MobileMenu';
import { avatar } from '../tools/hooks/useAvatar';
import { addClass } from '../Utils';
import { convertDeltaToStringNoHTML, getDate, getMembers, returnConversationPseudo, returnMembers } from './functions/function';
import { HiLogout, HiOutlineCheck } from 'react-icons/hi';
import { IoArrowRedo, IoTrashBin } from 'react-icons/io5';

const Conversation = ({ conversation, newMessage, notification }) => {
    const { uid, user, currentChat, changeCurrentChat, xs, navigate } = useContext(MessengerContext)
    const members = useMemo(() => getMembers(conversation, uid), [conversation, uid])

    const [lastMessage, setLastMessageFound] = useState(conversation.messages.length > 0 ? conversation.messages[conversation.messages.length - 1] : {})
    const [date, setDate] = useState()
    const [unseen, setUnseen] = useState(false)

    const [opened, setOpened] = useState(false)
    const menuRef = useRef()
    useClickOutside(menuRef, setOpened, false)

    const longPressProps = useLongPress({
        onClick: () => {
            changeCurrentChat(conversation)
            setUnseen(null)
            navigate(`/messenger/` + conversation._id)
        },
        onLongPress: () => xs ? setOpened(true) : {},
    })

    useEffect(() => {
        if (Object.keys(lastMessage).length > 0)
            setDate(getDate(lastMessage.createdAt))
        else setDate(getDate(conversation.createdAt))
    }, [lastMessage, conversation.createdAt])

    useEffect(() => {
        if (conversation.messages.length > 0) {
            const conv = user.conversations.find(e => e.id === conversation._id)
            if (conv?.last_message_seen !== (null || "")) {
                const index = conversation.messages.findIndex(e => e._id === conv.last_message_seen)
                if (Math.abs((conversation.messages.length - 1) - index) > 0) {
                    setUnseen(true)
                }
            }
        }
    }, [user.conversations, conversation.messages, conversation._id])

    useEffect(() => {
        if (newMessage && newMessage.conversationId === conversation._id) {
            setLastMessageFound(newMessage)
            setDate('?? l\'instant')
        }
        if (notification && notification.conversationId === conversation._id) {
            setLastMessageFound(notification)
            setDate('?? l\'instant')
            setUnseen(true)
        }
    }, [newMessage, notification, conversation._id])

    return (
        <div className={`conversation ${addClass(conversation._id === currentChat._id || opened, "active")}`}>
            <div className="conversation_inner" {...longPressProps}>
                <div className="conversation-img-container">
                    {conversation.type === 'group' ? (
                        conversation.picture ? (
                            <div className="conversation-img" style={avatar(conversation.picture)}></div>
                        ) : (
                            members.slice(0, 2).map((element, key) => {
                                return <div className="conversation-group-img" key={key} style={avatar(element.picture)}></div>
                            })
                        )
                    ) : (
                        <div className="conversation-img" style={avatar(members[0].picture)}></div>
                    )}
                </div>
                <div className="conversation-infos">
                    <div className="conversation-infos-top">
                        <div className="conversation-name">
                            {conversation.name ? conversation.name : returnMembers(members)}
                        </div>
                        <div className="conversation-date">{date}</div>
                    </div>
                    <div className="last-message-wrapper">
                        {Object.keys(lastMessage)?.length > 0 ? (
                            <div className={`${unseen ? "last-message notification" : "last-message"}`}>
                                {returnConversationPseudo(conversation, lastMessage, uid)}
                                <p>
                                    {Object.keys(lastMessage?.text).length > 0 ? (
                                        convertDeltaToStringNoHTML(lastMessage)
                                    ) : (
                                        lastMessage?.files?.length > 0 && lastMessage.files[0].name
                                    )}
                                </p>
                            </div>
                        ) : (
                            <div className="last-message"><p>Nouvelle conversation - <em>Envoyer un message</em></p></div>
                        )}
                    </div>
                </div>
                {unseen && <div className="unseen-badge"></div>}
            </div>
            <div className={`conversation-toolbox ${addClass(opened, 'active')}`} ref={menuRef}>
                {!xs ? (
                    <ToolsMenu placement="bottom" onClick={() => setOpened(!opened)}>
                        <div className="tools_choice"><HiOutlineCheck />Marquer comme lu</div>
                        {conversation.type === 'dialog' &&
                            <div className="tools_choice"><IoArrowRedo />Voir le profil</div>
                        }
                        <div className="tools_choice"><HiLogout />Quitter la conversation</div>
                        <div className="tools_choice red"><IoTrashBin />Supprimer la conversation</div>
                    </ToolsMenu>
                ) : (
                    <MobileMenu open={opened} setOpen={setOpened}>
                        <div className="tools_choice"><HiOutlineCheck />Marquer comme lu</div>
                        {conversation.type === 'dialog' &&
                            <div className="tools_choice"><IoArrowRedo />Voir le profil</div>
                        }
                        <div className="tools_choice"><HiLogout />Quitter la conversation</div>
                        <div className="tools_choice red"><IoTrashBin />Supprimer la conversation</div>
                    </MobileMenu>
                )}
            </div>
        </div>
    );
};

export default Conversation;