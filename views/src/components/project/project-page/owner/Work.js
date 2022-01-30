import React, { useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from 'react-loading-icons'
import { ImCross } from 'react-icons/im'
import { updateWorks } from "../../../../actions/project.action";

const Work = ({ props, id }) => {
    const projectData = useSelector((state) => state.projectReducer)
    const [workArray, setWorkArray] = useState(props);
    const [searchWorkQuery, setWorkSearchQuery] = useState("")
    const [workNumber, setWorkNumber] = useState("")
    const [choice, setChoice] = useState("")

    const [worksFound, setWorksFound] = useState([])
    const [isWorkLoading, setWorkLoading] = useState(false)
    const [isWorkResponse, setWorkResponse] = useState(true)
    const [displayWork, setDisplayWork] = useState(false)
    const isWorkEmpty = !worksFound || worksFound.length === 0
    const [updateWorkForm, setUpdateWorkForm] = useState(false)
    const wrapperRef = useRef()
    const dispatch = useDispatch()
    const [value, setValue] = useState(false)
    const [modified, setModified] = useState(false)

    const hideWorkUpdater = () => { setUpdateWorkForm(false) }

    const handleWorks = () => {
        dispatch(updateWorks(id, workArray))
        setUpdateWorkForm(false)
        setModified(true)
    }

    const setWorkSelect = (e) => {
        setWorkSearchQuery(e)
        setDisplayWork(false)
        setWorkLoading(false)
    }

    const handleWorkInputChange = (e) => {
        setWorkSearchQuery(e.target.value)
    }

    const prepareWorkSearchQuery = (query) => {
        const url = `${process.env.REACT_APP_API_URL}api/work/${query}`
        return encodeURI(url)
    }

    const searchWork = async () => {
        if (!searchWorkQuery || searchWorkQuery.trim() === "") { return }
        setWorkLoading(true)
        setDisplayWork(false)
        const URL = prepareWorkSearchQuery(searchWorkQuery)
        const response = await axios.get(URL).catch((err) => {
            console.log("Error: ", err)
        })

        if (response) {
            if (searchWorkQuery.length >= 2) {
                setWorksFound(response.data)
                setDisplayWork(true)
                setWorkResponse(true)
                if (worksFound.length === 0) {
                    setWorkResponse(false)
                    setWorkLoading(false)
                }
            } else { setWorkLoading(false) }
        }
    }

    const checkIfOk = () => {
        if (choice !== "" && workNumber !== "") {
            if (workNumber === "0") {
                document.querySelector('.submit.error').innerHTML = "Le nombre de personnes recherchées ne peut pas être de 0"
            } else {
                if (JSON.stringify(workArray).includes(JSON.stringify(choice))) {
                    document.querySelector('.submit.error').innerHTML = "Vous avez déjà selectionné ce métier"
                } else {
                    console.log(workArray)
                    setWorkArray([...workArray, { name: choice, number: workNumber }])
                    setWorkSearchQuery("")
                    setWorkNumber("")
                    setValue(true)
                    console.log(workArray)
                }
            }
        }
    }

    const deleteItem = (key) => {
        var storedArray = workArray.slice()
        storedArray.splice(key, 1)
        setWorkArray(storedArray)
    }

    return (
        <div className="user-info" style={{ display: "flex", flexDirection: "column" }}>
            {!updateWorkForm ? (
                <>
                    {modified ? (
                        <table style={{ display: "flex", flexDirection: "column" }}>
                            <tbody>
                                {projectData.works.map((element, key) => {
                                    return (
                                        <tr key={key}>
                                            <td >{element.name}</td>
                                            <td style={{ width: 100, textAlign: "center" }}>{element.number}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <table style={{ display: "flex", flexDirection: "column" }}>
                            <tbody>
                                {props.map((element, key) => {
                                    return (
                                        <tr key={key}>
                                            <td >{element.name}</td>
                                            <td style={{ width: 100, textAlign: "center" }}>{element.number}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )}
                    <div className="btn-container">
                        <button className="btn btn-primary" onClick={() => setUpdateWorkForm(!updateWorkForm)}>Modifier</button>
                    </div>
                </>
            ) : (
                <>
                    <table style={{ display: "flex", flexDirection: "column" }}>
                        <tbody>
                            {workArray &&
                                workArray.map((element, key) => {
                                    return (
                                        <tr key={key}>
                                            <td >{element.name}</td>
                                            <td style={{ width: 100, textAlign: "center" }}>{element.number}</td>
                                            <td><button onClick={() => deleteItem(key)}><ImCross /></button></td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                    <div style={{ display: "flex" }}>
                        <div>
                            <input placeholder="Rechercher un métier" value={searchWorkQuery} onChange={handleWorkInputChange} onKeyPress={searchWork} type="search" style={{ minWidth: 500 }} />
                            {!isWorkEmpty && displayWork && isWorkResponse && (
                                <ul tabIndex="0" style={{ display: searchWorkQuery.length < 3 ? "none" : "block" }}>
                                    {worksFound.map((element) => {
                                        const chosenWork = `${element.appelation_metier}`;
                                        return (
                                            <li onClick={() => { setWorkSelect(chosenWork); setChoice(chosenWork) }} key={element._id}>{chosenWork}</li>
                                        )
                                    })}
                                </ul>
                            )}
                            {isWorkLoading && !displayWork && (<div className="load-container"><ThreeDots /></div>)}
                            {!isWorkResponse && !isWorkLoading && (<div className="load-container"><p>Aucun resultat ne correspond à votre recherche</p></div>)}
                        </div>
                        <input type="number" min="1" onChange={(e) => setWorkNumber(e.target.value)} value={workNumber} style={{ maxWidth: 100, maxHeight: 46, margin: "0 50px" }} />
                        {(choice !== "" && workNumber !== "" && workNumber !== "0") ? (
                            <button className="btn btn-primary" onClick={checkIfOk} style={{ maxHeight: 46 }}>Valider</button>
                        ) : (
                            <button className="btn btn-primary" disabled style={{ maxHeight: 46 }}>Valider</button>
                        )}
                    </div>
                    <p className="submit error"></p>
                    <div className="btn-container">
                        <button className="btn btn-primary" onClick={hideWorkUpdater}>Annuler</button>
                        <button className="btn btn-primary" disabled={!value} onClick={handleWorks}>Enregistrer</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Work;