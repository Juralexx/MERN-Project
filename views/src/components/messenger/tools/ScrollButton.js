import React, { useEffect, useState } from 'react';
import Icon from '../../tools/icons/Icon';

const ScrollButton = ({ convWrapperRef, scrollTo }) => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        let ref = convWrapperRef?.current
        const updatePosition = () => {
            if (ref?.scrollTop < (ref.scrollHeight - 1000))
                setVisible(true)
            else
                setVisible(false)
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
                Derniers messages <Icon name="DoubleArrowRight" />
            </button>
        )
    )
}

export default ScrollButton;