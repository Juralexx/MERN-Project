import React, { useState, useRef } from 'react'
import axios from 'axios';
import Icon from '../../tools/icons/Icon';
import { ClassicInput, Textarea } from '../../tools/global/Inputs';
import { Button, TextButton } from '../../tools/global/Button';
import Oval from '../../tools/loaders/Oval'
import { ErrorCard } from '../../tools/global/ErrorCard';
import { useClickOutside } from '../../tools/hooks/useClickOutside';
import { addClass, deleteItemFromArray } from '../../Utils';

const Works = ({ works, setDatas, error, setError }) => {
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

    const checkArrayErrors = () => {
        for (let i = 0; i < works.length; i++) {
            if (works[i].name === "") {
                setError({ element: `work-${i}`, error: "Veuillez saisir une compétence..." })
                break;
            } else {
                if (JSON.stringify(works).includes(JSON.stringify(works[i].name))) {
                    setError({ element: `work-${i}`, error: "Vous avez déjà sélectionné ce métier..." })
                    break;
                } else {
                    setDatas(data => ({ ...data, works: [...data.works, { name: "", description: "" }] }))
                    setSearch(data => ({ ...data, query: '' }))
                    break;
                }
            }
        }
    }

    /**
     * 
     */

    const handleInput = (value, key) => {
        let arr = [...works]
        arr[key].name = value
        setDatas(data => ({ ...data, works: arr }))
    }

    const handleWork = (value, key) => {
        let arr = [...works]
        arr[key].name = value
        setDatas(data => ({ ...data, works: arr }))
        setSearch(data => ({ ...data, isSearching: false, query: '', key: 0 }))
    }

    const handleDescription = (value, key) => {
        let arr = [...works]
        arr[key].description = value
        setDatas(data => ({ ...data, works: arr }))
    }

    /**
     * 
     */

    return (
        works.length > 0 && (
            <div className="content-form mt-8">
                {works.map((element, key) => {
                    return (
                        <div className="mb-4" key={key}>
                            <div className="header flex items-center mb-5">
                                <h4 className="mr-4">Compétence n°{key + 1}</h4>
                                <TextButton onClick={() => setDatas(data => ({ ...data, workArray: deleteItemFromArray(works, key) }))}>
                                    Supprimer
                                </TextButton>
                            </div>
                            <div className="edit-work-form">
                                <div className="title full">Compétence recherchée</div>
                                <ClassicInput
                                    className={`full !max-w-[550px] ${addClass(error.element === `work-${key}`, 'err')}`}
                                    type="text"
                                    placeholder="Rechercher un métier..."
                                    value={element.name}
                                    onInput={() => searchWork(key)}
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
                            <ErrorCard
                                display={error.element === `work-${key}`}
                                text={error.error}
                                clean={() => setError({ element: "", error: "" })}
                            />
                        </div>
                    )
                })}

                <Button
                    className="mt-5 mx-auto"
                    onClick={() => checkArrayErrors()}
                    disabled={works[works.length - 1].name === ""}
                >
                    Ajouter une autre compétence
                </Button>
            </div>
        )
    )
}

export default Works