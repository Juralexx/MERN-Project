import React from 'react'
import ThreeDots from '../../tools/icons/ThreeDots'

const Typing = ({ isTyping, typingContext, currentChat }) => {

    return (
        isTyping && typingContext.conversationId === currentChat._id && (
            <div className="is-typing">
                {typingContext.sender + " est en train d'écrire..."}
                <ThreeDots />
            </div>
        )
    )
}

export default Typing