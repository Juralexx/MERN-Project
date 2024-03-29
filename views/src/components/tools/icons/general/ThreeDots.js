import React from 'react'

const ThreeDots = (props) => {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <rect x="0" y="0" width="24" height="24" />
                <circle fill="currentColor" cx="5" cy="12" r="2" />
                <circle fill="currentColor" cx="12" cy="12" r="2" />
                <circle fill="currentColor" cx="19" cy="12" r="2" />
            </g>
        </svg>
    )
}

export default ThreeDots