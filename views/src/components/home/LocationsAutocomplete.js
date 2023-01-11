import React, { useRef, useState } from 'react'
import axios from 'axios'
import LocationDisplayer from './LocationDisplayer'
import { useClickOutside } from '../tools/hooks/useClickOutside'
import { IconInput } from '../tools/global/Inputs'
import Oval from '../../components/tools/loaders/Oval'
import Icon from '../tools/icons/Icon'

const LocationsAutocomplete = ({ datas, setDatas }) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [locationsFound, setLocationsFound] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [display, setDisplay] = useState(false)
    const wrapperRef = useRef()
    const [displayLocation, setDisplayLocation] = useState(false)
    useClickOutside(wrapperRef, () => {
        setDisplay(false)
        setDisplayLocation(false)
        setLoading(false)
    })

    const searchLocation = async () => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        else {
            const response = await axios
                .get(encodeURI(`${process.env.REACT_APP_API_URL}api/location/${searchQuery}`))
                .catch(err => console.log("Error: ", err))
            if (response) {
                let resDatas = new Set(datas.location.map(data => data.location))
                let merged = [...response.data.filter(res => !resDatas.has(res.COM_NOM))]
                setLocationsFound(merged)
                setLoading(true)
                if (searchQuery.length > 2) {
                    setDisplay(true)
                    setLoading(true)
                    if (locationsFound.length === 0) {
                        setLoading(false)
                    }
                } else {
                    setDisplay(false)
                    setLoading(false)
                }
            }
        }
    }

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
        setSearchQuery("")
        setDisplay(false)
        setDisplayLocation(true)
        setLoading(false)
    }

    const deleteItem = (key) => {
        let newLocs = datas.location.filter((x, i) => i !== key)
        setDatas(data => ({ ...data, location: newLocs }))
    }

    return (
        <div ref={wrapperRef} className="relative">
            {displayLocation || datas.location.length === 0 ? (
                <IconInput
                    className="is_start_icon"
                    placeholder="Rechercher une localité"
                    type="text"
                    icon={<Icon name="Position" />}
                    value={searchQuery}
                    onInput={e => setSearchQuery(e.target.value)}
                    onChange={searchLocation}
                    onClick={() => setDisplayLocation(true)}
                />
            ) : (
                <div className="locations_displayer" onClick={() => setDisplayLocation(!displayLocation)}>
                    <div className="start_icon">
                        <Icon name="Position" />
                    </div>
                    {datas.location.map((element, key) => {
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

            <div
                tabIndex="0"
                className="auto-complete-container custom-scrollbar"
                style={{ display: searchQuery.length < 3 || !display ? "none" : "block" }}
            >
                {display && locationsFound.length > 0 &&
                    locationsFound.map((element, key) => {
                        return (
                            <div
                                className="auto-complete-item"
                                onClick={() => { addLocation(element) }}
                                key={key}
                            >
                                {`${element.COM_NOM} (${element.DEP_CODE})`}
                            </div>
                        )
                    })
                }
                {isLoading && locationsFound.length === 0 &&
                    <Oval />
                }
                {searchQuery.length > 2 && locationsFound.length === 0 && !isLoading &&
                    <div className="no-result">
                        <Icon name="BoxEmpty" />
                        <div>Aucun resultat ne correspond à votre recherche...</div>
                    </div>
                }
            </div>

            {displayLocation && !display &&
                <LocationDisplayer
                    datas={datas}
                    setDatas={setDatas}
                    setDisplayLocation={setDisplayLocation}
                />
            }
        </div>
    )
}

export default LocationsAutocomplete