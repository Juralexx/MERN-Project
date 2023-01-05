import React, { useState } from 'react'
import axios from 'axios'
import { BsGeoFill } from 'react-icons/bs'
import { GiFrance } from 'react-icons/gi'
import { IoClose } from 'react-icons/io5'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { Button, TextButton } from '../tools/global/Button'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const LocationDisplayer = ({ location, setLocation, recentLocations, setDisplayLocation, aroundLocation, setAroundLocation }) => {
    const [sliderKey, setSliderKey] = useState(0)

    const getDistance = (key) => {
        const distance = [0, 5, 10, 20, 50, 100, 200]
        setAroundLocation(distance[key])
        setSliderKey(key)
    }

    const deleteItem = (key) => {
        let newLocs = location.filter((x, i) => i !== key)
        setLocation(newLocs)
    }

    const getCurrentLocation = () => {
        const successCallback = async (position) => {
            const response = await axios
                .get(`${process.env.REACT_APP_API_URL}api/location/`)
                .catch(err => console.log("Error: ", err))

            const currentLocation = response.data.reduce((prev, curr) =>
                Math.abs(curr.geolocalisation.substring(0, curr.geolocalisation.indexOf(",")) - position.coords.latitude)
                    < Math.abs(prev.geolocalisation.substring(0, curr.geolocalisation.indexOf(",")) - position.coords.latitude) ? curr : prev);

            setLocation([{
                type: "city",
                location: currentLocation.COM_NOM,
                department: currentLocation.DEP_NOM,
                department_code: currentLocation.DEP_CODE,
                region: currentLocation.REG_NOM_OLD,
                code_region: currentLocation.REG_CODE_OLD,
                new_region: currentLocation.REG_NOM,
                new_region_code: currentLocation.REG_CODE
            }])
        }
        const errorCallback = () => { return }

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
    }

    return (
        <div className="location_search_displayer">
            {(location.length > 0 || recentLocations.length > 0) &&
                <div className="locations_search_top">
                    {location.length > 0 &&
                        <>
                            <h4>Localisations sélectionnées</h4>
                            <div className="locations_selected">
                                {location.map((element, key) => {
                                    return (
                                        <div className="locations_selected_item" key={key}>
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
                        </>
                    }
                    {recentLocations.length > 0 && location.length === 0 &&
                        <>
                            <h4>Localisations récentes</h4>
                            {recentLocations.map((element, key) => {
                                return (
                                    <div className="locations_search_item" key={key} onClick={() => setLocation(locations => [...locations, element])}>
                                        <FaMapMarkerAlt />
                                        {element.type === "city" &&
                                            <div>{element.location} ({element.department_code})</div>
                                        }
                                        {element.type === "department" &&
                                            <div>{element.department} ({element.department_code})</div>
                                        }
                                        {element.type === "region" &&
                                            <div>{element.region}</div>
                                        }
                                    </div>
                                )
                            })}
                        </>
                    }
                </div>
            }
            {location.length === 1 &&
                <div className="location_range">
                    <h4>Dans un rayon de <span>{aroundLocation}</span> km</h4>
                    <div className="range">
                        <Slider
                            min={0}
                            max={6}
                            defaultValue={0}
                            marks={{ 0: "0km", 1: "5km", 2: "10km", 3: "20km", 4: "50km", 5: "100km", 6: "200km" }}
                            step={null}
                            value={sliderKey}
                            onChange={e => getDistance(e)}
                        />
                    </div>
                </div>
            }
            <div className="locations_search_body">
                {location[0] !== 'Autour de moi' &&
                    <div className="locations_search_item" onClick={() => { getCurrentLocation() }}><BsGeoFill /> <div>Autour de moi</div></div>
                }
                {location[0] !== 'Toute la France' &&
                    <div className="locations_search_item" onClick={() => setLocation(['Toute la France'])}><GiFrance /> <div>Toute la France</div></div>
                }
            </div>
            <div className="locations_search_bottom">
                <TextButton className="mr-2" onClick={() => { setLocation([]); setSliderKey(0); setAroundLocation(0) }}>Effacer</TextButton>
                <Button onClick={() => setDisplayLocation(false)}>Valider</Button>
            </div>
        </div>
    )
}

export default LocationDisplayer