import React, { useState } from 'react'
import { DatePicker } from '../tools/global/DatePicker'
import { ErrorCard } from '../tools/global/ErrorCard'
import { IconInput } from '../tools/global/Inputs'
import Icon from '../tools/icons/Icon'
import { addClass, addOneDay, dateParser, diffBetweenDatesNegativeIfLess } from '../Utils'

const End = ({ datas, setDatas, error, setError }) => {
    const [date, setDate] = useState('')
    const [nav, setNav] = useState(1)

    return (
        <div className="add-project-card">
            <h3>Date de fin ou de déroulement</h3>
            <div className="row py-4">
                <div className="col-12 col-lg-6">
                    <h4>Date de fin prévu (facultatif)</h4>
                    <p>
                        Vous recevrez des conseils quant au moment où les étapes qui durent plusieurs jours doivent être terminées.
                        Cette date reste modifiable jusqu'au moment où vous lancez votre projet (ce qui se fait manuellement).
                    </p>
                </div>
                <div className="col-12 col-lg-6 !mt-10 lg:!mt-0">
                    <div className="content_nav">
                        <div className={addClass(nav === 1, 'active')} onClick={() => setNav(1)}>
                            Date
                        </div>
                        <div className={addClass(nav === 2, 'active')} onClick={() => setNav(2)}>
                            Période
                        </div>
                    </div>
                    {nav === 1 ? (
                        <>
                            <p className="title">Date de déroulement</p>
                            <IconInput
                                className="is_start_icon"
                                inputClassName="!cursor-pointer"
                                type="text"
                                readOnly
                                placeholder="Date de déroulement"
                                icon={<Icon name="Calendar" />}
                                onClick={() => setDate('day')}
                                value={datas.day !== '' ? dateParser(datas.day) : ''}
                                onChange={e => setDatas(data => ({ ...data, day: e.target.value }))}
                                cross
                                onClean={() => setDatas(data => ({ ...data, day: '' }))}
                            />
                            <DatePicker
                                open={date === 'day'}
                                setOpen={setDate}
                                selected={new Date(datas.day)}
                                onDayClick={date => {
                                    setDate('')
                                    setDatas(data => ({ ...data, day: date.toISOString(), start: '', end: '' }))
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <p className="title">Date de début</p>
                            <IconInput
                                className="is_start_icon mb-3"
                                inputClassName="!cursor-pointer"
                                type="text"
                                readOnly
                                placeholder="Date de début"
                                icon={<Icon name="Calendar" />}
                                onClick={() => setDate('start')}
                                value={datas.start !== '' ? dateParser(datas.start) : ''}
                                onChange={e => setDatas(data => ({ ...data, start: e.target.value }))}
                                cross
                                onClean={() => setDatas(data => ({ ...data, start: '' }))}
                            />
                            <DatePicker
                                open={date === 'start'}
                                setOpen={setDate}
                                selected={new Date(datas.start)}
                                onDayClick={date => {
                                    setDate('')
                                    setDatas(data => ({ ...data, start: date.toISOString(), day: '' }))
                                }}
                            />
                            <p className="title">Date de fin</p>
                            <IconInput
                                className="is_start_icon"
                                inputClassName="!cursor-pointer"
                                type="text"
                                readOnly
                                placeholder="Date de fin"
                                icon={<Icon name="Calendar" />}
                                onClick={() => setDate('end')}
                                value={datas.end !== '' ? dateParser(datas.end) : ''}
                                onChange={e => setDatas(data => ({ ...data, end: e.target.value }))}
                                cross
                                onClean={() => setDatas(data => ({ ...data, end: '' }))}
                            />
                            <DatePicker
                                open={date === 'end'}
                                setOpen={setDate}
                                selected={new Date(datas.end)}
                                onDayClick={date => {
                                    setDate('')
                                    setDatas(data => ({
                                        ...data,
                                        day: '',
                                        end: diffBetweenDatesNegativeIfLess(datas.start, date) <= 0 ? addOneDay(datas.start) : date.toISOString()
                                    }))
                                }}
                            />
                            <ErrorCard
                                display={error.element === "end"}
                                text={error.error}
                                clean={() => setError({ element: "", error: "" })}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default End