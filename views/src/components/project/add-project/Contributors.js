import React from 'react'
import { BasicInput } from '../../tools/components/Inputs';

const Contributors = ({ numberofcontributors, setNumberofcontributors, numberofcontributorsError }) => {
    return (
        <div className="mt-3 w-full py-5 px-7 rounded-xl bg-white dark:bg-background_primary shadow-xl text-gray-500 dark:text-slate-300">
            <h3 className="mb-5">Avez-vous besoin d'une équipe ?</h3>
            <p className="mb-2">Nombre de personne</p>
            <div className="relative w-full flex">
                <div className="w-[70px]">
                    <BasicInput
                        type="number"
                        min="1"
                        name="numberofcontributors"
                        id="numberofcontributors"
                        onChange={(e) => setNumberofcontributors(e.target.value)}
                        value={numberofcontributors}
                        className="w-[70px]"
                    />
                </div>
                <div class="flex items-center ml-4">
                    <div class="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" onClick={(e) => setNumberofcontributors("Non défini")} type="checkbox" class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                    </div>
                    <div class="ml-3 text-sm">
                        <label htmlFor="terms" className="font-medium text-gray-900 dark:text-gray-300">Je ne sais pas encore</label>
                    </div>
                </div>
            </div>
            <div className="error" ref={numberofcontributorsError}></div>
        </div>
    )
}

export default Contributors