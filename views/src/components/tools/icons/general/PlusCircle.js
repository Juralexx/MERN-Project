import React from 'react'

const PlusCircle = (props) => {
    return (
        <svg  {...props} xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <rect fill="currentColor" x="4" y="11" width="16" height="2" rx="1" />
                <rect fill="currentColor" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) " x="4" y="11" width="16" height="2" rx="1" />
            </g>
        </svg>
    )
}

export default PlusCircle