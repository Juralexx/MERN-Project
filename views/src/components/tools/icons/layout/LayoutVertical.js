import React from 'react'

const LayoutVertical = (props) => {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <rect x="0" y="0" width="24" height="24" />
                <rect fill="currentColor" x="5" y="4" width="6" height="16" rx="1.5" />
                <rect fill="currentColor" opacity="0.3" x="13" y="4" width="6" height="16" rx="1.5" />
            </g>
        </svg>
    )
}

export default LayoutVertical