import axios from 'axios';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { UidContext } from '../AppContext';
import { formatDistanceToNowStrict } from 'date-fns'
import { fr } from 'date-fns/locale';
import { dateParserWithoutYear } from '../Utils'

const Conversation = ({ conversation, newMessage, notification }) => {
    const avatar = (props) => {
        return ({
            backgroundImage: `url(${props})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
        })
    }
    const uid = useContext(UidContext)
    const [convMembers, setConvMembers] = useState([])
    const [isResponse, setResponse] = useState(false)
    const [lastMessageFound, setLastMessageFound] = useState()
    const [date, setDate] = useState()
    const conversationDiv = useRef()

    function getDate(element) {
        const diffInMs = Math.abs(new Date(element.createdAt) - new Date());
        const checkDate = diffInMs / (1000 * 60 * 60 * 24);
        if (checkDate > 1) {
            const getDateInDays = dateParserWithoutYear(element.createdAt)
            setDate(getDateInDays)
        } else {
            const getDateInHours = formatDistanceToNowStrict(new Date(element.createdAt), new Date(), { locale: fr, includeSeconds: true })
            setDate(getDateInHours)
        }
    }
    function getMembers() {
        const index = conversation.members.findIndex(member => member.id === uid)
        conversation.members.splice(index, 1)
        setConvMembers(conversation.members)
    }

    useEffect(() => {
        if (conversation.last_message) {
            const getLastMessage = async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/messages/single/${conversation.last_message}`)
                    setLastMessageFound(response.data[0])
                    setResponse(true)
                    if (lastMessageFound) {
                        getDate(lastMessageFound)
                        getMembers()
                    }
                } catch (err) {
                    console.log(err)
                }
            }
            getLastMessage()
        }
    }, [isResponse, conversation.last_message])

    useEffect(() => {
        if (newMessage && newMessage.conversationId === conversation._id) {
            setLastMessageFound(newMessage)
            setDate('À l\'instant')
        }
    }, [newMessage, conversation._id])

    useEffect(() => {
        if (notification && notification.conversationId === conversation._id) {
            conversationDiv.current.className = "conversation new-notification";
            setLastMessageFound(notification)
            setDate('À l\'instant')
        }
    }, [notification, conversation._id])

    return (
        <>
            {isResponse && (
                <div className="conversation" ref={conversationDiv}>
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
                        {lastMessageFound && (
                            <p className="last-message-wrapper">
                                <span className="last-message-pseudo">{lastMessageFound.sender_pseudo} : </span>
                                <span className="last-message">{lastMessageFound.text}</span>
                            </p>
                        )}
                        {!lastMessageFound && (
                            <p className="last-message-wrapper">
                                <span className="last-message-pseudo"></span>
                                <span className="last-message"></span>
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Conversation;
