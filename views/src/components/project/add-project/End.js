import React from 'react'
import { BasicInput } from '../../tools/components/Inputs'

const End = ({ end, setEnd }) => {
    return (
        <div className="mt-3 w-full py-5 px-7 rounded-xl bg-white dark:bg-background_primary shadow-xl text-gray-500 dark:text-slate-300">
            <h3 className="mb-5">Votre projet a-t-il une date de fin potentielle ?</h3>
            <p className="mb-2"><span>Date de fin potentielle</span></p>
            <div className="input-container">
                <BasicInput
                    placeholder="Date"
                    type="date"
                    name="end"
                    id="end"
                    onChange={(e) => setEnd(e.target.value)} value={end}
                />
            </div>
            <div className="end error"></div>
        </div>
    )
}

export default End