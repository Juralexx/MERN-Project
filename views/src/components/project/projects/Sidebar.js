import React, { useState } from 'react'
import { reduceString } from '../../tools/functions/reduceString'
import { MdOutlineMessage, MdGroups } from 'react-icons/md'
import { BsFillDiagram3Fill, BsFillCaretRightFill } from 'react-icons/bs'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { GoThreeBars } from 'react-icons/go'
import { avatar } from '../../tools/functions/useAvatar'
import { useEffect } from 'react'

const Sidebar = ({ user, projects, setProject, changeProject, isLoading }) => {
    const [reduce, setReduce] = useState(false)
    const [submenu, setSubmenu] = useState(-1)
    const openSubmenu = (key) => { if (submenu !== key) { setSubmenu(key) } else { setSubmenu(-1) } }
    const [hoverCard, setHoverCard] = useState(-1)
    const localStore = localStorage.getItem("sideState")

    const handleState = () => {
        if (!reduce) {
            localStorage.setItem("sideState", "closed");
            setReduce(true)
        } else {
            localStorage.setItem("sideState", "open");
            setReduce(false)
        }
    }

    useEffect(() => {
        if (!isLoading) {
            if (localStore !== null && localStore === "closed") {
                setReduce(true)
            } else if (localStore !== null && localStore === "closed") {
                setReduce(false)
            } else {
                localStorage.setItem("sideState", "open");
            }
        }
    }, [isLoading, localStore])

    return (
        <div className={`${reduce ? "w-[80px]" : "min-w-[300px]"} relative h-full bg-white dark:bg-background_primary_light shadow-left dark:shadow-left_dark z-[1500]`}>
            <div className={`${reduce ? "justify-center py-5" : "justify-between py-3"} mb-3 w-full flex items-center px-4 text-white bg-primary_light dark:text-slate-300 dark:bg-background_primary_x_light`}>
                <div className={`${reduce ? "hidden" : "flex"} items-center`}>
                    <div className="flex items-center justify-center p-2 bg-primary dark:bg-background_primary_light rounded-full">
                        <BsFillDiagram3Fill className="h-5 w-5" />
                    </div>
                    <p className="text-[16px] font-semibold ml-3">Mes Projets ({projects.length})</p>
                </div>
                <div className="cursor-pointer" onClick={handleState}>
                    <GoThreeBars className="h-5 w-5" />
                </div>
            </div>
            {!isLoading ? (
                projects.map((element, key) => {
                    return (
                        <div className="w-full px-2 py-1" key={key}>
                            <div onClick={() => { openSubmenu(key); changeProject(element) }} onMouseEnter={() => setHoverCard(key)} onMouseLeave={() => setHoverCard(-1)} className={`${reduce ? "justify-center" : "justify-between"} relative flex items-center px-4 py-3 text-gray-500 dark:text-gray-300 hover:text-white hover:bg-primary_light dark:hover:bg-background_primary_x_light rounded-lg cursor-pointer`}>
                                <div className="flex items-center">
                                    <div className="h-7 w-7 rounded-full ring-4 ring-white dark:ring-background_primary_light" style={avatar('img/paysage-4.jpg')}></div>
                                    <div className={`${reduce ? "hidden" : "flex"} text-[16px] pl-3`}>{reduceString(element.title, 24)}</div>
                                </div>
                                <div className={`${reduce ? "hidden" : "flex"}`}><BsFillCaretRightFill /></div>
                                {reduce && hoverCard === key && (
                                    <div className="absolute left-[115%] min-w-[200px] max-w-[300px] top-1/2 translate-y-[-50%] w-auto py-3 px-5 rounded-xl bg-background_primary_x_light">
                                        <div className="text-[16px]">{element.title}</div>
                                    </div>
                                )}
                            </div>
                            {!reduce && submenu === key && (
                                <div className="w-full pl-5 pr-2 py-1">
                                    <div className="border-l-2 border-slate-300/50 ml-2">
                                        <div className={`${reduce ? "hidden" : "flex"} justify-start items-center text-[16px] px-4 py-3 ml-2 text-gray-500 dark:text-gray-300 hover:text-white hover:bg-primary_light dark:hover:bg-background_primary_x_light rounded-lg cursor-pointer`}>
                                            <MdOutlineMessage className="w-5 h-5 mr-2 dark:text-slate-300 group-hover:text-primary" />
                                            Messenger
                                        </div>
                                    </div>
                                    <div className="border-l-2 border-slate-300/50 ml-2">
                                        <div className={`${reduce ? "hidden" : "flex"} justify-start items-center text-[16px] px-4 py-3 ml-2 text-gray-500 dark:text-gray-300 hover:text-white hover:bg-primary_light dark:hover:bg-background_primary_x_light rounded-lg cursor-pointer`}>
                                            <MdGroups className="w-5 h-5 mr-2 dark:text-slate-300 group-hover:text-primary" />
                                            Équipe
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })
            ) : (
                [...Array(5)].map((element, key) => {
                    return (
                        <div className="w-full h-[60px] flex items-center px-4 py-3 cursor-pointer" key={key}>
                            <div className="flex justify-between items-center w-full">
                                <div className="animate-pulse bg-slate-700 min-h-[28px] min-w-[28px] rounded-full"></div>
                                <div className={`animate-pulse bg-slate-700 ${reduce ? "hidden" : "flex"} h-[26px] w-full mx-2 rounded-full`}></div>
                            </div>
                            <div className={`${reduce ? "hidden" : "flex"}`}><BsFillCaretRightFill /></div>
                        </div>
                    )
                })
            )}
            {user &&
                <div className={`absolute bottom-0 flex items-center ${reduce ? "pl-3 justify-center" : "pl-5 justify-between"} py-4 pr-3 w-full h-auto text-white bg-primary_light dark:text-gray-300 dark:bg-background_primary_x_light`}>
                    <div className="flex items-center">
                        <div className="h-7 w-7 rounded-full" style={avatar(user.picture)}></div>
                        <div className={`${reduce ? "hidden" : "flex"} text-[16px] pl-3`}>{user.pseudo}</div>
                    </div>
                    <div className={`${reduce ? "hidden" : "flex"} p-2 rounded-full hover:bg-primary dark:hover:bg-background_primary_light`}>
                        <BiDotsVerticalRounded className="h-5 w-5 cursor-pointer" />
                    </div>
                </div>
            }
        </div>
    )
}

export default Sidebar