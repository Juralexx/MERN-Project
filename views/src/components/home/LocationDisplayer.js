import React, { useState } from 'react'
import { BsGeoFill } from 'react-icons/bs'
import { GiFrance } from 'react-icons/gi'
import { IoClose } from 'react-icons/io5'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { TextButton } from '../tools/global/Button'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const LocationDisplayer = ({ location, setLocation, recentLocations, setDisplayLocation, aroundLocation, setAroundLocation }) => {
    const [sliderKey, setSliderKey] = useState(0)

    const deleteItem = (value) => {
        if (value.type === "city")
            setLocation(locations => locations.filter(e => e.location !== value.location))
        else if (value.type === "department")
            setLocation(locations => locations.filter(e => e.type === "department" && e.department !== value.department))
        else
            setLocation(locations => locations.filter(e => e.type === "region" && e.region !== value.region))
    }

    const getDistance = (key) => {
        const distance = [0, 5, 10, 20, 50, 100, 200]
        setAroundLocation(distance[key])
        setSliderKey(key)
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
                                            <IoClose onClick={() => deleteItem(element)} />
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
                <div className="locations_search_item"><BsGeoFill /> <div>Autour de moi</div></div>
                <div className="locations_search_item"><GiFrance /> <div>Toute la France</div></div>
            </div>
            <div className="locations_search_bottom">
                <TextButton onClick={() => { setLocation([]); setSliderKey(0); setAroundLocation(0)}}>Effacer</TextButton>
                <TextButton onClick={() => setDisplayLocation(false)}>Valider</TextButton>
            </div>
        </div>
    )
}

export default LocationDisplayer