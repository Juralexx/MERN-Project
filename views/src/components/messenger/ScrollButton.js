import React, { useEffect, useState } from 'react';
import { FaArrowCircleDown } from 'react-icons/fa';

const ScrollButton = ({ conversationContainer, scrollTo }) => {
    const [visible, setVisible] = useState(false)

    const updatePosition = () => {
        if (conversationContainer.current.scrollTop < (conversationContainer.current.scrollHeight - 1500)) {
            setVisible(true)
        } else { setVisible(false) }
    }

    useEffect(() => {
        if (conversationContainer.current)
            conversationContainer.current.addEventListener('scroll', updatePosition)
        return () => conversationContainer.current.removeEventListener('scroll', updatePosition)
    }, [conversationContainer])

    return (
        visible && (
            <button className="conversation-scroll-btn" onClick={() => scrollTo.current?.scrollIntoView({behavior: "smooth"})}>
                <span>Derniers messages</span> <FaArrowCircleDown /> 
            </button>
        )
    );
}

export default ScrollButton;