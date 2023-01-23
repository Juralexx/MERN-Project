import React, { useState, useRef } from 'react'
import 'react-day-picker/dist/style.css';
import { useClickOutside } from '../hooks/useClickOutside';
import Icon from '../icons/Icon';
import styled from 'styled-components';

export const ClassicInput = (props) => {
    const { useRef, type, value, defaultValue, onKeyPress, onKeyDown, onKeyUp, onFocus, onBlur, onChange, onInput, onClick, readOnly, disabled, name, id, className, inputClassName, placeholder, min, max, cross, onClean } = props
    return (
        <InputClassic className={`${className ? 'classic-input ' + className : 'classic-input'}`}>
            <input
                ref={useRef}
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
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                onFocus={onFocus}
                onBlur={onBlur}
                min={min}
                max={max}
            />
            {cross && ((value || defaultValue) && (value?.length > 0 || defaultValue?.length > 0)) &&
                <div onClick={onClean} className="svg_container">
                    <Icon name="Cross" className="cross" />
                </div>
            }
        </InputClassic>
    )
}

const InputClassic = styled.div`
    position    : relative;
    display     : flex;
    align-items : center;
    max-width   : 300px;
    z-index     : 10;

    input {
        display       : block;
        height        : 44px;
        padding       : 8px 12px;
        color         : var(--input-text);
        background    : var(--input);
        border-radius : var(--rounded-sm);
        border        : 1px solid var(--light-border);
        outline       : none;
        z-index       : 10;

        &::placeholder {
            color : var(--placeholder);
        }

        &:focus {
            border     : 1px solid var(--primary);
            box-shadow : none;
        }
    }

    .svg_container {
        position      : absolute;
        bottom        : 10px;
        right         : 10px;
        padding       : 5px;
        border-radius : 20px;
        cursor        : pointer;
        z-index       : 700;

        svg {
            height   : 16px;
            width    : 16px;
            color    : var(--text-tertiary);
        }

        &:hover {
            background : var(--content-light);
        }
    }

    &.full {
        flex-grow : 1;
        max-width : unset;
        input {
            flex-grow : 1;
        }
    }

    &.small {
        height : 36px;
        input {
            height : 36px;
        }
    }
`

/**
 * 
 */

export const DropdownInput = (props) => {
    const { type, value, defaultValue, onKeyPress, onKeyDown, onKeyUp, onFocus, onBlur, onChange, onInput, readOnly, disabled, name, id, className, inputClassName, placeholder, min, max, onClean, cross } = props
    const [open, setOpen] = useState(false)
    const ref = useRef()
    useClickOutside(ref, () => setOpen(false))

    return (
        <InputDropdown ref={ref} className={`${className ? 'dropdown-input ' + className : 'dropdown-input'}`}>
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
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                onFocus={onFocus}
                onBlur={onBlur}
                min={min}
                max={max}
            />
            {cross && value && value.length > 0 ? (
                <Icon name="Cross" className="cross" onClick={onClean} />
            ) : (
                <Icon name="CaretDown" />
            )}
            {open &&
                <div className="dropdown-input-choices custom-scrollbar" onClick={() => setOpen(false)}>
                    {props.children}
                </div>
            }
        </InputDropdown>
    )
}

const InputDropdown = styled.div`
    position      : relative;
    height        : 44px;
    cursor        : pointer;
    background    : var(--input);
    border-radius : var(--rounded-sm);
    z-index       : 1;
    border        : 1px solid var(--light-border);

    input {
        padding            : 10px;
        color              : var(--input-text);
        background         : var(--input);
        border-radius      : var(--rounded-sm);
        outline            : none;
        cursor             : pointer;
        width              : 85%;
        height             : 100%;
        text-overflow      : ellipsis;
        overflow           : hidden;
        display            : -webkit-box;
        -webkit-line-clamp : 1;
        -webkit-box-orient : vertical;
        caret-color        : transparent;

        &::placeholder {
            color : var(--placeholder);
        }
    }

    svg {
        position : absolute;
        height   : 16px;
        width    : 16px;
        bottom   : 12px;
        right    : 10px;
        color    : var(--text-secondary);
        z-index  : 100;
    }

    .dropdown-input-choices {
        position      : absolute;
        left          : 0;
        width         : 100%;
        max-height    : 300px;
        overflow-y    : auto;
        margin-top    : 5px;
        background    : var(--input);
        box-shadow    : var(--shadow-xl);
        border-radius : var(--rounded-sm);

        div {
            padding : 8px 12px;
            cursor  : pointer;
            color   : var(--text-secondary);

            &:hover {
                background-color : var(--light);
            }
        }
    }

    &.small {
        height : 34px;
        input {
            padding   : 6px 10px 5px;
        }
        svg {
            bottom : 7px;
        }
    }
`

/**
 * 
 */

export const NumberInput = (props) => {
    const { value, defaultValue, onKeyPress, onKeyDown, onKeyUp, onFocus, onBlur, onChange, onInput, onClick, readOnly, disabled, name, id, className, placeholder, max } = props
    return (
        <InputNumber
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
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onFocus={onFocus}
            onBlur={onBlur}
            min="1"
            max={max}
        />
    )
}

const InputNumber = styled.input`
    display       : block;
    height        : 44px;
    max-width     : 100px;
    padding       : 8px;
    color         : var(--input-text);
    background    : var(--input);
    border-radius : var(--rounded-sm);
    border        : 1px solid var(--light-border);
    outline       : none;
    z-index       : 10;

    &:focus {
        border : 1px solid var(--primary);
    }

    &:focus-visible {
        outline : none;
    }

    &::placeholder {
        color      : var(--placeholder);
        box-shadow : none;
    }
`

/**
 * 
 */

export const IconInput = (props) => {
    const { useRef, type, value, defaultValue, onChange, onInput, onClick, readOnly, inputClassName, disabled, onKeyPress, onKeyDown, onKeyUp, onFocus, onBlur, min, max, className, icon, endIcon, name, id, placeholder, cross, onClean, endIconClick } = props
    return (
        <InputIcon className={`${className ? "icon-input " + className : "icon-input"}`}>
            <input
                className={inputClassName}
                ref={useRef}
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
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                onFocus={onFocus}
                onBlur={onBlur}
                min={min}
                max={max}
            />
            {icon &&
                <div className="start_icon">
                    {icon}
                </div>
            }
            {cross ? (
                (value && value.length > 0) ? (
                    <div onClick={onClean} className="svg_container">
                        <Icon name="Cross" className="cross" />
                    </div>
                ) : (
                    endIcon && (
                        <div className="end-icon" onClick={endIconClick}>
                            {endIcon}
                        </div>
                    )
                )
            ) : (
                endIcon && (
                    <div className="end-icon" onClick={endIconClick}>
                        {endIcon}
                    </div>
                )
            )}
        </InputIcon>
    )
}

const InputIcon = styled.div`
    position      : relative;
    width         : 100%;
    height        : 44px;
    color         : var(--input-text);
    background    : var(--input);
    border-radius : var(--rounded-sm);

    input {
        display       : block;
        position      : absolute;
        width         : 100%;
        height        : 100%;
        padding       : 6px 12px 4px 20px;
        border-radius : var(--rounded-sm);
        outline       : none;
        background    : transparent;
        z-index       : 1;
        border        : 1px solid var(--light-border);
        color         : var(--input-text);

        &:focus {
            border : 1px solid var(--primary);
            + label {
                transform  : scale(0.75);
                top        : 4px;
                transition : 0.2s ease;
                padding    : 0 0 0 64px;
            }
        }

        &::placeholder {
            color : var(--placeholder);
        }
        

        &[type="search"]::-webkit-search-cancel-button {
            -webkit-appearance : none;
            display            : inline-block;
            width              : 12px;
            height             : 12px;
            margin-left        : 10px;
            background         : 
            linear-gradient(45deg, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 43%, var(--primary) 45%, var(--primary) 55%,rgba(0,0,0,0) 57%,rgba(0,0,0,0) 100%),
            linear-gradient(135deg, transparent 0%,transparent 43%, var(--primary) 45%, var(--primary) 55%,transparent 57%,transparent 100%);
        }
    }

    label {
        position         : absolute;
        top              : 15px;
        color            : var(--placeholder);
        padding          : 0 0 0 50px;
        transform        : scale(1);
        transform-origin : 0;
        transition       : 0.2s ease;
        z-index          : 0;
    }

    &.is_start_icon {
        input {
            padding : 8px 12px 6px 40px;
        }
    }

    .start_icon {
        height           : 100%;
        position         : absolute;
        bottom           : 0;
        display          : flex;
        align-items      : center;
        padding          : 0 0 0 13px;
        transform        : scale(1);
        transform-origin : 0;

        svg {
            height : 20px;
            width  : 20px;
            color  : var(--placeholder);
        }
    }

    .end-icon {
        position  : absolute;
        right     : 15px;
        top       : 55%;
        transform : translateY(-50%);
        z-index   : 2;
        cursor    : pointer;

        svg {
            color  : var(--placeholder);
            height : 16px;
            width  : 16px;
        }
    }

    .svg_container {
        position      : absolute;
        bottom        : 8px;
        right         : 10px;
        padding       : 5px;
        border-radius : 20px;
        cursor        : pointer;
        z-index       : 700;

        svg {
            height   : 16px;
            width    : 16px;
            color    : var(--text-tertiary);
        }

        &:hover {
            background : var(--content-light);
        }
    }

    &.full {
        flex-grow : 1;
        max-width : unset;
        input {
            flex-grow : 1;
        }
    }

    &.small {
        height:36px;
        &.is_start_icon {
            input {
                padding-left : 35px;
            }
            .start_icon {
                padding-left:8px;
            }
        }
    }
`

/**
 * 
 */

export const Textarea = (props) => {
    const { type, value, defaultValue, onKeyPress, onKeyDown, onKeyUp, onFocus, onBlur, onChange, onInput, onClick, readOnly, disabled, name, id, className, placeholder, min, max } = props

    return (
        <TextareaInput
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
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onFocus={onFocus}
            onBlur={onBlur}
            min={min}
            max={max}
            className={`${className ? "textarea " + className : "textarea"}`}
        ></TextareaInput>
    )
}

const TextareaInput = styled.textarea`
    display       : block;
    min-height    : 50px;
    height        : 100px;
    max-height    : 300px;
    overflow-y    : auto;
    padding       : 8px;
    color         : var(--input-text);
    background    : var(--input);
    border-radius : var(--rounded-sm);
    border        : 1px solid var(--light-border);
    outline       : none;

    &:focus {
        border     : 1px solid var(--primary);
        box-shadow : none;
    }

    &:focus-visible {
        outline : none;
    }

    &::placeholder {
        color : var(--placeholder);
    }

    &.small {
        height : 60px;
    }

    &.full {
        flex-grow : 1;
        max-width : unset;
        input {
            flex-grow : 1;
        }
    }

    &::-webkit-scrollbar {
        width : 10px;
    }
    &::-webkit-scrollbar-track {
        background : transparent;
    }
    &::-webkit-scrollbar-thumb {
        background-color : var(--light-border);
        border           : 3px solid var(--content-light);
        border-radius    : 10px;
    }

    &::-webkit-scrollbar-corner {
        background : transparent;
    }
`

/**
 * 
 */

export const DynamicInput = (props) => {
    const { type, value, defaultValue, onKeyPress, onKeyDown, onKeyUp, onFocus, onBlur, min, max, onChange, onInput, onClick, readOnly, disabled, name, id, className, inputClassName, placeholder, text, startIcon, endIcon, endIconClick } = props
    return (
        <InputDynamic className={`${className ? 'dynamic-input ' + className : 'dynamic-input'}`}>
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
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                onFocus={onFocus}
                onBlur={onBlur}
                min={min}
                max={max}
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
        </InputDynamic>
    )
}

const InputDynamic = styled.div`
    position      : relative;
    display       : flex;
    align-items   : center;
    border-radius : var(--rounded-sm);

    input {
        display       : block;
        height        : 48px;
        padding       : 18px 20px 2px;
        color         : var(--input-text);
        outline       : none;
        background    : transparent;
        z-index       : 1;
        border-bottom : 1px solid var(--placeholder);

        &:placeholder-shown {
            + label {
                font-size  : 14px;
                transform  : translateY(-42%);
                color      : var(--placeholder);
                transition : .2s ease;
            }
        }

        &:focus {
            border-bottom : 2px solid var(--primary);
            box-shadow    : none;

            + label {
                position   : absolute;
                left       : 20px;
                top        : 50%;
                color      : var(--primary);
                transform  : translateY(-125%);
                font-size  : 11px;
                z-index    : 0;
                transition : .2s ease;
            }
        }
    }

    label {
        position   : absolute;
        left       : 20px;
        top        : 50%;
        color      : var(--placeholder);
        transform  : translateY(-125%);
        font-size  : 11px;
        z-index    : 0;
        transition : .2s ease;
    }

    .end-icon {
        position  : absolute;
        right     : 20px;
        top       : 50%;
        transform : translateY(-50%);
        z-index   : 2;
        cursor    : pointer;

        svg {
            color  : var(--placeholder);
            height : 20px;
            width  : 20px;
        }
    }

    &.succes {
        input {
            border-bottom : 2px solid var(--success);
            + label {
                color : var(--success);
            }
        }

        .end-icon {
            display : none;
        }
    }
    &.err {
        input {
            border-bottom : 2px solid var(--danger);
            + label {
                color : var(--danger);
            }
        }

        .end-icon {
            display : none;
        }
    }
`