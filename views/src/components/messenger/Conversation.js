import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UidContext } from '../AppContext';
import { formatDistanceToNowStrict } from 'date-fns'
import { fr } from 'date-fns/locale';
import { dateParserWithoutYear } from '../Utils'

const Conversation = ({ conversation, displayLastMessage }) => {
    const avatar = (props) => { return ({ backgroundImage: `url(${props.picture})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }) }
    const uid = useContext(UidContext)
    const [user, setUser] = useState(null)
    const [isResponse, setResponse] = useState(false)
    const [lastMessageFound, setLastMessageFound] = useState()
    const [date, setDate] = useState()

    useEffect(() => {
        const friendID = conversation.members.find((member) => member !== uid)
        const getUser = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}api/user/${friendID}`)
                setUser(response.data)
                setResponse(true)
            } catch (err) {
                console.log(err)
            }
        }
        getUser()
    }, [conversation.members, uid])

    useEffect(() => {
        if (displayLastMessage) {
            const getLastMessage = () => {
                displayLastMessage.map((element) => {
                   const table = element.slice()
                    // setLastMessageFound(table)
                })
            }
            getLastMessage()

            if (lastMessageFound) {
                console.log(lastMessageFound)
                function getDate() {
                    const diffInMs = Math.abs(new Date(lastMessageFound.createdAt) - new Date());
                    const checkDate = diffInMs / (1000 * 60 * 60 * 24);
                    if (checkDate > 1) {
                        const getDateInDays = dateParserWithoutYear(lastMessageFound.createdAt)
                        setDate(getDateInDays)
                    } else {
                        const getDateInHours = formatDistanceToNowStrict(new Date(lastMessageFound.createdAt), new Date(), { locale: fr, includeSeconds: true, addSuffix: false })
                        setDate(getDateInHours)
                    }
                }
                getDate()
            }
        }
    }, [ displayLastMessage, lastMessageFound])

    return (
        <>
            {isResponse && (
                <div className="conversation">
                    <div className="conversation-img" style={avatar(user)}></div>
                    <div className="conversation-infos">
                        <p className="conversation-name"><strong>{user.pseudo}</strong><span>{date}</span></p>
                        {lastMessageFound && (
                            <p className="last-message-wrapper">
                                <span className="last-message-pseudo">{lastMessageFound.sender_pseudo} : </span>
                                <span className="last-message">{lastMessageFound.text}</span>
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Conversation;
