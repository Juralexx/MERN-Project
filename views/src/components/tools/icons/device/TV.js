import React from 'react'

const TV = (props) => {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <rect x="0" y="0" width="24" height="24" />
                <path d="M4.5,6 L19.5,6 C20.8807119,6 22,6.97004971 22,8.16666667 L22,16.8333333 C22,18.0299503 20.8807119,19 19.5,19 L4.5,19 C3.11928813,19 2,18.0299503 2,16.8333333 L2,8.16666667 C2,6.97004971 3.11928813,6 4.5,6 Z M4,8 L4,17 L20,17 L20,8 L4,8 Z" fill="currentColor" fillRule="nonzero" />
                <polygon fill="currentColor" opacity="0.3" points="4 8 4 17 20 17 20 8" />
                <rect fill="currentColor" opacity="0.3" x="7" y="20" width="10" height="1" rx="0.5" />
            </g>
        </svg>
    )
}

export default TV