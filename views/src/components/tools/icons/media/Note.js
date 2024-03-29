import React from 'react'

const Note = (props) => {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <rect x="0" y="0" width="24" height="24" />
                <path d="M11.9785206,18.8007059 C11.8002933,20.0396328 10.5347301,21 9,21 C7.34314575,21 6,19.8807119 6,18.5 C6,17.1192881 7.34314575,16 9,16 C9.35063542,16 9.68722107,16.0501285 10,16.1422548 L10,5.93171093 C10,5.41893942 10.319781,4.96566617 10.7894406,4.81271925 L16.5394406,3.05418311 C17.2638626,2.81827161 18,3.38225531 18,4.1731748 C18,4.95474642 18,5.54092513 18,5.93171093 C18,6.51788965 17.4511634,6.89225606 17,7 C16.3508668,7.15502181 14.6842001,7.48835515 12,8 L12,18.5512168 C12,18.6409956 11.9927193,18.7241187 11.9785206,18.8007059 Z" fill="currentColor" fillRule="nonzero" />
            </g>
        </svg>
    )
}

export default Note