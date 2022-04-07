import React, { useRef } from 'react'
import { ErrorCard } from '../../../tools/components/Error'
import { CheckBox, NumberInput } from '../../../tools/components/Inputs'

const Contributors = ({ numberofcontributors, setNumberofcontributors, isErr, setErr, error, setError }) => {
    const errorRef = useRef()
    const checkErr = (name) => { if (isErr === name) return "err" }

    const checkErrors = () => {
        if (numberofcontributors < 0 || numberofcontributors === (null || undefined)) {
            setErr("numberofcontributors")
            setError("Veuillez sélectionner le nombre de personnes recherchées, si vous ne savez pas sélectionnez \"Je ne sais pas encore.")
        }
    }

    const setUndefined = () => {
        if (numberofcontributors !== 0) {
            setNumberofcontributors(0)
        } else { setNumberofcontributors(null) }
    }

    return (
        <>
            <p className="title mb-2">Nombre de personnes recherchées</p>
            <div className="flex items-center">
                <NumberInput className={`${checkErr("numberofcontributors")}`} placeholder="Nombre..." onChange={(e) => setNumberofcontributors(e.target.value)} value={numberofcontributors > 0 ? numberofcontributors : ""} />
                <div className="flex items-center">
                    <CheckBox className="ml-4 mr-2" checked={numberofcontributors === 0} onChange={setUndefined} name="number" htmlFor="number" />
                    <div>Je ne sais pas encore</div>
                </div>
            </div>
            {isErr === "numberofcontributors" && <ErrorCard useRef={errorRef} display={isErr === "numberofcontributors"} text={error} clean={() => setErr("")} />}
        </>
    )
}

export default Contributors