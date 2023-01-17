import React from 'react'
import ThreeDots from '../../tools/loaders/ThreeDots'

const Typing = ({ isTyping, currentChat }) => {

    return (
        isTyping.state &&
        isTyping.context.conversationId === currentChat._id && (
            <div className="is-typing">
                {isTyping.context.sender + " est en train d'écrire..."}
                <ThreeDots />
            </div>
        )
    )
}

export default Typing