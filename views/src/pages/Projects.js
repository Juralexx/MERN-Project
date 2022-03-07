import React, { useState } from 'react'
import { BsFillDiagram3Fill, BsFillCaretRightFill } from 'react-icons/bs'
import { GoThreeBars } from 'react-icons/go'
import { avatar } from '../components/tools/functions/useAvatar'

const Projects = () => {
    const [reduce, setReduce] = useState(false)

    return (
        <div className="w-[100%] h-[100vh] bg-background_light dark:bg-background_primary">
            <div className={`${reduce ? "w-[80px]" : "w-[300px]"} h-[100%] relative bg-white dark:bg-background_primary_light`}>
                <div className={`${reduce ? "justify-center py-5" : "justify-between py-3"} w-full flex items-center px-4 bg-[#FBFCFF] dark:bg-background_primary_x_light`}>
                    <div className={`${reduce ? "hidden" : "flex"} items-center`}>
                        <div className="flex items-center justify-center dark:bg-background_primary_light rounded-full p-2">
                            <BsFillDiagram3Fill className="h-5 w-5" />
                        </div>
                        <p className="text-[16px] font-semibold ml-3">Mes Projets</p>
                    </div>
                    <div className="cursor-pointer" onClick={() => setReduce(!reduce)}>
                        <GoThreeBars className="h-5 w-5" />
                    </div>
                </div>
                <div className="w-full h-full py-3">

                    <div className="w-full px-2 py-1">
                        <div className={`${reduce ? "justify-center" : "justify-between"} flex items-center px-4 py-3 dark:hover:bg-background_primary_x_light rounded-lg cursor-pointer`}>
                            <div className="flex items-center">
                                <div className="h-7 w-7 rounded-full" style={avatar('img/paysage-2.jpg')}></div>
                                <div className={`${reduce ? "hidden" : "flex"} text-[16px] pl-3`}>Nom du projet</div>
                            </div>
                            <div className={`${reduce ? "hidden" : "flex"}`}><BsFillCaretRightFill /></div>
                        </div>
                    </div>
                    <div className="w-full px-2 py-1">
                        <div className={`${reduce ? "justify-center" : "justify-between"} flex items-center px-4 py-3 dark:hover:bg-background_primary_x_light rounded-lg cursor-pointer`}>
                            <div className="flex items-center">
                                <div className="h-7 w-7 rounded-full" style={avatar('img/paysage-4.jpg')}></div>
                                <div className={`${reduce ? "hidden" : "flex"} text-[16px] pl-3`}>Nom du projet</div>
                            </div>
                            <div className={`${reduce ? "hidden" : "flex"}`}><BsFillCaretRightFill /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Projects