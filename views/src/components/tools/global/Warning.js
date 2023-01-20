import React from 'react'
import styled from 'styled-components'
import { Button, TextButton } from '../global/Button'
import Icon from '../icons/Icon'

const Warning = (props) => {
    const { open, setOpen, css, title, text, cancelBtn, validateBtn, onValidate, onClose, className } = props

    const close = onClose ? () => {
        setOpen(false)
        onClose()
    } : () => setOpen(false)

    const validate = onValidate ? () => {
        setOpen(false)
        onValidate()
    } : () => setOpen(false)

    return (
        <>
            <ModalWrapper className={open ? "modal_wrapper" : "modal_wrapper hide_wrapper"}>
                <div className={open ? `modal_container warning_modal modal_container-active show_modal ${css ? css : null}` : 'modal_container warning_modal hide_modal'}>
                    <div className="close_modal" onClick={close}>
                        <Icon name="Cross" />
                    </div>
                    <div className="warning_title">{title}</div>
                    <div className="warning_text">{text}</div>
                    {props.children}
                    <div className="btn_container">
                        <TextButton className="mr-2" onClick={close}>
                            {cancelBtn || "Annuler"}
                        </TextButton>
                        <Button className={className ? className : ""} onClick={validate}>
                            {validateBtn || "Valider"}
                        </Button>
                    </div>
                </div>
            </ModalWrapper>
            <ModalCover className={open ? 'modal_cover modal_cover-active' : 'modal_cover'} onClick={close}></ModalCover>
        </>
    )
}

export default Warning

const ModalWrapper = styled.div`
    position        : fixed;
    top             : 0;
    right           : 0;
    bottom          : 0;
    left            : 0;
    visibility      : visible;
    z-index         : 100000000000;
    display         : flex;
    align-items     : center;
    backdrop-filter : blur(5px);

    &.hide_wrapper {
        visibility : hidden;
    }

    .modal_container {
        margin           : auto;
        width            : 500px;
        min-height       : 300px;
        max-height       : 70vh;
        padding          : 15px;
        color            : var(--text);
        background-color : var(--content-light);
        border-radius    : var(--rounded-sm);
        box-shadow       : var(--shadow-xl);
        z-index          : 100000000000;
        overflow         : hidden;
    
        h2 {
            margin-bottom : 10px;
            font-size     : 20px !important;
            font-weight   : 600;
        }
    
        &.hide_modal {
            opacity    : 0;
            visibility : hidden;
            transform  : scale(0.8);
            transition : visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
        }
    
        &.show_modal {
            opacity    : 1;
            visibility : visible;
            transform  : scale(1);
            transition : visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
        }
    
        .close_modal {
            position         : absolute;
            padding          : 5px;
            top              : 7px;
            right            : 5px;
            cursor           : pointer;
            border-radius    : 30px;
    
            svg {
                width  : 22px;
                height : 22px;
            }
    
            &:hover {
                background-color : var(--content-x-light);
            }
        }
    
        .modal_nav {
            display       : flex;
            min-width     : 100%;
            margin-bottom : 8px;
    
            .modal_nav-item {
                padding          : 4px 20px;
                margin-right     : 7px;
                cursor           : pointer;
                border-radius    : var(--rounded-sm);
                background-color : var(--light);

                &.active {
                    color            : var(--white);
                    background-color : var(--primary);
                }

                span {
                    font-size : 12px;
                    color     : var(--text-tertiary);
                    margin-left: 3px;
                }
            }
        }

        .btn-container {
            position        : relative;
            margin-top      : auto;
            display         : flex;
            justify-content : flex-end;
            margin-top      : 15px;
    
            button {
                width : 100%;
            }
        }

        &.warning_modal {
            max-width  : 480px;
            min-height : unset !important;

            .warning_title {
                font-size : 18px;
                width     : 90%;
            }

            .warning_text {
                padding : 20px 0;
                color   : var(--text-secondary);
            }

            .btn_container {
                margin-top : 10px;
                padding    : 0;
            }
        }
    }

    @media(max-width: 768px) {
        .modal_container {
            width : 85%;
        }
    }

    @media(max-width: 576px) {
        .modal_container {
            width         : 100vw;
            min-height    : 100vh;
            padding       : 30px 15px 100px;
            border-radius : 0;
            border        : none;
            .btn-container {
                position       : absolute;
                bottom         : 0;
                left           : 0;
                width          : 100%;
                flex-direction : column;
                padding        : 24px 15px;
                button {
                    width : 100%;
                    &:nth-child(1) {
                        margin-bottom : 10px;
                    }
                }
            }
        }
    }
`

const ModalCover = styled.div`
    display    : none;
    position   : fixed;
    top        : 0;
    bottom     : 0;
    left       : 0;
    right      : 0;
    background : var(--modal-cover);
    z-index    : 100000;

    &.modal_cover-active {
        display : block;
    }
`