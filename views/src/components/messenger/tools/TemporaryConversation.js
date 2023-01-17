import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../tools/icons/Icon';
import { MessengerContext } from '../../AppContext';
import { returnMembersPseudos } from '../functions';
import { addClass, fullImage } from '../../Utils';

const TemporaryConversation = () => {
    const { conversations, setConversations } = useContext(MessengerContext)
    const temporary = conversations.temporaryConversation

    const onDeleteTemporaryConversation = () => {
        if (window.location.pathname === '/messenger/new') {
            setConversations(convs => ({ ...convs, temporaryConversation: {}, currentChat: {} }))
        } else {
            setConversations(convs => ({ ...convs, temporaryConversation: {} }))
        }
    }

    return (
        <Link to="/messenger/new">
            <div className={`conversation temporary ${addClass(temporary._id === conversations.currentChat._id, "active")}`}>
                <div className="conversation_inner" onClick={() => setConversations(convs => ({ ...convs, currentChat: temporary }))}>
                    <div className="conversation-img-container">
                        {temporary.type === 'group' ? (
                            temporary.members.slice(0, 2).map((element, key) => {
                                return <div className="conversation-group-img" key={key} style={fullImage(element.picture)}></div>
                            })
                        ) : (
                            <div className="conversation-img" style={fullImage(temporary.members[0].picture)}></div>
                        )}
                    </div>
                    <div className="conversation-infos">
                        <div className="conversation-infos-top">
                            <div className="conversation-name">
                                {returnMembersPseudos(temporary.members)}
                            </div>
                            <div className="conversation-date"></div>
                        </div>
                        <div className="last-message-wrapper">
                            <div className="last-message">
                                <p>Nouvelle conversation</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Icon
                    name="Cross"
                    className="close-item"
                    onClick={onDeleteTemporaryConversation}
                />
            </div>
        </Link>
    );
};

export default TemporaryConversation;