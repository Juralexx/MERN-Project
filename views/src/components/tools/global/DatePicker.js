import React, { useEffect, useRef, useState } from 'react'
import { DayPicker, useInput } from 'react-day-picker'
import fr from 'date-fns/locale/fr';
import styled from 'styled-components'
import Icon from '../icons/Icon';
import { useClickOutside } from '../hooks/useClickOutside'

export const DatePickerInput = (props) => {
    const { value, defaultValue, onKeyPress, onChange, onInput, disabled, className, inputClassName, placeholder, selected, onSelect } = props
    const [open, setOpen] = useState(false)
    const ref = useRef()
    useClickOutside(ref, () => setOpen(false))

    const { inputProps, dayPickerProps } = useInput({
        fromYear: 2020,
        toYear: 2022,
        format: 'dd/MM/yyyy',
        required: true
    })

    useEffect(() => { if (selected) setOpen(false) }, [selected])

    return (
        <DatePickerContainer className={`${className ? 'date-picker-container ' + className : 'date-picker-container'}`} ref={ref}>
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
            <Icon name="Calendar" />
            {open &&
                <DatePickerComponent className="datepicker">
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
                </DatePickerComponent>
            }
        </DatePickerContainer>
    )
}

export const DatePicker = (props) => {
    const { open, setOpen, selected, onDayClick } = props
    const ref = useRef()
    useClickOutside(ref, () => setOpen(prevSate => ({ ...prevSate, state: false })))

    const { dayPickerProps } = useInput({
        fromYear: 2010,
        toYear: 2030,
        format: 'dd/MM/yyyy ',
        required: true
    })

    return (
        open && (
            <DatePickerWrapper className='datepicker-wrapper'>
                <DatePickerComponent className="datepicker" ref={ref}>
                    <DayPicker
                        {...dayPickerProps}
                        mode="single"
                        selected={selected}
                        onDayClick={onDayClick}
                        locale={fr}
                        modifiersClassNames={{
                            selected: 'selected',
                            today: 'today'
                        }}
                    />
                </DatePickerComponent>
            </DatePickerWrapper>
        )
    )
}

const DatePickerComponent = styled.div`
    position      : absolute;
    background    : var(--input);
    border-radius : var(--rounded-sm);
    z-index       : 700;
    box-shadow : var(--shadow-lg);

    .rdp {
        .selected {
            background-color : var(--primary);
            border-radius    : 5px;
            border           : none;
            outline          : none;
        }

        .today {
            background-color : var(--x-light);
            border-radius    : 10px;
        }

        .rdp-button {
            &:hover, &:focus {
                background-color : var(--primary);
                border           : none;
                border-radius    : var(--rounded-md);
                color            : var(--white);
            }
        }

        .rdp-caption_label {
            margin  : 0;
            padding : 5px;
        }

        .rdp-nav {
            display : flex;

            .rdp-nav_button_previous, .rdp-nav_button_next {
                display       : flex;
                align-items   : center;
                background    : var(--light);
                border-radius : 5px;
                margin        : 0 3px;
                transform     : scale(1);

                svg {
                    bottom : unset;
                    right  : unset;
                }

                &:hover {
                    background-color : rgba(var(--primary-rgb), 0.8);
                    svg {
                        color : var(--white);
                    }
                }

                &:active {
                    transform  : scale(0.9);
                    box-shadow : none;
                }
            }
        }

        h2 {
            &:before, &:after {
                content : none;
                display : none;
            }
        }
    }
`

const DatePickerWrapper = styled.div`
    position        : fixed;
    top             : 0;
    right           : 0;
    bottom          : 0;
    left            : 0;
    overflow-x      : hidden;
    overflow-y      : auto;
    visibility      : visible;
    z-index         : 100000000000;
    display         : flex;
    align-items     : center;

    .datepicker {
        top       : 50%;
        left      : 50%;
        transform : translate(-50%, -50%);
        z-index   : 1000000000000;
    }
`

const DatePickerContainer = styled.div`
    position      : relative;
    cursor        : pointer;
    width         : 180px;
    background    : var(--content-x-light);
    border-radius : var(--rounded-sm);

    input {
        display       : block;
        height        : 44px;
        width         : 100%;
        padding       : 8px;
        color         : var(--input-text);
        background    : var(--input);
        border-radius : var(--rounded-sm);
        border        : 1px solid var(--light-border);
        outline       : none;
        cursor        : pointer;

        &:focus {
            border     : 1px solid var(--primary);
            box-shadow : none;
        }

        &::placeholder {
            color : var(--placeholder);
        }
    }

    svg {
        position : absolute;
        height   : 18px;
        width    : 18px;
        bottom   : 12px;
        right    : 12px;
    }

    .datepicker {
        top       : 50px;
        left      : 50%;
        transform : translateX(-50%);
    }

    &.top {
        .datepicker {
            top    : unset;
            bottom : 50px;
        }
    }

    @media(max-width: 768px) {
        .datepicker {
            position  : fixed;
            top       : 50%;
            left      : 50%;
            transform : translate(-50%, -50%);
        }
    }
`