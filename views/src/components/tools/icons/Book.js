import React from 'react'

const Book = (props) => {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <polygon points="0 0 24 0 24 24 0 24" />
                <mask fill="white">
                    <use />
                </mask>
                <use fill="currentColor" fill-rule="nonzero" />
            </g>
        </svg>
    )
}

export default Book