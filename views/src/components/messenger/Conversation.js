import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UidContext } from '../AppContext';

const Conversation = ({ conversation, displayLastMessage }) => {
    const avatar = (props) => { return ({ backgroundImage: `url(${props.picture})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }) }
    const uid = useContext(UidContext)
    const [user, setUser] = useState(null)
    const [isReponse, setResponse] = useState(false)

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


    return (
        <>
            {isReponse && (
                <div className="conversation">
                    <div className="conversation-img" style={avatar(user)}></div>
                    <div className="conversation-infos">
                        <p className="conversation-name"><strong>{user.pseudo}</strong></p>
                        {displayLastMessage &&
                            <p className="last-message-wrapper">
                                <span className="last-message-pseudo">{displayLastMessage.sender_pseudo} : </span>
                                <span className="last-message">{displayLastMessage.text}</span>
                            </p>
                        }
                    </div>
                </div>
            )}
        </>
    );
};

export default Conversation;
