import React, { useState } from 'react'
import axios from 'axios'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Icon from '../tools/icons/Icon';
import { Button, TextButton } from '../tools/global/Button'

const LocationDisplayer = ({ datas, setDatas, setLocationDisplayer }) => {
    const [sliderKey, setSliderKey] = useState(0)
    
    /**
     * 
     */

    const getDistance = (key) => {
        const distance = [0, 5, 10, 20, 50, 100, 200]
        setSliderKey(key)
        setDatas(data => ({ ...data, aroundLocation: distance[key] }))
    }
    
    /**
     * 
     */

    const deleteItem = (key) => {
        let newLocs = datas.location.filter((x, i) => i !== key)
        setDatas(data => ({ ...data, location: newLocs }))
    }
    
    /**
     * 
     */

    const getCurrentLocation = () => {
        const successCallback = async (position) => {
            const response = await axios
                .get(`${process.env.REACT_APP_API_URL}api/location/`)
                .catch(err => console.log("Error: ", err))

            const lat = position.coords.latitude
            const currentLocation = response.data.reduce(
                (prev, curr) =>
                    Math.abs(curr.geolocalisation.substring(0, curr.geolocalisation.indexOf(",")) - lat) < Math.abs(prev.geolocalisation.substring(0, curr.geolocalisation.indexOf(",")) - lat) ? curr : prev
            )
            setDatas(data => ({
                ...data,
                location: [{
                    type: "city",
                    location: currentLocation.COM_NOM,
                    department: currentLocation.DEP_NOM,
                    department_code: currentLocation.DEP_CODE,
                    region: currentLocation.REG_NOM_OLD,
                    code_region: currentLocation.REG_CODE_OLD,
                    new_region: currentLocation.REG_NOM,
                    new_region_code: currentLocation.REG_CODE
                }]
            }))
        }
        const errorCallback = () => { }
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
    }
    
    /**
     * 
     */

    return (
        <div className="location_search_displayer">
            {(datas.location.length > 0 || datas.recentLocations.length > 0) &&
                <div className="locations_search_top">
                    {datas.location.length > 0 &&
                        <>
                            <h4>Localisations sélectionnées</h4>
                            <div className="locations_selected">
                                {datas.location.map((element, key) => {
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
                                            <Icon name="Cross" onClick={() => deleteItem(key)} />
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    }
                    {datas.recentLocations.length > 0 &&
                        <>
                            <h4>Localisations récentes</h4>
                            {datas.recentLocations.map((element, key) => {
                                return (
                                    <div className="locations_search_item" key={key} onClick={() => setDatas(data => ({ ...data, location:  [...new Set([...datas.location, element])] }))}>
                                        <Icon name="Position" />
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
            {datas.location.length === 1 &&
                <div className="location_range">
                    <h4>Dans un rayon de <span>{datas.aroundLocation}</span> km</h4>
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
                {datas.location[0] !== 'Autour de moi' &&
                    <div className="locations_search_item" onClick={() => getCurrentLocation()}>
                        <Icon name="Compass" />
                        <div>Autour de moi</div>
                    </div>
                }
                {datas.location[0] !== 'Toute la France' &&
                    <div className="locations_search_item" onClick={() => setDatas(data => ({ ...data, location: ['Toute la France'] }))}>
                        <Icon name="France" />
                        <div>Toute la France</div>
                    </div>
                }
            </div>
            <div className="locations_search_bottom">
                <TextButton
                    className="mr-2"
                    onClick={() => {
                        setDatas(data => ({ ...data, location: [], aroundLocation: 0 }))
                        setSliderKey(0)
                    }}
                >
                    Effacer
                </TextButton>
                <Button onClick={() => setLocationDisplayer(false)}>
                    Valider
                </Button>
            </div>
        </div>
    )
}

export default LocationDisplayer