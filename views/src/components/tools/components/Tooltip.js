// import React, { useState } from 'react'
// import { useEffect } from 'react'

// const Tooltip = (props) => {
//     const { text, open, className, onClick, clue, el } = props
//     const [left, setLeft] = useState()
//     const [top, setTop] = useState()
//     // const position = el.current.getBoundingClientRect()

//     // useEffect(() => {
//     //     setTop(position.top + 'px')
//     //     setLeft(position.left + 'px')
//     //     console.log(top, left)
//     // }, [position])

//     return (
//         open &&
//         <div
//             className={`${className ? `tooltip ` + className : "tooltip"}`}
//             // style={{ top: top, left: left }}
//             onClick={onClick}>
//             {text}
//         </div>
//     )
// }

// export default Tooltip