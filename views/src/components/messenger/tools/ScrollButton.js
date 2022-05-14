import React, { useEffect, useState } from 'react';
import { FaArrowCircleDown } from 'react-icons/fa';

const ScrollButton = ({ convWrapperRef, scrollTo }) => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        let ref = convWrapperRef
        const updatePosition = () => {
            if (ref.scrollTop < (ref.scrollHeight - 1500)) {
                setVisible(true)
            } else {
                setVisible(false)
            }
        }
        ref?.addEventListener('scroll', updatePosition)
        return () => ref?.removeEventListener('scroll', updatePosition)
    }, [convWrapperRef])

    return (
        visible &&
        <button
            className="conversation-scroll-btn"
            onClick={() => scrollTo?.current?.scrollIntoView({ behavior: "smooth" })}>
            <span>Derniers messages</span> <FaArrowCircleDown />
        </button>
    )
}

export default ScrollButton;