import React from 'react'
import { BsGeoFill } from 'react-icons/bs'
import { GiFrance } from 'react-icons/gi'
import { IoClose } from 'react-icons/io5'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { TextButton } from '../tools/components/Button'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const LocationDisplayer = ({ location, setLocation, recentLocations, setDisplayLocation, aroundLocation, setAroundLocation }) => {

    const deleteItem = (value) => { setLocation(locations => locations.filter(e => e.COM_NOM !== value.COM_NOM)) }

    return (
        <div className="location-search-displayer">
            {(location.length > 0 || recentLocations.length > 0) &&
                <div className="locations-search-top">
                    {location.length > 0 &&
                        <>
                            <h4>Localisations sélectionnées</h4>
                            <div className="locations-selected">
                                {location.map((element, key) => {
                                    return (
                                        <div className="locations-selected-item" key={key}>{element.COM_NOM} ({element.DEP_CODE})<IoClose onClick={() => deleteItem(element)} /></div>
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
                                    <div className="locations-search-item" key={key} onClick={() => setLocation([element])}><FaMapMarkerAlt /> <p>{element.COM_NOM} ({element.DEP_CODE})</p></div>
                                )
                            })}
                        </>
                    }
                </div>
            }
            {location.length === 1 &&
                <div className="location-range">
                    <h4>Dans un rayon de {aroundLocation} km</h4>
                    <div className="range">
                        <Slider
                            min={0}
                            max={200}
                            defaultValue={0}
                            marks={{ 0: 0, 33.33: 5, 66.66: 10, 99.99: 20, 133.33: 50, 166.66: 100, 200: 200 }}
                            step={null}
                            value={aroundLocation}
                            onChange={e => setAroundLocation(e)}
                            dotStyle={{ display: "none" }}
                        />
                    </div>
                </div>
            }
            <div className="locations-search-body">
                <div className="locations-search-item"><BsGeoFill /> <p>Autour de moi</p></div>
                <div className="locations-search-item"><GiFrance /> <p>Toute la France</p></div>
            </div>
            <div className="locations-search-bottom">
                <TextButton text="Effacer" />
                <TextButton text="Valider" />
            </div>
        </div>
    )
}

export default LocationDisplayer