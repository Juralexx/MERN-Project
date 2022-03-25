import React from 'react'
import { ClassicInput } from '../../tools/components/Inputs'
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'
import { IconButton } from '../../tools/components/Button';

const End = ({ end, setEnd, onNext, onBack }) => {
    return (
        <div className="mt-3 w-full py-5 px-7 rounded-xl bg-white dark:bg-background_primary shadow-custom dark:shadow-lg text-gray-500 dark:text-slate-300">
            <h3 className="mb-5">Votre projet a-t-il une date de fin potentielle ?</h3>
            <p className="mb-2"><span>Date de fin potentielle</span></p>
            <div className="input-container">
                <ClassicInput
                    placeholder="Date"
                    type="date"
                    name="end"
                    id="end"
                    onChange={(e) => setEnd(e.target.value)} value={end}
                />
            </div>
            <div className="end error"></div>
            <div className="w-full flex justify-between mt-4 ">
                <IconButton text="Back" startIcon={<IoMdArrowRoundBack className="w-6 h-6" />} className="w-[90px]" onClick={onBack} />
                <IconButton text="Next" endIcon={<IoMdArrowRoundForward className="w-6 h-6" />} className="w-[90px]" onClick={onNext} />
            </div>
        </div>
    )
}

export default End