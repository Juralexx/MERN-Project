import React from 'react';
import { IconToggle } from '../../tools/components/Button';
import { avatar } from '../../tools/functions/useAvatar';
import { returnMembers } from '../functions/function';
import { addClass } from '../../Utils';
import { IoClose } from 'react-icons/io5';

const TemporaryConversation = ({ temporaryConv, setTemporaryConv, conversations, currentChat, setCurrentChat, setSearchHeader }) => {

    return (
        <div className={`conversation temporary ${addClass(temporaryConv._id === currentChat._id, "active")}`}>
            <div className="conversation_inner" onClick={() => { setSearchHeader(true); setCurrentChat(temporaryConv) }}>
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
                    setSearchHeader(false)
                    setCurrentChat(conversations.length > 0 ? conversations[0] : [])
                }} />
        </div>
    );
};

export default TemporaryConversation;