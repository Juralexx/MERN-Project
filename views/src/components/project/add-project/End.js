import React from 'react'
import { DatePicker } from '../../tools/components/Inputs'
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'
import { EndIconButton, StartIconButton } from '../../tools/components/Button';

const End = ({ end, setEnd, error, setError, isErr, setErr, onNext, onBack }) => {
    return (
        <div className="add-project-card">
            <h2>Votre projet a-t-il une date de fin potentielle ?</h2>
            <div className="flex-card">
                <div className="card-left">
                    <p className="title">Date de fin potentielle</p>
                    <div className="content-form">
                        <DatePicker className="mt-2" placeholder="JJ/MM/AAAA" value={end} selected={end} onSelect={setEnd} />
                    </div>
                </div>
                <div className="card-right">
                    <h3>Date de fin prévu (facultatif)</h3>
                    <p>Vous recevrez des conseils quant au moment où les étapes qui durent plusieurs jours doivent être terminées.
                        Cette date reste modifiable jusqu'au moment où vous lancez votre projet (ce qui se fait manuellement).</p>
                </div>
            </div>
            <div className="btn-container">
                <StartIconButton text="Retour" className="previous-btn" defaultValue={new Date()} icon={<IoMdArrowRoundBack />} onClick={onBack} />
                <EndIconButton text="Suivant" className="next-btn" icon={<IoMdArrowRoundForward />} onClick={onNext} />
            </div>
        </div>
    )
}

export default End