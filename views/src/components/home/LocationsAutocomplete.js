import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import LocationDisplayer from './LocationDisplayer'
import { useClickOutside } from '../tools/functions/useClickOutside'
import { IconInput } from '../tools/components/Inputs'
import { SmallLoader } from '../tools/components/Loader'
import { BsInboxFill } from 'react-icons/bs'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

const LocationsAutocomplete = ({ location, setLocation, recentLocations, setRecentLocations, aroundLocation, setAroundLocation }) => {
    const locationsDisplayerRef = useRef()
    const [locationsToDisplay, setLocationsToDisplay] = useState(location)
    const locationsRefs = []
    const [tooLong, setTooLoong] = useState(false)

    useEffect(() => {
        if (locationsToDisplay.length < location.length && !tooLong)
            setLocationsToDisplay(location)
    }, [location.length, locationsToDisplay.length])

    useEffect(() => {
        if (locationsRefs.length > 0 && !tooLong) {
            let locsLength = 0
            for (var i = 0; i < locationsRefs.length; i++) {
                locsLength = locsLength + locationsRefs[i].offsetWidth
                if (locsLength > locationsDisplayerRef?.current?.offsetWidth - 50) {
                    setLocationsToDisplay(locationsToDisplay.slice(0, i))
                    setTooLoong(true)
                    break;
                }
            }
        }
    }, [locationsRefs, locationsDisplayerRef])

    const [searchQuery, setSearchQuery] = useState("")
    const [locationsFound, setLocationsFound] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isResponse, setResponse] = useState(true)
    const [display, setDisplay] = useState(false)
    const isEmpty = !locationsFound || locationsFound.length === 0
    const wrapperRef = useRef()
    const [displayLocation, setDisplayLocation] = useState(false)
    useClickOutside(wrapperRef, setDisplay, false, setDisplayLocation, false, setLoading, false)

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

    const deleteItem = (value) => {
        if (value.type === "city")
            setLocation(locations => locations.filter(e => e.location !== value.location))
        else if (value.type === "department")
            setLocation(locations => locations.filter(e => e.type === "department" && e.department !== value.department))
        else
            setLocation(locations => locations.filter(e => e.type === "region" && e.region !== value.region))
        setTooLoong(false)
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
                <div className="locations_displayer" onClick={() => setDisplayLocation(!displayLocation)} ref={locationsDisplayerRef}>
                    <div className="start_icon"><FaMapMarkerAlt /></div>
                    {locationsToDisplay.map((element, key) => {
                        return (
                            <div className="locations_item" key={key} ref={ref => locationsRefs[key] = ref}>
                                {element.type === "city" &&
                                    <div>{element.location} ({element.department_code})</div>
                                }
                                {element.type === "department" &&
                                    <div>{element.department} ({element.department_code})</div>
                                }
                                {element.type === "region" &&
                                    <div>{element.region}</div>
                                }
                                <IoClose onClick={() => deleteItem(element)} />
                            </div>
                        )
                    })}
                    {tooLong &&
                        <div className="is_more_locations">+ {location.length - locationsToDisplay.length}</div>
                    }
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