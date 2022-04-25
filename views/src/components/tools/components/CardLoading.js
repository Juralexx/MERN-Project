import React from 'react'
import { BsFillPeopleFill } from 'react-icons/bs'

const CardLoading = () => {
    return (
        <div className="card">
            <div className="card-img animate-pulse bg-slate-600"></div>
            <div className="card-body">
                <p className="animate-pulse bg-slate-600 h-4 w-full pb-2 mb-2 rounded-full"></p>
                <p className="animate-pulse bg-slate-600 h-4 w-full pb-2 mb-2 rounded-full"></p>
                <div className="flex justify-between items-center py-2">
                    <div className="flex items-center">
                        <BsFillPeopleFill />
                        <div className="animate-pulse bg-slate-600 h-5 w-7 ml-[8px] rounded-full"></div>
                    </div>
                    <div className="animate-pulse bg-slate-600 rounded-full w-[130px] h-5"></div>
                </div>
                <div className="animate-pulse bg-slate-600 h-[90px] w-full rounded-xl pb-2"></div>

                <div className="grid grid-cols-2 mt-3">
                    <div className="flex flex-col">
                        <div className="animate-pulse bg-slate-600 h-5 w-[110px] rounded-full"></div>
                        <div className="animate-pulse bg-slate-600 h-5 mt-2 w-[110px] rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-2 justify-end">
                        <div className="animate-pulse bg-slate-600 w-8 h-8 rounded-full ml-auto mr-2"></div>
                        <div className="w-full">
                            <div className="animate-pulse bg-slate-600 w-full h-5 rounded-full"></div>
                            <div className="animate-pulse bg-slate-600 w-full h-5 rounded-full mt-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardLoading