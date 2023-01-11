import React, { useState, useRef } from 'react'
import axios from 'axios';
import { ClassicInput, Textarea } from '../../../tools/global/Inputs';
import { Button, TextButton } from '../../../tools/global/Button';
import Oval from '../../../tools/loaders/Oval'
import { ErrorCard } from '../../../tools/global/Error';
import { useClickOutside } from '../../../tools/hooks/useClickOutside';
import { addClass, removeSpecialChars } from '../../../Utils';
import Icon from '../../../tools/icons/Icon';

const Works = ({ workArray, setDatas, error, setError }) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [worksFound, setWorksFound] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [display, setDisplay] = useState({ state: false, key: 0 })
    const wrapperRef = useRef()
    useClickOutside(wrapperRef, () => setDisplay({ state: false, key: 0 }))

    const searchWork = async (key) => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        else {
            const response = await axios
                .get(encodeURI(`${process.env.REACT_APP_API_URL}api/work/${removeSpecialChars(searchQuery)}`))
                .then(res => res.data)
                .catch(err => console.error(err))
            if (response) {
                setWorksFound(response)
                setLoading(true)
                if (searchQuery.length > 4) {
                    setDisplay({ state: true, key: key })
                    setLoading(true)
                    if (worksFound.length === 0) {
                        setLoading(false)
                    }
                } else {
                    setDisplay({ state: false, key: 0 })
                    setLoading(false)
                }
            }
        }
    }

    const checkArrayErrors = () => {
        for (let i = 0; i < workArray.length; i++) {
            if (workArray[i].name === "") {
                setError({ element: `work-${i}`, error: "Veuillez saisir une compétence..." })
                break;
            } else {
                if (JSON.stringify(workArray).includes(JSON.stringify(workArray[i].work))) {
                    setError({ element: `work-${i}`, error: "Vous avez déjà sélectionné ce métier..." })
                    break;
                } else {
                    setDatas(data => ({ ...data, workArray: [...data.workArray, { name: "", description: "" }] }))
                    setSearchQuery("")
                    break;
                }
            }
        }
    }

    const handleInput = (value, key) => {
        let arr = [...workArray]
        arr[key].name = value
        setDatas(data => ({ ...data, workArray: arr }))
    }

    const handleWork = (value, key) => {
        let arr = [...workArray]
        arr[key].name = value
        setDatas(data => ({ ...data, workArray: arr }))
        setSearchQuery("")
        setDisplay({ state: false, key: 0 })
    }

    const handleDescription = (value, key) => {
        let arr = [...workArray]
        arr[key].description = value
        setDatas(data => ({ ...data, workArray: arr }))
    }

    const deleteItem = (key) => {
        let storedArray = [...workArray]
        storedArray.splice(key, 1)
        setDatas(data => ({ ...data, workArray: storedArray }))
    }

    return (
        workArray.length > 0 &&
        <div className="content-form mt-8">
            {workArray.map((element, key) => {
                return (
                    <div className="mb-4" key={key}>
                        <div className="header flex items-center mb-5">
                            <h4 className="mr-4">Compétence n°{key + 1}</h4>
                            <TextButton onClick={() => deleteItem(key)}>Supprimer</TextButton>
                        </div>
                        <div className="edit-work-form">
                            <div className="title full">Compétence recherchée</div>
                            <ClassicInput
                                className={`full ${addClass(error.element === `work-${key}`, 'err')}`}
                                type="text"
                                placeholder="Rechercher un métier..."
                                value={element.name}
                                onInput={() => searchWork(key)}
                                onChange={e => {
                                    setSearchQuery(e.target.value)
                                    handleInput(e.target.value, key)
                                }}
                            />
                            <div
                                ref={wrapperRef}
                                tabIndex="0"
                                className="auto-complete-container full custom-scrollbar"
                                style={{ display: searchQuery.length < 5 || !display.state ? "none" : "block" }}
                            >
                                {display.state && display.key === key && worksFound.length > 0 &&
                                    worksFound.map((work, i) => {
                                        return (
                                            <div
                                                className="auto-complete-item"
                                                onClick={() => { handleWork(work.appelation_metier, key); console.log('first') }}
                                                key={i}
                                            >
                                                {work.appelation_metier}
                                            </div>
                                        )
                                    })
                                }
                                {isLoading && worksFound.length === 0 && display.key === key &&
                                    <Oval />
                                }
                                {searchQuery.length > 4 && worksFound.length === 0 && !isLoading && display.key === key &&
                                    <div className="no-result">
                                        <Icon name="BoxEmpty" />
                                        <div>Aucun resultat ne correspond à votre recherche...</div>
                                    </div>
                                }
                            </div>
                            <div className="title full mt-4">Description</div>
                            <Textarea
                                className={`w-full ${addClass(error.element === `work-${key}`, 'err')}`}
                                type="text"
                                placeholder="Pourquoi recherchez vous cette compétence ?"
                                onChange={e => handleDescription(e.target.value, key)}
                                value={element?.description}
                            />
                            <div className="field_infos full">
                                {element.description?.length} / 1000
                            </div>
                        </div>
                        {error.element === `work-${key}` &&
                            <ErrorCard
                                display={error.element === `work-${key}`}
                                text={error.error}
                                clean={() => setError({ element: "", error: "" })}
                            />
                        }
                    </div>
                )
            })}

            <Button
                className="mt-5 mx-auto"
                onClick={() => checkArrayErrors()}
                disabled={workArray[workArray.length - 1].name === ""}
            >
                Rechercher un autre métier
            </Button>
        </div>
    )
}

export default Works