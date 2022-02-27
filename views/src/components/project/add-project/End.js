import React from 'react'

const End = ({ end, setEnd }) => {
    return (
        <div className="add-end-bloc add-project-bloc">
            <h3>Votre projet a-t-il une date de fin potentielle ?</h3>
            <label htmlFor="end"><span>Date de fin potentielle</span></label>
            <div className="input-container">
                <input type="date" name="end" id="end" onChange={(e) => setEnd(e.target.value)} value={end} />
            </div>
            <div className="end error"></div>
        </div>
    )
}

export default End