import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ThreeDots } from 'react-loading-icons'
import { ImCross } from 'react-icons/im'
import { HiPencilAlt } from 'react-icons/hi'
import { updateWorks } from "../../../../actions/project.action";
import { RoundedButton, Button } from "../../../tools/components/Button";
import { FaPen } from 'react-icons/fa'
import { BasicInput } from "../../../tools/components/Inputs";

const Work = ({ project }) => {
    const [workArray, setWorkArray] = useState(project.works);
    const [searchQuery, setSearchQuery] = useState("")
    const [number, setNumber] = useState("")
    const [numberFound, setNumberFound] = useState("")
    const [choice, setChoice] = useState("")

    const [worksFound, setWorksFound] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isResponse, setResponse] = useState(true)
    const [display, setDisplay] = useState(false)
    const isEmpty = !worksFound || worksFound.length === 0
    const [updateForm, setUpdateForm] = useState(false)
    const [openInputNumber, setOpenInputNumber] = useState(-1)
    const [openInputNumberFound, setOpenInputNumberFound] = useState(-1)
    const dispatch = useDispatch()
    const [value, setValue] = useState(false)
    const [modified, setModified] = useState(false)

    const hideUpdater = () => { setUpdateForm(false) }

    const handleWorks = () => {
        dispatch(updateWorks(project._id, workArray))
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
                    setWorkArray([...workArray, { name: choice, number: number, numberFound: numberFound }])
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
        !updateForm ? (
            <div className="flex items-center justify-between w-full py-5 px-7 border-b border-slate-500 dark:border-b-slate-300/30">
                    <div className="w-full">
                        {project.works.map((element, key) => {
                            return (
                                <div className="flex justify-between py-1 last:mb-5" key={key}>
                                    <div className="w-[85%]">{element.name}</div>
                                    <div className="w-[10%]">{element.numberFound}</div>
                                    <div className="w-[10%]">{element.number}</div>
                                </div>
                            )
                        })}
                    </div>
                <RoundedButton icon={<FaPen className="w-3 h-3" />} color="background_primary" hoverColor="background_primary_x_light" onClick={() => setUpdateForm(!updateForm)}>Modifier</RoundedButton>
            </div>
        ) : (
            <div className="relative flex flex-col items-center justify-between w-full py-5 px-7 border-b border-slate-500 dark:border-slate-100">
                {workArray &&
                    workArray.map((element, key) => {
                        return (
                            <div className="relative flex w-full" key={key}>
                                <div className="w-full">{element.name}</div>
                                <div className="flex w-[60px]">
                                    {openInputNumberFound === key ? (
                                        <>
                                            <BasicInput type="number" min="1" className="w-[40px]" onChange={(e) => setNumberFound(e.target.value)} defaultValue={element.numberFound} />
                                            <Button text="Annuler" onClick={() => setOpenInputNumberFound(-1)} />
                                            <Button text="Valider" onClick={() => modifyNumberFound(workArray, key, numberFound)} />
                                        </>
                                    ) : (
                                        <>
                                            {element.numberFound}
                                            <RoundedButton icon={<FaPen className="w-3 h-3" />} color="background_primary" hoverColor="background_primary_x_light" onClick={() => setOpenInputNumberFound(key)} />
                                        </>
                                    )}
                                </div>
                                <div className="flex w-[60px]">
                                    {openInputNumber === key ? (
                                        <>
                                            <BasicInput type="number" min="1" onChange={(e) => setNumber(e.target.value)} defaultValue={element.number} style={{ maxWidth: 100, maxHeight: 46, margin: "0 50px" }} />
                                            <button onClick={() => setOpenInputNumber(-1)}>Annuler</button>
                                            <button onClick={() => modifyNumber(workArray, key, number)}>Valider</button>
                                        </>
                                    ) : (
                                        <>
                                            {element.number}
                                            <RoundedButton icon={<FaPen className="w-3 h-3" />} color="background_primary" hoverColor="background_primary_x_light" onClick={() => setOpenInputNumber(key)}><HiPencilAlt /></RoundedButton>
                                        </>
                                    )}
                                </div>
                                <div><button onClick={() => deleteItem(key)}><ImCross /></button></div>
                            </div>
                        )
                    })}
                <div className="flex w-full mt-4">
                    <div className="w-full">
                        <BasicInput type="search" placeholder="Rechercher un métier" fullwidth value={searchQuery} onChange={handleInputChange} onKeyPress={searchWork} />
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
                    
                    <BasicInput type="number" min="1" onChange={(e) => { setNumber(e.target.value); setNumberFound("0") }} />
                    
                    {(choice !== "" && number !== "" && number !== "0") ? (
                        <Button text="Valider" onClick={checkIfOk} style={{ maxHeight: 46 }} />
                    ) : (
                        <Button text="Valider" disabled style={{ maxHeight: 46 }} />
                    )}

                </div>
                <p className="submit error"></p>
                <div className="flex">
                    <Button text="Annuler" onClick={hideUpdater} />
                    <Button text="Enregistrer" disabled={!value} onClick={handleWorks} />
                </div>
            </div>
        )
    )
}

export default Work;