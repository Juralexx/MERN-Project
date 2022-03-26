import React from 'react'
import { IoCaretDownOutline } from 'react-icons/io5'

export const ClassicInput = (props) => {
    const { type, value, defaultValue, onKeyPress, onChange, onInput, onClick, readOnly, disabled, name, id, className, placeholder, min, max } = props
    return (
        <input
            className={`${className ? 'classic-input ' + className : 'classic-input'}`}
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            onInput={onInput}
            onClick={onClick}
            readOnly={readOnly}
            disabled={disabled}
            onKeyPress={onKeyPress}
            min={min}
            max={max}
        />
    )
}

export const DropdownInput = (props) => {
    const { type, value, defaultValue, useRef, onKeyPress, onChange, onInput, onClick, readOnly, disabled, name, id, className, placeholder, min, max, open } = props
    return (
        <div ref={useRef} className={`${className ? 'dropdown-input ' + className : 'dropdown-input'}`}>
            <input
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                onInput={onInput}
                onClick={onClick}
                readOnly={readOnly}
                disabled={disabled}
                onKeyPress={onKeyPress}
                min={min}
                max={max}
            />
            <IoCaretDownOutline />
            {open &&
                <div className="dropdown-input-choices">
                    {props.children}
                </div>
            }
        </div>
    )
}

export const Input = (props) => {
    const { text, type, value, defaultValue, onKeyPress, onChange, onInput, onClick, readOnly, disabled, fullwidth, name, id, className } = props
    return (
        <div className={`relative z-0 mb-2 w-full h-[54px] group bg-slate-50 peer-focus:bg-slate-100 rounded-t dark:bg-background_primary_light
        ${fullwidth ? "w-full" : "w-[300px]"}
        ${className ? className : null}`}>
            <input
                type={type}
                name={name}
                id={id}
                className={`block absolute bottom-0 w-full py-1 px-4 h-[40px] text-[16px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 
                appearance-none dark:text-white dark:border-slate-500 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer`}
                placeholder=" "
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                onInput={onInput}
                onClick={onClick}
                readOnly={readOnly}
                disabled={disabled}
                onKeyPress={onKeyPress}
            />
            <label
                htmlFor="search"
                className="absolute px-4 text-[16px] text-gray-500 dark:text-slate-400 duration-300 transform -translate-y-[16px] scale-75 top-[15px] -z-10 origin-[0]
                peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                peer-focus:scale-75 peer-focus:-translate-y-[16px]"
            >
                {text}
            </label>
        </div>
    )
}

export const IconInput = (props) => {
    const { text, type, value, defaultValue, onChange, onInput, onClick, readOnly, disabled, fullwidth, icon, endIcon, name, id } = props
    return (
        <div className={`relative z-0 mb-2 w-full h-[54px] group bg-background_light rounded-t dark:bg-background_primary_light ${fullwidth ? "w-full" : "w-[300px]"}`}>
            <input
                type={type}
                name={name}
                id={id}
                className={`block absolute bottom-0 w-full pt-1 pb-2 pl-[37px] pr-3 h-[40px] text-[16px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 
                appearance-none dark:text-white dark:border-slate-500 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer`}
                placeholder=" "
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                onInput={onInput}
                onClick={onClick}
                readOnly={readOnly}
                disabled={disabled}
            />
            {icon &&
                <div className="h-[40px] absolute bottom-0 flex pl-4 py-[4px] scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-focus:scale-75 duration-300">
                    {icon}
                </div>
            }
            <label
                htmlFor="search"
                className="absolute pl-12 pr-3 text-[16px] text-gray-500 dark:text-slate-400 duration-300 transform -translate-y-[18px] scale-75 top-[15px] -z-10 origin-[0]
                peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                peer-focus:scale-75 peer-focus:-translate-y-[18px]"
            >
                {text}
            </label>
            {endIcon &&
                <div className="h-[40px] absolute bottom-0 right-4 flex pl-4 py-[4px]">
                    {endIcon}
                </div>
            }
        </div>
    )
}

export const EndIconInput = (props) => {
    const { text, type, value, defaultValue, onChange, onInput, onClick, readOnly, disabled, fullwidth, endIcon, name, id } = props
    return (
        <div className={`relative z-0 mb-2 w-full h-[54px] group bg-slate-50 rounded-t dark:bg-background_primary_light ${fullwidth ? "w-full" : "w-[300px]"}`}>
            <input
                type={type}
                name={name}
                id={id}
                className={`block absolute bottom-0 w-full pt-1 pb-2 px-4 pr-3 h-[40px] text-[16px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 
                appearance-none dark:text-white dark:border-slate-500 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer`}
                placeholder=" "
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                onInput={onInput}
                onClick={onClick}
                readOnly={readOnly}
                disabled={disabled}
            />
            <label
                htmlFor="search"
                className="absolute px-4 text-[16px] text-gray-500 dark:text-slate-400 duration-300 transform -translate-y-[18px] scale-75 top-[15px] -z-10 origin-[0]
                peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                peer-focus:scale-75 peer-focus:-translate-y-[18px]"
            >
                {text}
            </label>
            {endIcon &&
                <div className="h-[40px] absolute bottom-0 right-4 flex pl-4 py-[4px] scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-focus:scale-75 duration-300">
                    {endIcon}
                </div>
            }
        </div>
    )
}

export const Textarea = (props) => {
    const { type, value, defaultValue, onKeyPress, onChange, onInput, onClick, readOnly, disabled, fullwidth, name, id, className, placeholder, min, max } = props
    return (
        <textarea
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            onInput={onInput}
            onClick={onClick}
            readOnly={readOnly}
            disabled={disabled}
            onKeyPress={onKeyPress}
            min={min}
            max={max}
            className={`${className ? "textarea " + className : "textarea"}`}
        ></textarea>
    )
}

export const ClassicInputEndIcon = (props) => {
    const { type, value, defaultValue, onKeyPress, onChange, onInput, onClick, readOnly, disabled, fullwidth, name, id, className, placeholder, endIcon } = props
    return (
        <>
            <input
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                onInput={onInput}
                onClick={onClick}
                readOnly={readOnly}
                disabled={disabled}
                onKeyPress={onKeyPress}
                className={`bg-background_light dark:border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  
            dark:bg-background_primary_light dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
            ${fullwidth ? "w-full" : "w-[300px]"}
            ${className ? className : null}`}
            />
            {endIcon &&
                <div className="h-[40px] absolute bottom-0 right-4 flex pl-4 py-[4px] scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-focus:scale-75 duration-300">
                    {endIcon}
                </div>
            }
        </>
    )
}