import React, { useRef, useState } from "react";
import { ImArrowLeft2 } from 'react-icons/im'
import { useClickOutside } from "../tools/functions/useClickOutside";
import SettingsMenu from "./SettingsMenu";
// import ThemeToggle from "./theme/ThemeToggle";

const ScreenMenu = () => {
    const [isOpen, setOpen] = useState(true)
    const [isSettingsMenu, setSettingsMenu] = useState(false)
    const settingsWrapper = useRef()
    useClickOutside(settingsWrapper, setOpen, false)

    const classes = {
        li: "group flex justify-between items-center h-11 border-l-2 border-transparent cursor-pointer hover:bg-background_primary_x_light hover:border-l-2 hover:border-primary",
        li_left: "flex items-center pl-[10px] h-full w-auto",
        li_right: "flex items-center pr-[10px] h-full w-auto",
        svg: "w-9 h-9 p-2 rounded-full bg-background_primary_x_light text-slate-300 group-hover:bg-background_primary_light",
        p: "pl-[10px] font-xs text-slate-300"
    }

    return (
        <>
            {isOpen && (
                <div className="w-[270px] h-auto py-2 absolute bg-background_primary_light shadow-xl rounded-md top-[65px] right-4 z-[1100] before:content-[''] before:absolute before:w-0 before:h-0 border-10 border-background_primary_light before:right-9 before:top-[-19px]" ref={settingsWrapper}>
                    <div className="flex items-center px-[10px]">
                        <ImArrowLeft2 className={classes.svg} onClick={() => setSettingsMenu(true)} />
                        <h4 className="text-center w-full m-0 text-slate-300">Affichage</h4>
                    </div>
                    <ul className="p-0 m-0 list-none">
                        <li className={classes.li}>
                            {/* <ThemeToggle /> */}
                        </li>
                    </ul>
                </div>
            )}

            {isSettingsMenu && <SettingsMenu />}
        </>
    )

}

export default ScreenMenu;

// .switch {
//     position : relative;
//     display  : inline-block;
//     width    : 60px;
//     height   : 28px;
//     margin : 0 10px 0 0;

//     input { 
//         opacity : 0;
//         width   : 0;
//         height  : 0;

//         &:checked + .slider {
//             background-color : $primary-color;

//             &:before {
//                 transform : translateX(32px);
//             }
//         }

//         &:focus + .slider {
//             box-shadow : 0 0 1px #2196F3;
//         }
//     }

//     .slider {
//         position         : absolute;
//         cursor           : pointer;
//         top              : 0;
//         left             : 0;
//         right            : 0;
//         bottom           : 0;
//         background-color : #ccc;
//         transition       : .4s;

//         &:before {
//             position         : absolute;
//             content          : "";
//             height           : 20px;
//             width            : 20px;
//             left             : 4px;
//             bottom           : 4px;
//             background-color : white;
//             transition       : .4s;
//         }
//     }
// }
// .slider.round {
//     border-radius : 34px;

//     &:before {
//         border-radius : 50%;
//     }
// }