import React, { useState, useRef } from 'react'
import axios from 'axios';
import { ClassicInput, NumberInput, Textarea } from '../../../tools/global/Inputs';
import { Button } from '../../../tools/global/Button';
import { SmallLoader } from '../../../tools/global/Loader';
import { BsInboxFill } from 'react-icons/bs';
import { ErrorCard } from '../../../tools/global/Error';
import { useClickOutside } from '../../../tools/hooks/useClickOutside';

const Works = ({ workArray, setWorkArray, isErr, setErr, error, setError }) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [worksFound, setWorksFound] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isResponse, setResponse] = useState(false)
    const [display, setDisplay] = useState(false)
    const isEmpty = worksFound.length === 0
    const wrapperRef = useRef()
    useClickOutside(wrapperRef, setDisplay, false)
    const errorRef = useRef()
    const checkErr = (name) => { if (isErr === name) return "err" }
    
    const searchWork = async () => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        else {
            const response = await axios.get(encodeURI(`${process.env.REACT_APP_API_URL}api/work/${searchQuery}`)).catch(err => console.error(err))
            if (response) {
                setWorksFound(response.data)
                setLoading(true)
                if (searchQuery.length > 2) {
                    setResponse(true)
                    setDisplay(true)
                    setLoading(true)
                    if (isEmpty) {
                        setResponse(false)
                        setLoading(false)
                    }
                } else {
                    setDisplay(false)
                    setLoading(false)
                }
            }
        }
    }

    const checkArrayErrors = (key) => {
        if (workArray[key].name === "" || workArray[key].number === (null || undefined)) {
            setErr(`work-${key}`)
            setError("Veuillez saisir un métier ou un nombre valide...")
        } else {
            if (workArray[key].number === 0) {
                setErr(`work-${key}`)
                setError("Le nombre de personnes recherchées ne peut pas être de 0")
            } else {
                if (JSON.stringify(workArray).includes(JSON.stringify(workArray[key].work))) {
                    setErr(`work-${key}`)
                    setError("Vous avez déjà sélectionné ce métier...")
                } else {
                    setWorkArray([...workArray, { name: "", number: "", numberFound: "", description: "" }])
                    setSearchQuery("")
                }
            }
        }
    }

    const handleWork = (value, key) => {
        let arr = [...workArray]
        arr[key].name = value
        setWorkArray(arr)
        setSearchQuery(value)
        setDisplay(false)
        setLoading(false)
    }

    const handleNumber = (value, key) => {
        let arr = [...workArray]
        arr[key].number = value
        setWorkArray(arr)
    }

    const handleDescription = (value, key) => {
        let arr = [...workArray]
        arr[key].description = value
        setWorkArray(arr)
    }

    const deleteItem = (key) => {
        let storedArray = [...workArray]
        storedArray.splice(key, 1)
        setWorkArray(storedArray)
    }

    return (
        workArray.length > 0 &&
        <div className="content-form mt-8">
            {workArray.map((element, key) => {
                return (
                    <div className="mb-4" key={key}>
                        <div className="header flex items-center mb-5">
                            <h3 className="mr-4">Métier n°{key + 1}</h3>
                            <Button text="Supprimer" onClick={() => deleteItem(key)} />
                            {key + 1 === workArray.length &&
                                <Button text="Rechercher un autre métier" className="ml-2" onClick={() => checkArrayErrors(key)} disabled={workArray[key].name === "" || workArray[key].number === ("" || 0 || null)} />
                            }
                        </div>
                        <div className="edit-work-form">
                            <div className="work-flex-content">
                                <div className="content-form">
                                    <p className="title full">Métier recherché</p>
                                    <ClassicInput className={`full ${checkErr(`work-${key}`)}`} type="text" placeholder="Rechercher un métier..." value={element.name} onInput={e => setSearchQuery(e.target.value)} onChange={searchWork} />
                                    <div tabIndex="0" className="auto-complete-container full custom-scrollbar" ref={wrapperRef} style={{ display: searchQuery.length < 3 || !display ? "none" : "block" }} >
                                        {!isEmpty && display && isResponse &&
                                            worksFound.map((element, key) => {
                                                const choice = element.appelation_metier;
                                                return (
                                                    <div className="auto-complete-item" onClick={() => handleWork(choice, key)} key={key}>{choice}</div>
                                                )
                                            })
                                        }
                                        {isLoading && isEmpty &&
                                            <SmallLoader />
                                        }
                                        {searchQuery.length > 2 && isEmpty && !isLoading &&
                                            <div className="no-result">
                                                <div><BsInboxFill /></div>
                                                <div>Aucun resultat ne correspond à votre recherche...</div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="content-form">
                                    <p className="title full">Trouvé</p>
                                    <NumberInput className={`full ${checkErr(`work-${key}`)}`} placeholder="Nombre..." value={element.number} onChange={e => handleNumber(e.target.value, key)} />
                                </div>
                                <div className="content-form">
                                    <p className="title full">Recherché</p>
                                    <NumberInput className={`full ${checkErr(`work-${key}`)}`} placeholder="Nombre..." value={element.number} onChange={e => handleNumber(e.target.value, key)} />
                                </div>
                            </div>
                            <div className="content-form mt-4">
                                <p className="title full">Description</p>
                                <Textarea className={`w-full ${checkErr(`work-${key}`)}`} type="text" placeholder="Pourquoi recherchez vous cette compétence ?" onChange={e => handleDescription(e.target.value, key)} value={element.description} />
                                <div className="field_infos full">
                                    {element.description && element.description.length} / 1000 caractères
                                </div>
                            </div>
                        </div>
                        {isErr === `work-${key}` && <ErrorCard useRef={errorRef} display={isErr === `work-${key}`} text={error} clean={() => setErr("")} />}
                    </div>
                )
            })}
        </div>
    )
}

export default Works