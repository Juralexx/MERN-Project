import React, { useState, useEffect, useRef } from 'react'
import { DayPicker, useInput } from 'react-day-picker';
import fr from 'date-fns/locale/fr';
import 'react-day-picker/dist/style.css';
import { IoCaretDownOutline } from 'react-icons/io5'
import { IoClose } from 'react-icons/io5'
import { FiCalendar } from 'react-icons/fi'
import { useClickOutside } from '../functions/useClickOutside';

export const ClassicInput = (props) => {
    const { type, value, defaultValue, onKeyPress, onChange, onInput, onClick, readOnly, disabled, name, id, className, inputClassName, placeholder, min, max, cross, onClean } = props
    return (
        <div className={`${className ? 'classic-input ' + className : 'classic-input'}`}>
            <input
                className={inputClassName}
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
            {(cross && (cross && value && value.length > 0)) && (
                <div onClick={onClean} className="svg_container">
                    <IoClose className="cross" />
                </div>
            )}
        </div>
    )
}

export const DropdownInput = (props) => {
    const { type, value, defaultValue, onKeyPress, onChange, onInput, readOnly, disabled, name, id, className, inputClassName, placeholder, min, max, clean, cross } = props
    const [open, setOpen] = useState(false)
    const ref = useRef()
    useClickOutside(ref, setOpen, false)

    return (
        <div ref={ref} className={`${className ? 'dropdown-input ' + className : 'dropdown-input'}`}>
            <input
                className={inputClassName}
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                value={value}
                defaultValue={defaultValue}
                onClick={() => setOpen(!open)}
                onChange={onChange}
                onInput={onInput}
                readOnly={readOnly}
                disabled={disabled}
                onKeyPress={onKeyPress}
                min={min}
                max={max}
            />
            {cross && value && value.length > 0 ? (
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
    const { value, defaultValue, onKeyPress, onChange, onInput, disabled, className, inputClassName, placeholder, selected, onSelect } = props
    const [open, setOpen] = useState(false)

    const { inputProps, dayPickerProps } = useInput({
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
                className={inputClassName}
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

export const DoubleIconInput = (props) => {
    const { text, type, value, defaultValue, onChange, onInput, onClick, readOnly, disabled, className, inputClassName, placeholder, startIcon, endIcon, name, id } = props
    return (
        <div className={`${className ? "double-icon-input " + className : "double-icon-input"}`}>
            <input
                className={inputClassName}
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
            />
            {startIcon && <div className="start_icon">{startIcon}</div>}
            {text}
            {endIcon && <div className="end-icon">{endIcon}</div>}
        </div>
    )
}

export const NumberInput = (props) => {
    const { value, defaultValue, onKeyPress, onChange, onInput, onClick, readOnly, disabled, name, id, className, placeholder, max } = props
    return (
        <input
            className={`${className ? 'number-input ' + className : 'number-input'}`}
            type="number"
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
            min="1"
            max={max}
        />
    )
}

export const CheckBox = (props) => {
    const { onChange, name, htmlFor, checked, className, inputClassName, onClick, value } = props
    return (
        <div className={`${className ? 'check-input ' + className : 'check-input'}`}>
            <input type="checkbox" name={name} checked={checked} onClick={onClick} onChange={onChange} value={value} className={inputClassName} />
            <label htmlFor={htmlFor}>
                <span><svg width="12px" height="9px" viewBox="0 0 12 9"><polyline points="1 5 4 8 11 1"></polyline></svg></span>
            </label>
        </div>
    )
}

export const IconInput = (props) => {
    const { type, value, defaultValue, onChange, onInput, onClick, readOnly, inputClassName, disabled, className, icon, endIcon, name, id, placeholder, cross, onClean } = props
    return (
        <div className={`${className ? "icon-input " + className : "icon-input"}`}>
            <input
                className={inputClassName}
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
            />
            {icon &&
                <div className="start_icon">
                    {icon}
                </div>
            }
            {endIcon &&
                <div className="end-icon">
                    {endIcon}
                </div>
            }
            {(cross && (cross && value && value.length > 0)) && (
                <div onClick={onClean} className="svg_container">
                    <IoClose className="cross" />
                </div>
            )}
        </div>
    )
}

export const Textarea = (props) => {
    const { type, value, defaultValue, onKeyPress, onChange, onInput, onClick, readOnly, disabled, name, id, className, placeholder, min, max } = props
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

export const DynamicInput = (props) => {
    const { type, value, defaultValue, onKeyPress, onChange, onInput, onClick, readOnly, disabled, name, id, className, inputClassName, placeholder, text, startIcon, endIcon, endIconClick } = props
    return (
        <div className={`${className ? 'dynamic-input ' + className : 'dynamic-input'}`}>
            <input
                className={inputClassName}
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
            />
            <label>{text}</label>
            {startIcon &&
                <div className="start_icon">
                    {startIcon}
                </div>
            }
            {endIcon &&
                <div className="end-icon" onClick={endIconClick}>
                    {endIcon}
                </div>
            }
        </div>
    )
}