import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateLocation } from "../../../actions/user.action";
import Swal from "sweetalert2";
import codesPostaux from './codes-postaux.json';

const LocationUpdater = () => {
    const userData = useSelector((state) => state.userReducer)
    const [code, setCode] = useState(userData.code);
    const [city, setCity] = useState(userData.city);
    const [locationUpdater, setLocationUpdater] = useState(false);
    const [value, setValue] = React.useState("");
    const dispatch = useDispatch()

    const handleLocation = (e) => {
        dispatch(updateLocation(userData._id, code, city))
        setLocationUpdater(false)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Vos modifications ont été enregistrées !',
            showConfirmButton: false,
            timer: 1300
        })
    }

    const handleLocationChange = (e) => { setValue(e.target.value) }

    const openLocationUpdater = () => {
        return (
            <div className="user-info-edit">
                <label htmlFor="lastname">Code Postal</label>
                <input type="text" name="code" id="code" placeholder="Votre code postal" onChange={handleLocationChange} onInput={findLocation} defaultValue={userData.code} />
                <input type="text" name="city" id="city" placeholder="Votre ville" onChange={handleLocationChange} onInput={(e) => setCity(e.target.value)} defaultValue={userData.city} />
                <div className="btn-container">
                    <button className="btn btn-primary" onClick={() => setLocationUpdater(false)}>Annuler</button>
                    <button className="btn btn-primary" disabled={!value} onClick={handleLocation}>Enregistrer</button>
                </div>
            </div>
        )
    }

    return (
        <>
            {(userData.code === '' && userData.city === '') ? (
                <>
                    <div className="user-info">
                        <button className="add-btn" onClick={() => setLocationUpdater(true)} style={{ display: locationUpdater ? "none" : "block" }}>
                            <svg className="svg-icon" viewBox="0 0 20 20">
                                <path fill="none" d="M13.68,9.448h-3.128V6.319c0-0.304-0.248-0.551-0.552-0.551S9.448,6.015,9.448,6.319v3.129H6.319c-0.304,0-0.551,0.247-0.551,0.551s0.247,0.551,0.551,0.551h3.129v3.129c0,0.305,0.248,0.551,0.552,0.551s0.552-0.246,0.552-0.551v-3.129h3.128c0.305,0,0.552-0.247,0.552-0.551S13.984,9.448,13.68,9.448z M10,0.968c-4.987,0-9.031,4.043-9.031,9.031c0,4.989,4.044,9.032,9.031,9.032c4.988,0,9.031-4.043,9.031-9.032C19.031,5.012,14.988,0.968,10,0.968z M10,17.902c-4.364,0-7.902-3.539-7.902-7.903c0-4.365,3.538-7.902,7.902-7.902S17.902,5.635,17.902,10C17.902,14.363,14.364,17.902,10,17.902z"></path>
                            </svg>Ajouter une adresse
                        </button>
                        {locationUpdater ? openLocationUpdater() : null}
                    </div>
                </>
            ) : (
                <>
                    <div className="user-info">
                        {(userData.code === '' && userData.city === '') ? (
                            <p style={{ display: locationUpdater ? "none" : "block" }}><em>Vous n'avez pas encore ajouté d'adresse</em></p>
                        ) : (
                            <p style={{ display: locationUpdater ? "none" : "block" }}><i className="fas"></i>{userData.code}, {userData.city}</p>
                        )}
                        <div className="btn-container">
                            <button className="btn btn-primary btn-edit" onClick={() => setLocationUpdater(true)} style={{ display: locationUpdater ? "none" : "block" }}><i className="fas fa-pen"></i></button>
                            {/* <button className="btn btn-primary btn-edit" onClick={handleLastnameDelete} style={{ display: lastnameUpdater ? "none" : "block" }}><i className="fa fa-trash-alt"></i></button> */}
                        </div>
                        {locationUpdater ? openLocationUpdater() : null}
                    </div>
                </>
            )}
        </>
    )
};

export default LocationUpdater;