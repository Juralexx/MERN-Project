import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';
import React from 'react';

const Message = ({ message, own }) => {
    const avatar = (props) => { return ({ backgroundImage: `url(${props})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }) }

    return (
        <div className={ own ? "message own" : "message"}>
            <div className="message-top">
                <div className="message-img" style={avatar(message.sender_picture)}></div>
                <p className="message-text">
                    {message.text}
                </p>
            </div>
            <div className="message-bottom">
                <p className="time-ago">il y a {formatDistance(new Date(message.createdAt), new Date(), { locale: fr, includeSeconds: true })}</p>
            </div>
        </div>
    );
};

export default Message;
