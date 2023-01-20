import React, { useRef, useState } from 'react'
import axios from 'axios'
import Icon from '../tools/icons/Icon'
import Oval from '../../components/tools/loaders/Oval'
import LocationDisplayer from './LocationDisplayer'
import { IconInput } from '../tools/global/Inputs'
import { useClickOutside } from '../tools/hooks/useClickOutside'

const LocationsAutocomplete = ({ datas, setDatas }) => {
    const [search, setSearch] = useState({ state: false, query: '', results: [], isLoading: false })

    const wrapperRef = useRef()
    const [locationDisplayer, setLocationDisplayer] = useState(false)
    useClickOutside(wrapperRef, () => {
        setLocationDisplayer(false)
        setSearch(data => ({ ...data, state: false, results: [], isLoading: false }))
    })

    const searchLocation = async () => {
        if (!search.query || search.query.trim() === "") return
        if (search.query.length > 2) {
            setLocationDisplayer(false)
            setSearch(data => ({ ...data, state: true, isLoading: true }))

            const response = await axios
                .get(encodeURI(`${process.env.REACT_APP_API_URL}api/location/${search.query}`))
                .catch(err => console.log("Error: ", err))

            if (response.data.length > 0) {
                setSearch(data => ({ ...data, results: response.data }))
            } else {
                setSearch(data => ({ ...data, results: [], isLoading: false }))
            }
        } else {
            setSearch(data => ({ ...data, state: false, isLoading: false }))
            setLocationDisplayer(true)
        }
    }

    /**
     * 
     */

    const addLocation = (value) => {
        setDatas(data => ({
            ...data,
            location: [...datas.location, {
                type: "city",
                location: value.COM_NOM,
                department: value.DEP_NOM,
                department_code: value.DEP_CODE,
                region: value.REG_NOM_OLD,
                code_region: value.REG_CODE_OLD,
                new_region: value.REG_NOM,
                new_region_code: value.REG_CODE
            }]
        }))
        setSearch(data => ({ ...data, state: false, query: '', isLoading: false }))
        setLocationDisplayer(true)
    }

    /**
     * 
     */

    const deleteItem = (key) => {
        let newLocs = datas.location.filter((_, i) => i !== key)
        setDatas(data => ({ ...data, location: newLocs }))
    }

    /**
     * 
     */

    return (
        <div ref={wrapperRef} className="relative">
            {locationDisplayer || search.state || datas.location.length === 0 ? (
                <IconInput
                    className="is_start_icon"
                    placeholder="Rechercher une localité"
                    type="text"
                    icon={<Icon name="Position" />}
                    value={search.query}
                    onInput={e => setSearch(data => ({ ...data, query: e.target.value }))}
                    onChange={searchLocation}
                    onClick={() => setLocationDisplayer(!locationDisplayer)}
                />
            ) : (
                <div className="locations_displayer" onClick={() => setLocationDisplayer(!locationDisplayer)}>
                    <div className="start_icon">
                        <Icon name="Position" />
                    </div>
                    {datas?.location?.map((element, key) => {
                        return (
                            <div className="locations_item" key={key}>
                                {element.type === "city" &&
                                    <div>{element.location} ({element.department_code})</div>
                                }
                                {element.type === "department" &&
                                    <div>{element.department} ({element.department_code})</div>
                                }
                                {element.type === "region" &&
                                    <div>{element.region}</div>
                                }
                                {!element.type &&
                                    <div>{element}</div>
                                }
                                <Icon name="Cross" onClick={() => deleteItem(key)} />
                            </div>
                        )
                    })}
                </div>
            )}

            <div className="auto-complete-container custom-scrollbar"
                tabIndex="0"
                style={{ display: !search.state || locationDisplayer ? "none" : "block" }}
            >
                {search.results.length > 0 &&
                    search.results.map((element, key) => {
                        return (
                            <div className="auto-complete-item" onClick={() => addLocation(element)} key={key}>
                                {`${element.COM_NOM} (${element.DEP_CODE})`}
                            </div>
                        )
                    })
                }
                {search.isLoading && search.results.length === 0 &&
                    <div className='py-4'>
                        <Oval />
                    </div>
                }
                {search.state && search.results.length === 0 && !search.isLoading &&
                    <div className="no-result">
                        <Icon name="BoxEmpty" />
                        <div>Aucun resultat ne correspond à votre recherche...</div>
                    </div>
                }
            </div>

            {locationDisplayer &&
                <LocationDisplayer
                    datas={datas}
                    setDatas={setDatas}
                    setLocationDisplayer={setLocationDisplayer}
                />
            }
        </div>
    )
}

export default LocationsAutocomplete