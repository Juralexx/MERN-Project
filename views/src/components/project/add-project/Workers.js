import React, { useState, useRef } from 'react'
import axios from 'axios'
import { ThreeDots } from 'react-loading-icons'
import { ImCross } from 'react-icons/im'
import { ClassicInput } from '../../tools/components/Inputs';
import { Button } from '../../tools/components/Button';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'
import { IconButton } from '../../tools/components/Button';

const Workers = ({ workArray, setWorkArray, onNext, onBack }) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [workNumber, setWorkNumber] = useState("")
    const [choice, setChoice] = useState("")
    const [worksFound, setWorksFound] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isWorkResponse, setWorkResponse] = useState(true)
    const [display, setDisplay] = useState(false)
    const isEmpty = !worksFound || worksFound.length === 0
    const wrapperRef = useRef()

    const setWorkSelect = (e) => {
        setSearchQuery(e)
        setDisplay(false)
        setLoading(false)
    }

    const handleWorkInputChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const prepareWorkSearchQuery = (query) => {
        const url = `${process.env.REACT_APP_API_URL}api/work/${query}`
        return encodeURI(url)
    }

    const searchWork = async () => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        setLoading(true)
        setDisplay(false)
        const URL = prepareWorkSearchQuery(searchQuery)
        const response = await axios.get(URL).catch((err) => {
            console.log("Error: ", err)
        })
        if (response) {
            if (searchQuery.length >= 2) {
                setWorksFound(response.data)
                setDisplay(true)
                setWorkResponse(true)
                if (worksFound.length === 0) {
                    setWorkResponse(false)
                    setLoading(false)
                }
            } else { setLoading(false) }
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
                    setWorkArray([...workArray, { name: choice, number: workNumber }])
                    setSearchQuery("")
                    setWorkNumber("")
                }
            }
        }
    }

    const deleteItem = (key) => {
        let storedArray = workArray.slice()
        storedArray.splice(key, 1)
        setWorkArray(storedArray)
    }

    return (
        <div className="mt-3 w-full py-5 px-7 rounded-xl bg-white dark:bg-background_primary shadow-custom dark:shadow-lg text-gray-500 dark:text-slate-300">
            <h3 className="mb-5">De qui avez vous besoin ?</h3>
            <div>
                {workArray &&
                    workArray.map((works, key) => {
                        return (
                            <div className="flex justify-between py-1 last:mb-5" key={key}>
                                <div className="w-[85%]">{works.name}</div>
                                <div className="w-[10%]">{works.number}</div>
                                <button onClick={() => deleteItem(key)}><ImCross /></button>
                            </div>
                        )
                    })
                }
            </div>
            <p className="mb-2">Métier</p>
            <div className="flex">
                <div className="w-full relative">
                    <ClassicInput
                        type="search"
                        placeholder="Rechercher un métier"
                        value={searchQuery}
                        fullwidth
                        className="h-[42px]"
                        onChange={handleWorkInputChange}
                        onKeyPress={searchWork}
                    />
                    {!isEmpty && display && isWorkResponse && (
                        <div ref={wrapperRef} tabIndex="0" className="absolute z-10 overflow-auto max-h-[250px] bg-white dark:bg-background_primary_light" style={{ display: searchQuery.length < 3 ? "none" : "block" }}>
                            {worksFound.map((element) => {
                                const chosenWork = `${element.appelation_metier}`;
                                return (
                                    <div
                                        className="flex items-center px-4 py-2 text-gray-500 dark:text-slate-300 border-l-2 border-l-transparent hover:border-l-primary hover:bg-slate-100 dark:hover:bg-background_primary_x_light cursor-pointer"
                                        onClick={() => { setWorkSelect(chosenWork); setChoice(chosenWork) }} key={element._id}
                                    >
                                        {chosenWork}
                                    </div>
                                )
                            })}
                        </div>
                    )}
                    {isLoading && !display && <div className="load-container"><ThreeDots /></div>}
                    {!isWorkResponse && !isLoading && <div className="load-container"><p>Aucun resultat ne correspond à votre recherche</p></div>}
                </div>
                <ClassicInput
                    className="w-[70px] h-[42px] mx-2"
                    text="nombre"
                    type="number"
                    min="1"
                    onChange={(e) => setWorkNumber(e.target.value)}
                    value={workNumber}
                />
                {(choice !== "" && workNumber !== "" && workNumber !== "0") ? (
                    <Button text="Valider" onClick={checkIfOk} style={{ maxHeight: 46 }} />
                ) : (
                    <Button text="Valider" disabled style={{ maxHeight: 46 }} />
                )}
            </div>
            <p className="submit error"></p>
            <div className="w-full flex justify-between mt-4 ">
                <IconButton text="Back" startIcon={<IoMdArrowRoundBack className="w-6 h-6" />} className="w-[90px]" onClick={onBack} />
                <IconButton text="Next" endIcon={<IoMdArrowRoundForward className="w-6 h-6" />} className="w-[90px]" onClick={onNext} />
            </div>
        </div>
    )
}

export default Workers