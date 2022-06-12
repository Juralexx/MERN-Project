import React from 'react'

const MobToolsMenu = () => {
    const { className, btnClassName, disabled, onClick } = props
    const [open, setOpen] = useState(false)
    const ref = useRef()
    useClickOutside(ref, setOpen, false)

    return (
        <div ref={ref} className={`${className ? "mobile-menu " + className : "mobile-menu"}`} onClick={onClick}>
            {open &&
                <div className="mobile-menu-tools" onClick={() => setOpen(false)}>
                    {props.children}
                </div>
            }
            {props.target ? (
                <div onClick={() => setOpen(!open)}>
                    {props.target}
                </div>
            ) : (
                <button className={`${btnClassName ? "tools_btn " + btnClassName : "tools_btn"}`} disabled={disabled} onClick={() => setOpen(!open)}>
                    <BiDotsHorizontalRounded />
                </button>
            )}
        </div>
    )
}

export default MobToolsMenu