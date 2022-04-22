import React, { useRef, useState } from 'react'
import axios from 'axios'
import { useClickOutside } from '../tools/functions/useClickOutside'
import { IconInput } from '../tools/components/Inputs'
import { SmallLoader } from '../tools/components/Loader'
import LocationDisplayer from './LocationDisplayer'
import { BsInboxFill } from 'react-icons/bs'
import { FaMapMarkerAlt } from 'react-icons/fa'

const LocationsAutocomplete = ({ location, setLocation, recentLocations, setRecentLocations, aroundLocation, setAroundLocation }) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [locationsFound, setLocationsFound] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isResponse, setResponse] = useState(true)
    const [display, setDisplay] = useState(false)
    const wrapperRef = useRef()
    const isEmpty = !locationsFound || locationsFound.length === 0
    const [displayLocation, setDisplayLocation] = useState(false)
    useClickOutside(wrapperRef, setDisplay, false, setDisplayLocation, false, setLoading, false)

    const searchLocation = async () => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        else {
            const response = await axios.get(encodeURI(`${process.env.REACT_APP_API_URL}api/location/${searchQuery}`)).catch((err) => { console.log("Error: ", err) })
            if (response) {
                let datas = new Set(location.map(data => data.COM_NOM))
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

    const onSelect = (value) => {
        setLocation(locations => [...locations, value])
        setSearchQuery("")
        setDisplay(false)
        setDisplayLocation(true)
        setLoading(false)
    }

    return (
        <div ref={wrapperRef}>
            <IconInput
                className="is-start-icon"
                placeholder="Rechercher une localité"
                type="text"
                icon={<FaMapMarkerAlt />}
                value={searchQuery}
                onInput={e => setSearchQuery(e.target.value)}
                onChange={searchLocation}
                onClick={() => setDisplayLocation(!displayLocation)}
            />
            <div tabIndex="0" className="auto-complete-container full" style={{ display: searchQuery.length < 3 || !display ? "none" : "block" }} >
                {!isEmpty && display && isResponse &&
                    locationsFound.map((element, key) => {
                        return <div className="auto-complete-item" onClick={() => onSelect(element)} key={key}>{`${element.COM_NOM} (${element.DEP_CODE})`}</div>
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

            {displayLocation &&
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