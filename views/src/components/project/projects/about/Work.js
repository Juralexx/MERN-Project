import React, { useState, useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ImCross } from 'react-icons/im'
import { BsCheckLg } from 'react-icons/bs'
import { updateWorks } from "../../../../actions/project.action";
import { Button, SmallToolsBtn, ToolsBtn } from "../../../tools/components/Button";
import { FaPen } from 'react-icons/fa'
import { ClassicInput } from "../../../tools/components/Inputs";
import { BsInboxFill } from "react-icons/bs";
import { SmallLoader } from "../../../tools/components/Loader";

const Work = ({ project }) => {
    const [workArray, setWorkArray] = useState(project.works);
    const [searchQuery, setSearchQuery] = useState("")
    const [number, setNumber] = useState("")
    const [numberFound, setNumberFound] = useState("")
    const [work, setWork] = useState("")
    const wrapperRef = useRef()

    const [worksFound, setWorksFound] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isResponse, setResponse] = useState(true)
    const [display, setDisplay] = useState(false)
    const isEmpty = !worksFound || worksFound.length === 0
    const [form, setForm] = useState(false)
    const dispatch = useDispatch()

    const handleWorks = () => {
        dispatch(updateWorks(project._id, workArray))
        setForm(false)
    }

    const setSelect = (value) => {
        setSearchQuery(value)
        setDisplay(false)
        setLoading(false)
    }

    const searchWork = async () => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        else {
            const response = await axios.get(encodeURI(`${process.env.REACT_APP_API_URL}api/work/${searchQuery}`)).catch((err) => { console.log("Error: ", err) })
            if (response) {
                setWorksFound(response.data)
                setLoading(true)
                if (searchQuery.length > 2) {
                    setResponse(true)
                    setDisplay(true)
                    if (isEmpty) {
                        setResponse(false)
                        setLoading(false)
                        setDisplay(false)
                    }
                } else { setDisplay(false) }
            }
        }
    }

    const checkErrors = () => {
        if (work !== "" && number !== "") {
            if (number === 0) {
                document.querySelector('.submit.error').innerHTML = "Le nombre de personnes recherchées ne peut pas être de 0"
            } else {
                if (JSON.stringify(workArray).includes(JSON.stringify(work))) {
                    document.querySelector('.submit.error').innerHTML = "Vous avez déjà selectionné ce métier"
                } else {
                    setWorkArray([...workArray, { name: work, number: number, numberFound: numberFound }])
                    setSearchQuery("")
                    setNumber("")
                }
            }
        } else {
            document.querySelector('.submit.error').innerHTML = "Veuillez saisir une recherche"
        }
    }

    const deleteItem = (key) => {
        let storedArray = workArray.slice()
        storedArray.splice(key, 1)
        setWorkArray(storedArray)
    }

    console.log(work, number)

    return (
        <div className="dashboard-about-content-item">
            <div className="flex items-center">
                <div className="label">Métier(s) recherché(s)</div>
                {!form && <SmallToolsBtn className="ml-4" onClick={() => setForm(true)}><FaPen /></SmallToolsBtn>}
            </div>
            <div className="dashboard-about-array">
                <div className="dashboard-about-array-header">
                    <div className="dashboard-about-array-header-item">Nom</div>
                    <div className="dashboard-about-array-header-item">Trouvé</div>
                    <div className="dashboard-about-array-header-item">Recherché</div>
                </div>
                <div className="dashboard-about-array-content">
                    {!form ? (
                        project.works.map((element, key) => {
                            return (
                                <div className="dashboard-about-array-item" key={key}>
                                    <div>{element.name}</div>
                                    <div>{element.numberFound}</div>
                                    <div>{element.number}</div>
                                </div>
                            )
                        })
                    ) : (
                        <>
                            {workArray &&
                                <>
                                    {workArray.map((element, key) => {
                                        return (
                                            <div className="dashboard-about-array-item" key={key}>
                                                <div>{element.name}</div>
                                                <div><ClassicInput type="number" min="1" onChange={(e) => setNumberFound(e.target.value)} defaultValue={element.numberFound} /></div>
                                                <div><ClassicInput type="number" min="1" onChange={(e) => setNumber(e.target.value)} defaultValue={element.number} /></div>
                                                <div><SmallToolsBtn onClick={() => deleteItem(key)}><ImCross /></SmallToolsBtn></div>
                                            </div>
                                        )
                                    })}
                                    <div className="dashboard-about-array-picker">
                                        <div className="searchbar">
                                            <ClassicInput className="search-input" type="search" placeholder="Rechercher un métier..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyPress={searchWork} />
                                            <div tabIndex="0" className="auto-complete-container custom-scrollbar" ref={wrapperRef} style={{ display: searchQuery.length < 3 || !display ? "none" : "block" }} >
                                                {!isEmpty && display && isResponse && (
                                                    worksFound.map((element, key) => {
                                                        const choice = `${element.appelation_metier}`;
                                                        return (
                                                            <div className="auto-complete-item" onClick={() => { setSelect(choice); setWork(choice) }} key={key}>{choice}</div>
                                                        )
                                                    })
                                                )}
                                                {(isLoading || (!isEmpty && !display && isLoading)) && (
                                                    <SmallLoader />
                                                )}
                                                {!isResponse && !isLoading && searchQuery.length > 2 && isEmpty && (
                                                    <div className="no-result">
                                                        <div><BsInboxFill /></div>
                                                        <div>Aucun resultat ne correspond à votre recherche...</div>
                                                    </div>
                                                )}
                                            </div>

                                            <ClassicInput className="number-input" type="number" placeholder="Nombre..." min="1" onChange={(e) => { setNumber(e.target.value); setNumberFound("0") }} />
                                            <ToolsBtn text="Valider" disabled={work.length < 0} onClick={checkErrors}><BsCheckLg /></ToolsBtn>
                                        </div>

                                        <p className="submit error"></p>
                                        {/* <div className="flex">
                                            <Button text="Annuler" onClick={() => setForm(false)} />
                                            <Button text="Enregistrer" disabled={!value} onClick={handleWorks} />
                                        </div> */}
                                    </div>
                                </>
                            }
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Work;