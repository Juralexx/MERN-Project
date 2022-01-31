import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from 'react-loading-icons'
import { ImCross } from 'react-icons/im'
import { HiPencilAlt } from 'react-icons/hi'
import { updateWorks } from "../../../../actions/project.action";

const Work = ({ props, id }) => {
    const projectData = useSelector((state) => state.projectReducer)
    const [workArray, setWorkArray] = useState(props);
    const [searchQuery, setSearchQuery] = useState("")
    const [number, setNumber] = useState("")
    const [numberOfPeopleFound, setNumberOfPeopleFound] = useState("")
    const [choice, setChoice] = useState("")

    const [worksFound, setWorksFound] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isResponse, setResponse] = useState(true)
    const [display, setDisplay] = useState(false)
    const isEmpty = !worksFound || worksFound.length === 0
    const [updateForm, setUpdateForm] = useState(false)
    const [openInputNumber, setOpenInputNumber] = useState(false)
    const dispatch = useDispatch()
    const [value, setValue] = useState(false)
    const [modified, setModified] = useState(false)

    const hideUpdater = () => { setUpdateForm(false) }

    const handleWorks = () => {
        dispatch(updateWorks(id, workArray))
        setUpdateForm(false)
        setModified(true)
    }

    const setSelect = (e) => {
        setSearchQuery(e)
        setDisplay(false)
        setLoading(false)
    }

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const prepareSearchQuery = (query) => {
        const url = `${process.env.REACT_APP_API_URL}api/work/${query}`
        return encodeURI(url)
    }

    const searchWork = async () => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        setLoading(true)
        setDisplay(false)
        const URL = prepareSearchQuery(searchQuery)
        const response = await axios.get(URL).catch((err) => {
            console.log("Error: ", err)
        })

        if (response) {
            if (searchQuery.length >= 2) {
                setWorksFound(response.data)
                setDisplay(true)
                setResponse(true)
                if (worksFound.length === 0) {
                    setResponse(false)
                    setLoading(false)
                }
            } else { setLoading(false) }
        }
    }

    const checkIfOk = () => {
        if (choice !== "" && number !== "") {
            if (number === "0") {
                document.querySelector('.submit.error').innerHTML = "Le nombre de personnes recherchées ne peut pas être de 0"
            } else {
                if (JSON.stringify(workArray).includes(JSON.stringify(choice))) {
                    document.querySelector('.submit.error').innerHTML = "Vous avez déjà selectionné ce métier"
                } else {
                    setWorkArray([...workArray, { name: choice, number: number, numberFound: numberOfPeopleFound }])
                    setSearchQuery("")
                    setNumber("")
                    setValue(true)
                }
            }
        } else {
            document.querySelector('.submit.error').innerHTML = "Veuillez saisir une recherche"
        }
    }

    const deleteItem = (key) => {
        var storedArray = workArray.slice()
        storedArray.splice(key, 1)
        setWorkArray(storedArray)
    }

    function modifyNumber(array, index, newValue) {
        array[index].number = newValue;
        setOpenInputNumber(false)
        setValue(true)
    }

    function modifyNumberFound(array, index, newValue) {
        array[index].numberFound = newValue;
        setOpenInputNumber(false)
        setValue(true)
    }

    return (
        <div className="user-info" style={{ display: "flex", flexDirection: "column" }}>
            {!updateForm ? (
                <>
                    {modified ? (
                        <table style={{ display: "flex", flexDirection: "column" }}>
                            <tbody>
                                {projectData.works.map((element, key) => {
                                    return (
                                        <tr key={key}>
                                            <td >{element.name}</td>
                                            <td style={{ width: 100, textAlign: "center" }}>{element.numberFound}</td>
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
                                            <td style={{ width: 100, textAlign: "center" }}>{element.numberFound}</td>
                                            <td style={{ width: 100, textAlign: "center" }}>{element.number}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )}
                    <div className="btn-container">
                        <button className="btn btn-primary" onClick={() => setUpdateForm(!updateForm)}>Modifier</button>
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
                                            <td>{element.name}</td>
                                            <td style={{ minWidth: 100, display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                                                {openInputNumber ? (
                                                    <>
                                                        <input type="number" min="1" onChange={(e) => setNumberOfPeopleFound(e.target.value)} defaultValue={element.numberFound} style={{ maxWidth: 100, maxHeight: 46, margin: "0 50px" }} />
                                                        <button onClick={() => setOpenInputNumber(false)}>Annuler</button>
                                                        <button onClick={() => modifyNumberFound(workArray, key, numberOfPeopleFound)}>Valider</button>
                                                    </>
                                                ) : (
                                                    <>
                                                        {element.numberFound}
                                                        <button onClick={() => setOpenInputNumber(true)}><HiPencilAlt /></button>
                                                    </>
                                                )}
                                            </td>
                                            <td style={{ minWidth: 100, display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                                                {openInputNumber ? (
                                                    <>
                                                        <input type="number" min="1" onChange={(e) => setNumber(e.target.value)} defaultValue={element.number} style={{ maxWidth: 100, maxHeight: 46, margin: "0 50px" }} />
                                                        <button onClick={() => setOpenInputNumber(false)}>Annuler</button>
                                                        <button onClick={() => modifyNumber(workArray, key, number)}>Valider</button>
                                                    </>
                                                ) : (
                                                    <>
                                                        {element.number}
                                                        <button onClick={() => setOpenInputNumber(true)}><HiPencilAlt /></button>
                                                    </>
                                                )}
                                            </td>
                                            <td><button onClick={() => deleteItem(key)}><ImCross /></button></td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                    <div style={{ display: "flex" }}>
                        <div>
                            <input placeholder="Rechercher un métier" value={searchQuery} onChange={handleInputChange} onKeyPress={searchWork} type="search" style={{ minWidth: 500 }} />
                            {!isEmpty && display && isResponse && (
                                <ul tabIndex="0" style={{ display: searchQuery.length < 3 ? "none" : "block" }}>
                                    {worksFound.map((element) => {
                                        const chosenWork = `${element.appelation_metier}`;
                                        return (
                                            <li onClick={() => { setSelect(chosenWork); setChoice(chosenWork) }} key={element._id}>{chosenWork}</li>
                                        )
                                    })}
                                </ul>
                            )}
                            {isLoading && !display && (<div className="load-container"><ThreeDots /></div>)}
                            {!isResponse && !isLoading && (<div className="load-container"><p>Aucun resultat ne correspond à votre recherche</p></div>)}
                        </div>
                        <input type="number" min="1" onChange={(e) => {setNumber(e.target.value); setNumberOfPeopleFound("0")}} style={{ maxWidth: 100, maxHeight: 46, margin: "0 50px" }} />
                        {(choice !== "" && number !== "" && number !== "0") ? (
                            <button className="btn btn-primary" onClick={checkIfOk} style={{ maxHeight: 46 }}>Valider</button>
                        ) : (
                            <button className="btn btn-primary" disabled style={{ maxHeight: 46 }}>Valider</button>
                        )}
                    </div>
                    <p className="submit error"></p>
                    <div className="btn-container">
                        <button className="btn btn-primary" onClick={hideUpdater}>Annuler</button>
                        <button className="btn btn-primary" disabled={!value} onClick={handleWorks}>Enregistrer</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Work;