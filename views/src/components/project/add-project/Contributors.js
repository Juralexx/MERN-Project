import React from 'react'

const Contributors = ({ numberofcontributors, setNumberofcontributors, numberofcontributorsError }) => {
    return (
        <div className="add-numberofcontributors-bloc add-project-bloc">
            <h3>Avez-vous besoin d'une équipe ?</h3>
            <label htmlFor="numberofcontributors"><span>Nombre de personne dont vous avez besoin</span></label>
            <div className="number-container">
                <input type="number" min="1" name="numberofcontributors" id="numberofcontributors" onChange={(e) => setNumberofcontributors(e.target.value)} value={numberofcontributors} />
                <div className="undefined-choice">
                    <input type="checkbox" className="option-input" onClick={(e) => setNumberofcontributors("Non défini")} /> <label>Je ne sais pas encore</label>
                </div>
            </div>
            <div className="error" ref={numberofcontributorsError}></div>
        </div>
    )
}

export default Contributors