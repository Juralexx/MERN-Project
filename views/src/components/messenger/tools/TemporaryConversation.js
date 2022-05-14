import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { IconToggle } from '../../tools/components/Button';
import { avatar } from '../../tools/functions/useAvatar';
import { addActive } from '../../Utils';
import { returnMembers } from './function';

const TemporaryConversation = ({ uid, user, temporaryConv, setTemporaryConv, conversations, currentChat, setCurrentChat, setSearchHeader }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className={`conversation temporary ${addActive(temporaryConv._id === currentChat._id, "active")}`} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
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
            {open &&
                <IconToggle className="close-item" icon={<IoClose />} onClick={() => {
                    setTemporaryConv({})
                    setSearchHeader(false)
                    setCurrentChat(conversations.length > 0 ? conversations[0] : [])
                }} />
            }
        </div>
    );
};

export default TemporaryConversation;