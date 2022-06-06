import React from 'react';
import { IconToggle } from '../../tools/global/Button';
import { avatar } from '../../tools/hooks/useAvatar';
import { returnMembers } from '../functions/function';
import { addClass } from '../../Utils';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const TemporaryConversation = ({ temporaryConv, setTemporaryConv, conversations, currentChat, setCurrentChat }) => {

    return (
        <Link to="/messenger/new">
            <div className={`conversation temporary ${addClass(temporaryConv._id === currentChat._id, "active")}`}>
                <div className="conversation_inner" onClick={() => setCurrentChat(temporaryConv)}>
                    <div className="conversation-img-container">
                        {temporaryConv.members.slice(0, 3).map((element, key) => {
                            return (
                                <div className="conversation-img" key={key} style={avatar(element.picture)}></div>
                            )
                        })}
                    </div>
                    <div className="conversation-infos">
                        <div className="conversation-infos-top">
                            <div className="conversation-name">{returnMembers(temporaryConv.members)}</div>
                            <div className="conversation-date"></div>
                        </div>
                        <div className="last-message-wrapper">
                            <div className="last-message"><p>Nouvelle conversation</p></div>
                        </div>
                    </div>
                </div>
                <IconToggle className="close-item" icon={<IoClose />} onClick={() => {
                    setTemporaryConv({})
                    setCurrentChat(conversations.length > 0 ? conversations[0] : [])
                }} />
            </div>
        </Link>
    );
};

export default TemporaryConversation;