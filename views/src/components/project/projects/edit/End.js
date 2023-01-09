import React from "react";
import { DatePicker } from "../../../tools/global/Inputs";

const End = ({ end, setEnd }) => {
    return (
        <div className="row">
            <div className="col-12 col-md-6">
                <p className="title full">Date de fin potentielle <span>Champ requis</span></p>
                <DatePicker
                    className="mt-2 full"
                    placeholder="JJ/MM/AAAA"
                    value={end}
                    selected={end}
                    onSelect={setEnd}
                />
            </div>
            <div className="col-12 col-md-6">
                <h3>Date de fin prévu (facultatif)</h3>
                <p>Vous recevrez des conseils quant au moment où les étapes qui durent plusieurs jours doivent être terminées.
                    Cette date reste modifiable jusqu'au moment où vous lancez votre projet (ce qui se fait manuellement).</p>
            </div>
        </div>
    )
}

export default End