import React from 'react'
import { DatePicker } from '../../tools/components/Inputs'
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'
import { EndIconButton, StartIconButton } from '../../tools/components/Button';

const End = ({ end, setEnd, error, setError, isErr, setErr, onNext, onBack }) => {
    return (
        <div className="add-project-card">
            <h2>Votre projet a-t-il une date de fin potentielle ?</h2>
            <p className="mb-2">Date de fin potentielle</p>
            <div className="content-form">
                <DatePicker className="top mt-2" placeholder="JJ/MM/AAAA" value={end} selected={end} onSelect={setEnd} />
            </div>
            <div className="btn-container">
                <StartIconButton text="Retour" className="next-btn" defaultValue={new Date()} icon={<IoMdArrowRoundBack />} onClick={onBack} />
                <EndIconButton text="Suivant" className="previous-btn" icon={<IoMdArrowRoundForward />} onClick={onNext} />
            </div>
        </div>
    )
}

export default End