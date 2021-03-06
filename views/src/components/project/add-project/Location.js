import React, { useState, useRef } from 'react'
import axios from 'axios'
import { geoJSONStructure, geolocToFloat } from '../../Utils'
import { useClickOutside } from '../../tools/hooks/useClickOutside';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import { ClassicInput } from '../../tools/global/Inputs';
import { SmallLoader } from '../../tools/global/Loader';
import { ErrorCard } from '../../tools/global/Error';
import Oval from 'react-loading-icons/dist/components/oval';
import { BsInboxFill } from 'react-icons/bs';

const Location = ({ leafletLoading, geoJSON, geolocalisation, setGeolocalisation, location, setLocation, setDepartment, setCodeDepartment, setRegion, setCodeRegion, setNewRegion, setCodeNewRegion, setErr, isErr, error }) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [locationsFound, setLocationsFound] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isResponse, setResponse] = useState(true)
    const [display, setDisplay] = useState(false)
    const isEmpty = !locationsFound || locationsFound.length === 0
    const wrapperRef = useRef()
    const errorRef = useRef()
    useClickOutside(wrapperRef, setDisplay, false, setLoading, false)
    const checkErr = (name) => { if (isErr === name) return "err" }

    const setSelect = (value) => { setSearchQuery(value); setDisplay(false); setLoading(false) }

    const searchLocation = async () => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        else {
            const response = await axios.get(encodeURI(`${process.env.REACT_APP_API_URL}api/location/${searchQuery}`)).catch((err) => { console.log("Error: ", err) })
            if (response) {
                setLocationsFound(response.data)
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

    const clean = () => {
        setSearchQuery("")
        setGeolocalisation("")
        setLocation("")
        setDepartment("")
        setRegion("")
        setNewRegion("")
    }

    return (
        <div className="add-project-card">
            <h2>Localisation</h2>
            <div className="flex-card">
                <div className="card-left">
                    <div className="content-form mb-3">
                        <p className="title full">Localit?? <span>Champs requis</span></p>
                        <ClassicInput className={`full ${checkErr("location")}`} type="text" placeholder="Rechercher une adresse..." value={searchQuery} onInput={e => setSearchQuery(e.target.value)} onChange={searchLocation} cross onClean={clean} />
                        {isErr === "location" && <ErrorCard useRef={errorRef} display={isErr === "location"} text={error} clean={() => setErr("")} />}
                    </div>
                    <div tabIndex="0" className="auto-complete-container custom-scrollbar full" ref={wrapperRef} style={{ display: searchQuery.length < 3 || !display ? "none" : "block" }} >
                        {!isEmpty && display && isResponse &&
                            locationsFound.map((element, key) => {
                                return (
                                    <div className="auto-complete-item"
                                        onClick={() => {
                                            setSelect(`${element.COM_NOM} - ${element.DEP_NOM_NUM}, ${element.REG_NOM_OLD}`)
                                            setGeolocalisation(element.geolocalisation)
                                            setLocation(element.COM_NOM)
                                            setDepartment(element.DEP_NOM)
                                            setCodeDepartment(element.DEP_CODE)
                                            setRegion(element.REG_NOM_OLD)
                                            setCodeRegion(element.REG_CODE_OLD)
                                            setNewRegion(element.REG_NOM)
                                            setCodeNewRegion(element.REG_CODE)
                                        }} key={key}>{`${element.COM_NOM} - ${element.DEP_NOM_NUM}, ${element.REG_NOM_OLD}`}
                                    </div>
                                )
                            })
                        }
                        {isLoading && isEmpty &&
                            <SmallLoader />
                        }
                        {searchQuery.length > 2 && isEmpty && !isLoading &&
                            <div className="no-result">
                                <div><BsInboxFill /></div>
                                <div>Aucun resultat ne correspond ?? votre recherche...</div>
                            </div>
                        }
                    </div>
                </div>
                <div className="card-right">
                    <h3>Lieu du projet</h3>
                    <p>Choisissez un titre et un sous-titre clair pour aider votre public ?? comprendre votre projet rapidement.
                        Ces deux ??l??ments sont visibles sur vous page de pr??-lancement et de projet.</p>
                    <p>Les contributeurs potentiels les verront aussi si votre projet appara??t dans les diff??rentes cat??gories,
                        les r??sultats de recherche ou les e-mails que nous envoyons ?? notre communaut??.</p>
                </div>
            </div>
            <MapContainer
                key={!leafletLoading ? location : null}
                center={!leafletLoading && geolocalisation.length > 0 ? geolocToFloat(geolocalisation) : [46.873467013745916, 2.5836305570248217]}
                zoom={location ? 12 : 5}
                minZoom={5}
                maxZoom={location && 12}
                dragging={!location ? false : true}
                style={{ width: '100%', height: 300, marginTop: "20px" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url='https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
                />
                {location.length > 0 && geoJSON.length > 0 && !leafletLoading &&
                    <GeoJSON
                        data-location={location}
                        data={geoJSONStructure(geoJSON)}
                    />
                }
                {leafletLoading &&
                    <>
                        <div style={{ position: "absolute", top: 0, left: 0, width: '100%', height: 300, backgroundColor: "rgba(255, 255, 255, 0.3)", backdropFilter: "blur(5px)", zIndex: 2000 }}></div>
                        <Oval style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 60, height: 60, zIndex: 3000 }} strokeWidth="4" stroke="rgba(0, 0, 0, 0.5)" />
                    </>
                }
            </MapContainer>
        </div>
    )
}

export default Location