import React, { useRef } from 'react'
import { ErrorCard } from '../../../tools/components/Error'
import { ClassicInput } from '../../../tools/components/Inputs'

const Title = ({ title, setTitle, isErr, error }) => {
    const errorRef = useRef()
    const checkErr = (name) => { if (isErr === name) return "err"}

    return (
        <>
            <div className="content-form">
                <p className="title full">Titre <span>Champ requis</span></p>
                <ClassicInput className={`full ${checkErr("title")}`} type="text" placeholder="Titre du projet" onChange={(e) => setTitle(e.target.value)} value={title} />
                <div className="field-infos full">{title.length} / 100 caractères</div>
                {isErr === "title" && <ErrorCard useRef={errorRef} display={(isErr === "title").toString()} text={error} />}
            </div>
        </>
    )
}

export default Title