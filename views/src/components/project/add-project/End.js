import React from 'react'
import { DatePicker } from '../../tools/components/Inputs'

const End = ({ start, setStart, end, setEnd }) => {
    return (
        <div className="add-project-card">
            <h2>Date de fin ou de déroulement</h2>
            <div className="flex-card">
                <div className="card-left flex flex-col sm:flex-row">
                    <div>
                        <p className="title">Date de fin potentielle</p>
                        <DatePicker className="top" placeholder="JJ/MM/AAAA" value={start} selected={start} onSelect={setStart} />
                    </div>
                    <div className="mt-6 sm:mt-0 sm:ml-2">
                        <p className="title">Date de fin potentielle</p>
                        <DatePicker className="top" placeholder="JJ/MM/AAAA" value={end} selected={end} onSelect={setEnd} />
                    </div>
                </div>
                <div className="card-right">
                    <h3>Date de fin prévu (facultatif)</h3>
                    <p>Vous recevrez des conseils quant au moment où les étapes qui durent plusieurs jours doivent être terminées.
                        Cette date reste modifiable jusqu'au moment où vous lancez votre projet (ce qui se fait manuellement).</p>
                </div>
            </div>
        </div>
    )
}

export default End