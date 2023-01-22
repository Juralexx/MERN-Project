import React, { useState, useRef } from 'react'
import axios from 'axios';
import { ClassicInput, Textarea } from '../tools/global/Inputs';
import { Button, TextButton } from '../tools/global/Button';
import Oval from '../tools/loaders/Oval'
import { ErrorCard } from '../tools/global/ErrorCard';
import Icon from '../tools/icons/Icon';
import { addClass, deleteItemFromArray, removeAccents, removeSpecialChars } from '../Utils';
import { useClickOutside } from '../tools/hooks/useClickOutside';

const Works = ({ datas, setDatas, error, setError }) => {
    const [search, setSearch] = useState({
        isSearching: false,
        key: 0,
        query: '',
        results: [],
        isLoading: false
    })

    const wrapperRef = useRef()
    useClickOutside(wrapperRef, () => setSearch(data => ({ ...data, isSearching: false, key: 0, results: [], isLoading: false })))

    const searchWork = async (key) => {
        if (!search.query || search.query.trim() === "") return
        if (search.query.length > 2) {
            setSearch(data => ({ ...data, isSearching: true, key: key, isLoading: true }))

            let timer
            clearTimeout(timer)
            timer = setTimeout(async () => {
                const response = await axios
                    .get(encodeURI(`${process.env.REACT_APP_API_URL}api/work/${search.query}`))
                    .catch(err => console.log("Error: ", err))

                if (response.data.length > 0)
                    setSearch(data => ({ ...data, results: response.data, isLoading: false }))
                else
                    setSearch(data => ({ ...data, results: [], isLoading: false }))
            }, 1000)
        } else {
            setSearch(data => ({ ...data, isSearching: false, key: 0, isLoading: false }))
        }
    }

    /**
     * 
     */

    const checkArrayErrors = (key) => {
        if (datas.works[key].name === "") {
            setError({
                element: `work-${key}`,
                error: "Veuillez saisir un métier ou un nombre valide..."
            })
        } else {
            if (JSON.stringify(datas.works).includes(JSON.stringify(datas.works[key].name))) {
                setError({
                    element: `work-${key}`,
                    error: "Vous avez déjà sélectionné ce métier..."
                })
            } else {
                setDatas(data => ({ ...data, works: [...datas.works, { name: "", description: "" }] }))
                setSearch(data => ({ ...data, query: '' }))
            }
        }
    }

    /**
     * 
     */

    const handleInput = (value, key) => {
        let arr = [...datas.works]
        arr[key].name = value
        setDatas(data => ({ ...data, works: arr }))
    }

    const handleWork = (value, key) => {
        let arr = [...datas.works]
        arr[key].name = value
        setDatas(data => ({ ...data, works: arr }))
        setSearch(data => ({ ...data, isSearching: false, query: '', key: 0 }))
    }

    const handleDescription = (value, key) => {
        let arr = [...datas.works]
        arr[key].description = value
        setDatas(data => ({ ...data, works: arr }))
    }

    /**
     * 
     */

    return (
        datas.works.length > 0 && (
            <div className="add-project-card">
                {datas.works.map((element, key) => {
                    return (
                        <div className="mb-4" key={key}>
                            <div className="header flex items-center mb-5">
                                <h4 className="mr-4 !mb-0">Métier n°{key + 1}</h4>
                                <TextButton
                                    onClick={() => setDatas(data => ({ ...data, works: deleteItemFromArray(datas.works, key) }))}
                                >
                                    Supprimer
                                </TextButton>
                                {key + 1 === datas.works.length &&
                                    <Button
                                        className="ml-2"
                                        onClick={() => checkArrayErrors(key)}
                                        disabled={datas.works[key].name === ""}
                                    >
                                        Rechercher un autre métier
                                    </Button>
                                }
                            </div>
                            <div className="work-form">
                                <p className="title full">Métier recherché</p>
                                <ClassicInput
                                    className={`full !max-w-[550px] ${addClass(error.element === `work-${key}`, 'err')}`}
                                    type="text"
                                    placeholder="Rechercher un métier..."
                                    value={element.name}
                                    onInput={searchWork}
                                    onChange={e => {
                                        setSearch(data => ({ ...data, query: e.target.value }))
                                        handleInput(e.target.value, key)
                                    }}
                                />
                                <div ref={wrapperRef}
                                    tabIndex="0"
                                    className="auto-complete-container full !max-w-[550px] custom-scrollbar"
                                    style={{ display: !search.isSearching || search.key !== key ? "none" : "block" }}
                                >
                                    {search.isSearching
                                        && search.key === key
                                        && search.results.length > 0
                                        && search.results.map((work, i) => {
                                            return (
                                                <div className="auto-complete-item" onClick={() => handleWork(work.appelation_metier, key)} key={i}>
                                                    {work.appelation_metier}
                                                </div>
                                            )
                                        })
                                    }
                                    {search.isLoading
                                        && search.results.length === 0
                                        && search.key === key && (
                                            <div className='py-4'>
                                                <Oval />
                                            </div>
                                        )}
                                    {search.isSearching
                                        && search.results.length === 0
                                        && !search.isLoading
                                        && search.key === key && (
                                            <div className="no-result">
                                                <Icon name="BoxEmpty" />
                                                <div>Aucun résultat ne correspond à votre recherche...</div>
                                            </div>
                                        )}
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
                            <ErrorCard
                                display={error.element === `work-${key}`}
                                text={error.error}
                                clean={() => setError({ element: "", error: "" })}
                            />
                        </div>
                    )
                })}
            </div>
        )
    )
}

export default Works