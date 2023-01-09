import React from 'react'

const Checkbox = ({ uniqueKey, checked, onChange, className }) => {
    return (
        <div className={className ? "check-input " + className : "check-input"} key={uniqueKey}>
            <input id={uniqueKey} name={uniqueKey} type="checkbox" checked={checked} onChange={onChange} />
            <label htmlFor={uniqueKey}>
                <span>
                    <svg width="12px" height="9px" viewBox="0 0 12 9">
                        <polyline points="1 5 4 8 11 1"></polyline>
                    </svg>
                </span>
            </label>
        </div>
    )
}

export default Checkbox