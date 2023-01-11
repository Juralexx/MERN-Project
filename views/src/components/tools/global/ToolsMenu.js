import React, { useState, useRef, useEffect } from 'react'
import { useClickOutside } from '../hooks/useClickOutside'
import useMediaQuery from '../hooks/useMediaQuery'
import { usePopper } from "react-popper";
import { useLongPress } from '../hooks/useLongPress';
import { addClass } from '../../Utils'
import Icon from '../icons/Icon';

const ToolsMenu = (props) => {
    const { className, btnClassName, disabled, onClick, placement, mobile, mobileFull } = props
    const [open, setOpen] = useState(false)
    const ref = useRef()
    useClickOutside(ref, () => setOpen(false))
    const xs = useMediaQuery('(max-width: 576px)')

    const popperElRef = useRef(null);
    const [targetElement, setTargetElement] = useState(null);
    const [popperElement, setPopperElement] = useState(popperElRef.current);
    // const [arrowElement, setArrowElement] = useState(null);

    const { styles, attributes } = usePopper(targetElement, popperElement, {
        placement: placement || "left-start",
        modifiers: [
            // {
            //     name: "offset",
            //     options: {
            //         offset: [0, 0]
            //     }
            // },
            // {
            //     name: 'arrow',
            //     options: {
            //         element: arrowElement,
            //         padding: 10,
            //     },
            // }
        ]
    })

    useEffect(() => {
        if (!mobileFull) {
            if (open)
                setPopperElement(popperElRef.current)
        } else {
            if (!xs)
                if (open)
                    setPopperElement(popperElRef.current)
        }
    }, [open, mobileFull, xs])

    const longPressProps = useLongPress({
        onClick: () => !xs ? setOpen(!open) : {},
        onLongPress: () => xs ? setOpen(true) : {},
    })

    return (
        !mobile ? (
            <div ref={ref} className={`${className ? "tools_box " + className : "tools_box"}`} onClick={onClick}>
                <div className={`tools_menu ${addClass(open, 'active')}`} onClick={() => setOpen(false)}
                    ref={popperElRef}
                    style={styles.popper}
                    {...attributes.popper}
                >
                    {props.children}

                    {/* <div className="menu-arrow" ref={setArrowElement} style={styles.arrow} data-popper-arrow></div> */}
                </div>
                {props.target ? (
                    <div ref={setTargetElement} onClick={() => setOpen(!open)}>
                        {props.target}
                    </div>
                ) : (
                    <button className={`${btnClassName ? "tools_btn " + btnClassName : "tools_btn"} ${addClass(open, 'active')}`} ref={setTargetElement} disabled={disabled} onClick={() => setOpen(!open)}>
                        <Icon name="ThreeDots" />
                    </button>
                )}
            </div>
        ) : (
            !xs ? (
                <div ref={ref} className={`${className ? "tools_box " + className : "tools_box"}`} onClick={onClick}>
                    <div className={`tools_menu ${addClass(open, 'active')}`} onClick={() => setOpen(false)}
                        ref={popperElRef}
                        style={styles.popper}
                        {...attributes.popper}
                    >
                        {props.children}

                        {/* <div className="menu-arrow" ref={setArrowElement} style={styles.arrow} data-popper-arrow></div> */}
                    </div>
                    {props.target ? (
                        <div ref={setTargetElement} onClick={() => setOpen(!open)}>
                            {props.target}
                        </div>
                    ) : (
                        <button className={`${btnClassName ? "tools_btn " + btnClassName : "tools_btn"} ${addClass(open, 'active')}`} ref={setTargetElement} disabled={disabled} onClick={() => setOpen(!open)}>
                            <Icon name="ThreeDots" />
                        </button>
                    )}
                </div>
            ) : (
                <div ref={ref} className={`${className ? (mobileFull ? "tools_box mobile-full" + className : "tools_box " + className) : (mobileFull ? "tools_box mobile-full" : "tools_box")}`} onClick={onClick}>
                    <div className={`mobile-menu ${addClass(open, 'active')}`}>
                        <div className="mobile-menu-tools" onClick={() => setOpen(false)}>
                            {props.children}
                        </div>
                    </div>
                    {props.target ? (
                        <div onClick={() => setOpen(!open)}>
                            {props.target}
                        </div>
                    ) : (
                        !mobileFull ? (
                            <button className={`${btnClassName ? "tools_btn " + btnClassName : "tools_btn"} ${addClass(open, 'active')}`} disabled={disabled} onClick={() => setOpen(!open)}>
                                <Icon name="ThreeDots" />
                            </button>
                        ) : (
                            <button className={`${btnClassName ? "tools_btn " + btnClassName : "tools_btn"}`} disabled={disabled} {...longPressProps}></button>
                        )
                    )}
                </div>
            )
        )
    )
}

export default ToolsMenu