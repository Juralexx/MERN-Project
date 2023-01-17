import React, { useEffect, useState } from 'react'
import { DatePickerInput } from '../tools/global/Inputs'

const End = ({ datas, setDatas }) => {
    const [start, setStart] = useState(datas.start)
    const [end, setEnd] = useState(datas.end)

    useEffect(() => {
        if (start !== datas.start)
            setDatas(data => ({ ...data, start: start }))
        if (end !== datas.end)
            setDatas(data => ({ ...data, end: end }))
    }, [start, end, datas, setDatas])

    return (
        <div className="add-project-card">
            <h4>Date de fin ou de déroulement</h4>
            <div className="row py-4">
                <div className="col-12 col-lg-6 flex flex-col justify-center">
                    <h3>Date de fin prévu (facultatif)</h3>
                    <p>
                        Vous recevrez des conseils quant au moment où les étapes qui durent plusieurs jours doivent être terminées.
                        Cette date reste modifiable jusqu'au moment où vous lancez votre projet (ce qui se fait manuellement).
                    </p>
                </div>
                <div className="col-12 col-lg-6 flex flex-col justify-center !mt-4 lg:!mt-0">
                    <div className="mb-4">
                        <p className="title">Date de début</p>
                        <DatePickerInput
                            className="top !w-full"
                            placeholder="JJ/MM/AAAA"
                            value={datas.start}
                            selected={datas.start}
                            onSelect={setStart}
                        />
                    </div>
                    <div>
                        <p className="title">Date de fin</p>
                        <DatePickerInput
                            className="top !w-full"
                            placeholder="JJ/MM/AAAA"
                            value={datas.end}
                            selected={datas.end}
                            onSelect={setEnd}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default End