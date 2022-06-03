import React, { useRef } from 'react'
import { ErrorCard } from '../../../tools/global/Error'
import { Textarea } from '../../../tools/global/Inputs'

const Description = ({ description, setDescription, error, setError, isErr, setErr }) => {
    const errorRef = useRef()
    const checkErr = (name) => { if (isErr === name) return "err" }

    return (
        <div className="content-form">
            <p className="title full">Courte description du projet <span>Champ requis</span></p>
            <Textarea className={`full ${checkErr("description")}`} type="text" placeholder="Courte description du projet" onChange={(e) => setDescription((e.target.value).substring(0, 300))} value={description} />
            <div className="field_infos full">{description.length} / 300 caractères</div>
            {isErr === "description" && <ErrorCard useRef={errorRef} display={isErr === "description"} text={error} clean={() => setErr("")} />}
        </div>
    )
}

export default Description