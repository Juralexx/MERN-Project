import React, { useState, useRef } from 'react'
import axios from 'axios';
import { ClassicInput, Textarea } from '../tools/global/Inputs';
import { Button, TextButton } from '../tools/global/Button';
import Oval from '../tools/loaders/Oval'
import { ErrorCard } from '../tools/global/Error';
import Icon from '../tools/icons/Icon';
import { addClass, deleteItemFromArray, removeAccents, removeSpecialChars } from '../Utils';
import { useClickOutside } from '../tools/hooks/useClickOutside';

const Works = ({ datas, setDatas, error, setError }) => {
    const [search, setSearch] = useState({ query: "", results: [] })
    const [isLoading, setLoading] = useState(false)

    const wrapperRef = useRef()
    const [display, setDisplay] = useState(false)
    useClickOutside(wrapperRef, () => setDisplay(false))

    const searchWork = async () => {
        if (!search.query || search.query.trim() === "") { return }
        else {
            const response = await axios
                .get(encodeURI(`${process.env.REACT_APP_API_URL}api/work/${search.query}`))
                .catch(err => console.error(err))
            if (response) {
                setSearch(data => ({ ...data, results: response.data }))
                setLoading(true)
                if (search.query.length > 2) {
                    setDisplay(true)
                    setLoading(true)
                    if (search.results.length === 0) {
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
        if (datas.workArray[key].name === "") {
            setError({
                element: `work-${key}`,
                error: "Veuillez saisir un métier ou un nombre valide..."
            })
        } else {
            if (JSON.stringify(datas.workArray).includes(JSON.stringify(datas.workArray[key].work))) {
                setError({
                    element: `work-${key}`,
                    error: "Vous avez déjà sélectionné ce métier..."
                })
            } else {
                setDatas(data => ({ ...data, workArray: [...datas.workArray, { name: "", description: "" }] }))
                setSearch(data => ({ ...data, query: '' }))
            }
        }
    }

    const handleWork = (value, key) => {
        let arr = [...datas.workArray]
        arr[key].name = value
        setDatas(data => ({ ...data, workArray: arr }))
        setSearch(data => ({ ...data, query: value }))
        setDisplay(false)
        setLoading(false)
    }

    const handleDescription = (value, key) => {
        let arr = [...datas.workArray]
        arr[key].description = value
        setDatas(data => ({ ...data, workArray: arr }))
    }

    return (
        datas.workArray.length > 0 && (
            <div className="add-project-card">
                {datas.workArray.map((element, key) => {
                    return (
                        <div className="mb-4" key={key}>
                            <div className="header flex items-center mb-5">
                                <h4 className="mr-4 !mb-0">Métier n°{key + 1}</h4>
                                <TextButton
                                    onClick={() => setDatas(data => ({ ...data, workArray: deleteItemFromArray(datas.workArray, key) }))}
                                >
                                    Supprimer
                                </TextButton>
                                {key + 1 === datas.workArray.length &&
                                    <Button
                                        className="ml-2"
                                        onClick={() => checkArrayErrors(key)}
                                        disabled={datas.workArray[key].name === ""}
                                    >
                                        Rechercher un autre métier
                                    </Button>
                                }
                            </div>
                            <div className="work-form">
                                <p className="title full">Métier recherché</p>
                                <ClassicInput
                                    className={`full ${addClass(error.element === `work-${key}`, 'err')}`}
                                    type="text"
                                    placeholder="Rechercher un métier..."
                                    value={element.name}
                                    onChange={searchWork}
                                    onInput={e => setSearch(data => ({ ...data, query: removeSpecialChars(removeAccents(e.target.value)) }))}
                                />
                                <div
                                    ref={wrapperRef}
                                    tabIndex="0"
                                    className="auto-complete-container full custom-scrollbar"
                                    style={{ display: search.query.length < 3 || !display ? "none" : "block" }}
                                >
                                    {search.results.length > 0 && display &&
                                        search.results.map((element, key) => {
                                            return (
                                                <div
                                                    className="auto-complete-item"
                                                    onClick={() => handleWork(element.appelation_metier, key)}
                                                    key={key}
                                                >
                                                    {element.appelation_metier}
                                                </div>
                                            )
                                        })
                                    }
                                    {isLoading && search.results.length === 0 &&
                                        <Oval />
                                    }
                                    {search.query.length > 2 && search.results.length === 0 && !isLoading &&
                                        <div className="no-result">
                                            <Icon name="BoxEmpty" />
                                            <div>Aucun resultat ne correspond à votre recherche...</div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <p className="title full mt-4">Description</p>
                            <Textarea
                                className={`w-full ${addClass(error.element === `work-${key}`, 'err')}`}
                                type="text"
                                placeholder="Pourquoi recherchez vous cette compétence ?"
                                value={element.description}
                                onChange={e => handleDescription(e.target.value, key)}
                            />
                            <div className="field_infos full">
                                {element.description.length} / 1000 caractères
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
            </div>
        )
    )
}

export default Works