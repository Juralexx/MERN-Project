import React from 'react'

const WarningCircle = (props) => {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <rect x="0" y="0" width="24" height="24" />
                <circle fill="currentColor" opacity="0.3" cx="12" cy="12" r="10" />
                <rect fill="currentColor" x="11" y="7" width="2" height="8" rx="1" />
                <rect fill="currentColor" x="11" y="16" width="2" height="2" rx="1" />
            </g>
        </svg>
    )
}

export default WarningCircle