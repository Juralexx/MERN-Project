import axios from 'axios';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { UidContext } from '../AppContext';
import { avatar } from '../tools/functions/useAvatar';
import { convertEditorToHTML, getDate, getMembers } from './tools/function';

const Conversation = ({ conversation, newMessage, notification }) => {
    const uid = useContext(UidContext)
    const [convMembers, setConvMembers] = useState([])
    const [isResponse, setResponse] = useState(false)
    const [lastMessageFound, setLastMessageFound] = useState(null)
    const [date, setDate] = useState()
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
        if (newMessage && newMessage.conversationId === conversation._id) {
            setLastMessageFound(newMessage)
            setDate('À l\'instant')
            console.log('cest ok')
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
        const disableNotification = () => {
            if (ref.className === "conversation new-notification")
                ref.className = "conversation"
        }
        ref?.addEventListener('mousedown', disableNotification)
        return () => ref?.removeEventListener('mousedown', disableNotification)
    }, [notification])

    return (
        <>
            {isResponse && (
                <div className="conversation" ref={wrapperRef}>
                    <div className="conversation-img-container">
                        {convMembers.map((element, key) => {
                            return (
                                <div className="conversation-img" key={key} style={avatar(element.picture)}></div>
                            )
                        })}
                    </div>
                    <div className="conversation-infos">
                        <div className="conversation-infos-top">
                            <div className="conversation-name">
                                {convMembers.length === 1 && (
                                    <strong>{convMembers[0].pseudo}</strong>
                                )}
                                {convMembers.length === 2 && (
                                    <strong>{convMembers[0].pseudo + ", " + convMembers[1].pseudo}</strong>
                                )}
                                {convMembers.length === 3 && (
                                    <strong>{convMembers[0].pseudo + ", " + convMembers[1].pseudo + ", " + convMembers[2].pseudo}</strong>
                                )}
                                {convMembers.length > 3 && (
                                    <strong>{convMembers[0].pseudo + ", " + convMembers[1].pseudo + ", " + convMembers[2].pseudo + " et " + (convMembers.length - 3) + " autres"}</strong>
                                )}
                            </div>
                            <div className="conversation-date">{date}</div>
                        </div>
                        {lastMessageFound ? (
                            <div className="last-message-wrapper">
                                <div className="last-message-pseudo">{lastMessageFound.sender_pseudo} :&nbsp;</div>
                                <div className="last-message" dangerouslySetInnerHTML={convertEditorToHTML(lastMessageFound)}></div>
                            </div>
                        ) : (
                            <div className="last-message-wrapper">
                                <span className="last-message-pseudo"></span>
                                <span className="last-message"></span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Conversation;