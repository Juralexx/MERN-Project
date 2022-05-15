import React, { useEffect, useState } from 'react';
import { ImArrowDown2 } from 'react-icons/im'

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
        visible && (
            <button
                className="conversation-scroll-btn"
                onClick={() => scrollTo?.current?.scrollIntoView({ behavior: "smooth" })}
            >
                <span>Derniers messages</span> <ImArrowDown2 />
            </button>
        )
    )
}

export default ScrollButton;