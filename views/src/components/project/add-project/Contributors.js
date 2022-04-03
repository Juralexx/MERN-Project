import React, { useState, useRef } from 'react'
import axios from 'axios';
import { ClassicInput, NumberInput, CheckBox } from '../../tools/components/Inputs';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'
import { EndIconButton, SmallToolsBtn, StartIconButton, ToolsBtn } from '../../tools/components/Button';
import { SmallLoader } from '../../tools/components/Loader';
import { ImCross } from 'react-icons/im';
import { BsCheckLg, BsInboxFill } from 'react-icons/bs';
import { ErrorCard } from '../../tools/components/Error';

const Contributors = ({ numberofcontributors, setNumberofcontributors, workArray, setWorkArray, isErr, setErr, error, setError, onNext, onBack }) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [number, setNumber] = useState(0)
    const [work, setWork] = useState("")
    const [worksFound, setWorksFound] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isResponse, setResponse] = useState(false)
    const [display, setDisplay] = useState(false)
    const isEmpty = worksFound.length === 0
    const wrapperRef = useRef()
    const errorRef = useRef()
    const checkErr = (name) => { if (isErr === name) return "err" }

    const setSelect = (value) => { setSearchQuery(value); setDisplay(false); setLoading(false) }

    const searchWork = async () => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        else {
            const response = await axios.get(encodeURI(`${process.env.REACT_APP_API_URL}api/work/${searchQuery}`)).catch(err => console.error(err))
            if (response) {
                setWorksFound(response.data)
                if (searchQuery.length > 2) {
                    setDisplay(true)
                    if (isEmpty) {
                        setLoading(true)
                        setResponse(false)
                    } else {
                        setLoading(false)
                        setResponse(true)
                    }
                } else {
                    setResponse(false)
                    setLoading(true)
                }
            }
        }
    }

    const checkArrayErrors = () => {
        if (work === "" || number === (null || undefined)) {
            setErr("work")
            setError("Veuillez saisir un métier ou un nombre valide...")
        } else {
            if (number === 0) {
                setErr("work")
                setError("Le nombre de personnes recherchées ne peut pas être de 0")
            } else {
                if (JSON.stringify(workArray).includes(JSON.stringify(work))) {
                    setErr("work")
                    setError("Vous avez déjà sélectionné ce métier...")
                } else {
                    setWorkArray([...workArray, { name: work, number: number, numberFound: "0" }])
                    setSearchQuery("")
                    setNumber("")
                }
            }
        }
    }

    const checkErrors = () => {
        if (numberofcontributors < 0 || numberofcontributors === (null || undefined)) {
            setErr("numberofcontributors")
            setError("Veuillez sélectionner le nombre de personnes recherchées, si vous ne savez pas sélectionnez \"Je ne sais pas encore.")
        } else {
            onNext()
        }
    }

    const deleteItem = (key) => {
        let storedArray = workArray.slice()
        storedArray.splice(key, 1)
        setWorkArray(storedArray)
    }

    const setUndefined = () => {
        if (numberofcontributors !== 0) {
            setNumberofcontributors(0)
        } else { setNumberofcontributors(null) }
    }

    return (
        <div className="add-project-card">
            <h2>Avez-vous besoin d'une équipe ?</h2>
            <p className="mb-2">Nombre de personnes recherchées</p>
            <div className="content-form flex items-center">
                <NumberInput className={`${checkErr("numberofcontributors")}`} placeholder="Nombre..." onChange={(e) => setNumberofcontributors(e.target.value)} value={numberofcontributors > 0 ? numberofcontributors : ""} />
                <div className="flex items-center">
                    <CheckBox className="ml-4 mr-2" checked={numberofcontributors === 0} onChange={setUndefined} name="number" htmlFor="number" />
                    <div>Je ne sais pas encore</div>
                </div>
            </div>
            {isErr === "numberofcontributors" && <ErrorCard useRef={errorRef} display={isErr === "numberofcontributors"} text={error} />}
            <div className="content-form mt-8">
                <h2>Recherchez-vous des compétences particulière ?</h2>
                <div className="label">Métier(s) recherché(s)</div>
                <div className="works-table">
                    <div className="works-table-content">
                        {workArray &&
                            workArray.map((element, key) => {
                                return (
                                    <div className="works-table-item" key={key}>
                                        <div>{(key + 1) + ". " + element.name}</div>
                                        <div>{element.number}</div>
                                        <div><SmallToolsBtn onClick={() => deleteItem(key)}><ImCross /></SmallToolsBtn></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="searchbar">
                        <ClassicInput className={`search-input ${checkErr("work")}`} type="text" placeholder="Rechercher un métier..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onInput={searchWork} />
                        <div tabIndex="0" className="auto-complete-container custom-scrollbar" ref={wrapperRef} style={{ display: searchQuery.length < 3 || !display ? "none" : "block" }} >
                            {!isEmpty && isResponse && (
                                worksFound.map((element, key) => {
                                    const choice = `${element.appelation_metier}`;
                                    return (
                                        <div className="auto-complete-item" onClick={() => { setSelect(choice); setWork(choice) }} key={key}>{choice}</div>
                                    )
                                })
                            )}
                            {(!isEmpty && isLoading) && (
                                <SmallLoader />
                            )}
                            {searchQuery.length > 2 && isEmpty && (
                                <div className="no-result">
                                    <div><BsInboxFill /></div>
                                    <div>Aucun resultat ne correspond à votre recherche...</div>
                                </div>
                            )}
                        </div>

                        <NumberInput placeholder="Nombre..." value={number} onChange={(e) => setNumber(e.target.value)} />
                        <ToolsBtn text="Valider" disabled={work.length !== "" && (number < 0 || number === 0 || number === (null || undefined))} onClick={checkArrayErrors}><BsCheckLg /></ToolsBtn>
                    </div>
                    {isErr === "work" && <ErrorCard useRef={errorRef} display={isErr === "work"} text={error} />}
                </div>
            </div>
            <div className="btn-container">
                <StartIconButton text="Retour" className="previous-btn" icon={<IoMdArrowRoundBack />} onClick={onBack} />
                <EndIconButton text="Suivant" disabled={workArray.length === 0 && numberofcontributors === (undefined || null)} className="next-btn" icon={<IoMdArrowRoundForward />} onClick={checkErrors} />
            </div>
        </div>
    )
}

export default Contributors