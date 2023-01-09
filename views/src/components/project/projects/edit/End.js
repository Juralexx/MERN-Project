import React, { useEffect, useState } from "react";
import { DatePicker } from "../../../tools/global/Inputs";

const End = ({ end, setDatas }) => {
    const [date, setDate] = useState(end)

    useEffect(() => { if (date !== end) setDatas(data => ({ ...data, end: date })) }, [date, end, setDatas])

    return (
        <div className="row">
            <div className="col-12 col-lg-6">
                <h3>Date de fin prévu <span>- facultatif</span></h3>
                <p>
                    Vous recevrez des conseils quant au moment où les étapes qui durent plusieurs jours doivent être terminées.
                    Cette date reste modifiable jusqu'au moment où vous lancez votre projet (ce qui se fait manuellement).
                </p>
            </div>
            <div className="col-12 col-lg-6">
                <div className="title full">Date de fin potentielle</div>
                <DatePicker
                    className="mt-2 full"
                    placeholder="JJ/MM/AAAA"
                    value={end}
                    selected={end}
                    onSelect={setDate}
                />
            </div>
        </div>
    )
}

export default End