import React, { useRef, useState } from 'react'
import axios from 'axios'
import LocationDisplayer from './LocationDisplayer'
import { useClickOutside } from '../tools/hooks/useClickOutside'
import { IconInput } from '../tools/global/Inputs'
import { SmallLoader } from '../tools/global/Loader'
import { BsInboxFill } from 'react-icons/bs'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

const LocationsAutocomplete = ({ location, setLocation, recentLocations, setRecentLocations, aroundLocation, setAroundLocation }) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [locationsFound, setLocationsFound] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isResponse, setResponse] = useState(true)
    const [display, setDisplay] = useState(false)
    const isEmpty = !locationsFound || locationsFound.length === 0
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
            const response = await axios.get(encodeURI(`${process.env.REACT_APP_API_URL}api/location/${searchQuery}`)).catch((err) => { console.log("Error: ", err) })
            if (response) {
                let datas = new Set(location.map(data => data.location))
                let merged = [...response.data.filter(data => !datas.has(data.COM_NOM))]
                setLocationsFound(merged)
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

    const addLocation = (value) => {
        const loc = {
            type: "city",
            location: value.COM_NOM,
            department: value.DEP_NOM,
            department_code: value.DEP_CODE,
            region: value.REG_NOM_OLD,
            code_region: value.REG_CODE_OLD,
            new_region: value.REG_NOM,
            new_region_code: value.REG_CODE
        }
        setLocation(locations => [...locations, loc])
        setSearchQuery("")
        setDisplay(false)
        setDisplayLocation(true)
        setLoading(false)
    }

    const deleteItem = (key) => {
        let newLocs = location.filter((x, i) => i !== key)
        setLocation(newLocs)
    }

    return (
        <div ref={wrapperRef} className="relative">
            {displayLocation || location.length === 0 ? (
                <IconInput
                    className="is_start_icon"
                    placeholder="Rechercher une localité"
                    type="text"
                    icon={<FaMapMarkerAlt />}
                    value={searchQuery}
                    onInput={e => setSearchQuery(e.target.value)}
                    onChange={searchLocation}
                    onClick={() => setDisplayLocation(true)}
                />
            ) : (
                <div className="locations_displayer" onClick={() => setDisplayLocation(!displayLocation)}>
                    <div className="start_icon"><FaMapMarkerAlt /></div>
                    {location.map((element, key) => {
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
                                <IoClose onClick={() => deleteItem(key)} />
                            </div>
                        )
                    })}
                </div>
            )}

            <div tabIndex="0" className="auto-complete-container full" style={{ display: searchQuery.length < 3 || !display ? "none" : "block" }} >
                {!isEmpty && display && isResponse &&
                    locationsFound.map((element, key) => {
                        return <div className="auto-complete-item" onClick={() => addLocation(element)} key={key}>{`${element.COM_NOM} (${element.DEP_CODE})`}</div>
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

            {displayLocation && !display &&
                <LocationDisplayer
                    location={location}
                    setLocation={setLocation}
                    recentLocations={recentLocations}
                    setDisplayLocation={setDisplayLocation}
                    aroundLocation={aroundLocation}
                    setAroundLocation={setAroundLocation}
                />
            }
        </div>
    )
}

export default LocationsAutocomplete