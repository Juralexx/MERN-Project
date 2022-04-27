import React from 'react'
import { DatePicker } from '../../tools/components/Inputs'

const End = ({ end, setEnd }) => {
    return (
        <div className="add-project-card">
            <h3>Date de fin ou de déroulement</h3>
            <div className="flex-card">
                <div className="card-left">
                    <p className="title">Date de fin potentielle</p>
                    <div className="content-form">
                        <DatePicker className="top mt-2" placeholder="JJ/MM/AAAA" value={end} selected={end} onSelect={setEnd} />
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