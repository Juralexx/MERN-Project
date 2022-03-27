import React, { useState, useEffect } from 'react'
import { DayPicker, useInput } from 'react-day-picker';
import fr from 'date-fns/locale/fr';
import 'react-day-picker/dist/style.css';
import { IoCaretDownOutline } from 'react-icons/io5'
import { IoClose } from 'react-icons/io5'
import { FiCalendar } from 'react-icons/fi'

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
    const { type, value, defaultValue, useRef, onKeyPress, onChange, onInput, onClick, readOnly, disabled, name, id, className, placeholder, min, max, open, clean } = props
    return (
        <div ref={useRef} className={`${className ? 'dropdown-input ' + className : 'dropdown-input'}`} onClick={onClick}>
            <input
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                onInput={onInput}
                readOnly={readOnly}
                disabled={disabled}
                onKeyPress={onKeyPress}
                min={min}
                max={max}
            />
            {value && value.length > 0 ? (
                <IoClose className="cross" onClick={clean} />
            ) : (
                <IoCaretDownOutline />
            )}
            {open &&
                <div className="dropdown-input-choices">
                    {props.children}
                </div>
            }
        </div>
    )
}

export const DatePicker = (props) => {
    const { value, defaultValue, onKeyPress, onChange, onInput, disabled, className, placeholder, selected, onSelect } = props
    const [open, setOpen] = useState(false)

    const { inputProps, dayPickerProps } = useInput({
        defaultSelected: new Date(value),
        fromYear: 2020,
        toYear: 2022,
        format: 'dd/MM/yyyy',
        required: true
    })

    useEffect(() => {
        if (selected) setOpen(false)
    }, [selected])

    return (
        <div className={`${className ? 'date-picker-container ' + className : 'date-picker-container'}`}>
            <input
                placeholder={placeholder}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                onInput={onInput}
                onKeyPress={onKeyPress}
                disabled={disabled}
                onClick={() => setOpen(!open)}
                {...inputProps}
            />
            <FiCalendar />
            {open &&
                <div className="datepicker">
                    <DayPicker
                        {...dayPickerProps}
                        mode="single"
                        selected={selected}
                        onSelect={onSelect}
                        onClick={() => setOpen(false)}
                        locale={fr}
                        modifiersClassNames={{
                            selected: 'selected',
                            today: 'today'
                        }}
                    />
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