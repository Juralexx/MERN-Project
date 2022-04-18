import axios from 'axios';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { UidContext } from '../AppContext';
import { avatar } from '../tools/functions/useAvatar';
import { convertEditorToHTML, getDate, getMembers } from './tools/function';

const Conversation = ({ user, conversation, newMessage, notification }) => {
    const uid = useContext(UidContext)
    const [convMembers, setConvMembers] = useState([])
    const [isResponse, setResponse] = useState(false)
    const [lastMessageFound, setLastMessageFound] = useState(null)
    const [date, setDate] = useState()
    const [unseen, setUnseen] = useState()
    const wrapperRef = useRef()

    useEffect(() => {
        if (conversation.last_message !== "") {
            const getLastMessage = async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/messages/single/${conversation.last_message}`)
                    setLastMessageFound(response.data)
                    getDate(response.data, setDate)
                    getMembers(conversation, uid, setConvMembers)
                    setResponse(true)
                } catch (err) { console.log(err) }
            }
            getLastMessage()
        } else {
            getDate(conversation, setDate)
            getMembers(conversation, uid, setConvMembers)
            setResponse(true)
        }
    }, [isResponse, conversation.last_message])

    useEffect(() => {
        if (user && conversation.last_message !== "") {
            const conv = user.conversations.find(element => element.conversation === conversation._id)
            if (conv.last_message_seen !== null) {
                const lastMessageSeenIndex = conversation.messages.findIndex(element => element === conv.last_message_seen)
                const difference = Math.abs((conversation.messages.length - 1) - lastMessageSeenIndex)
                if (difference > 0 && difference < 10) {
                    setUnseen(difference)
                    if (wrapperRef.current) wrapperRef.current.className = "conversation new-notification";
                } else if (difference > 10) {
                    setUnseen('9+')
                    if (wrapperRef.current) wrapperRef.current.className = "conversation new-notification";
                }
            }
        }
    }, [user, conversation.messages])

    useEffect(() => {
        if (newMessage && newMessage.conversationId === conversation._id) {
            setLastMessageFound(newMessage)
            setDate('À l\'instant')
        }
    }, [newMessage, conversation._id])

    useEffect(() => {
        if (notification && notification.conversationId === conversation._id) {
            wrapperRef.current.className = "conversation new-notification";
            setLastMessageFound(notification)
            setDate('À l\'instant')
        }
    }, [notification, conversation._id])

    useEffect(() => {
        const ref = wrapperRef.current
        const removeNotification = () => {
            if (ref.className === "conversation new-notification")
                ref.className = "conversation"
            setUnseen()
        }
        ref?.addEventListener('mousedown', removeNotification)
        return () => ref?.removeEventListener('mousedown', removeNotification)
    }, [notification, wrapperRef.current])

    return (
        isResponse &&
        <div className="conversation" ref={wrapperRef}>
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
                    </div>
                    <div className="conversation-date">{date}</div>
                </div>
                {lastMessageFound ? (
                    <div className="last-message-wrapper">
                        <div className="last-message-pseudo">{lastMessageFound.sender_pseudo} :&nbsp;</div>
                        <div className="last-message" dangerouslySetInnerHTML={convertEditorToHTML(lastMessageFound)}></div>
                        {unseen && <div className="unseen-messages">{unseen}</div>}
                    </div>
                ) : (
                    <div className="last-message-wrapper">
                        <div className="last-message-pseudo"></div>
                        <div className="last-message"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Conversation;