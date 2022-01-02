import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateEmail } from "../../../actions/user.action";
import Swal from "sweetalert2";

const EmailUpdater = () => {
    const userData = useSelector((state) => state.userReducer)
    const [emailUpdater, setEmailUpdater] = useState();
    const [email, setEmail] = useState(userData.email);
    const [value, setValue] = React.useState("");
    const dispatch = useDispatch()

    const handleEmail = (e) => {
        dispatch(updateEmail(userData._id, email))
        setEmailUpdater(false)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Vos modifications ont été enregistrées !',
            showConfirmButton: false,
            timer: 1300
        })
    };

    const openEmailUpdater = () => {
        return (
            <div className="user-info-edit">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onInput={handleChange} onChange={(e) => setEmail(e.target.value)} defaultValue={userData.email} />
                <div className="email error"></div>
                <div className="btn-container">
                    <button className="btn btn-primary" onClick={() => setEmailUpdater(false)}>Annuler</button>
                    <button className="btn btn-primary" disabled={!value} onClick={handleEmail}>Enregistrer</button>
                </div>
            </div>
        )
    }

    const handleChange = (e) => { 
        setValue(e.target.value)
    }

    return (
        <>
            {(userData.email === '') ? (
                <>
                    <div className="user-info">
                        <button className="add-btn" onClick={() => setEmailUpdater(true)} style={{ display: emailUpdater ? "none" : "block" }}>
                            <svg className="svg-icon" viewBox="0 0 20 20">
                                <path fill="none" d="M13.68,9.448h-3.128V6.319c0-0.304-0.248-0.551-0.552-0.551S9.448,6.015,9.448,6.319v3.129H6.319c-0.304,0-0.551,0.247-0.551,0.551s0.247,0.551,0.551,0.551h3.129v3.129c0,0.305,0.248,0.551,0.552,0.551s0.552-0.246,0.552-0.551v-3.129h3.128c0.305,0,0.552-0.247,0.552-0.551S13.984,9.448,13.68,9.448z M10,0.968c-4.987,0-9.031,4.043-9.031,9.031c0,4.989,4.044,9.032,9.031,9.032c4.988,0,9.031-4.043,9.031-9.032C19.031,5.012,14.988,0.968,10,0.968z M10,17.902c-4.364,0-7.902-3.539-7.902-7.903c0-4.365,3.538-7.902,7.902-7.902S17.902,5.635,17.902,10C17.902,14.363,14.364,17.902,10,17.902z"></path>
                            </svg>Ajouter un email
                        </button>
                        {emailUpdater ? openEmailUpdater() : null}
                    </div>
                </>
            ) : (
                <>
                    <div className="user-info">
                        <p style={{ display: emailUpdater ? "none" : "block" }}><i className="fas fa-envelope-open-text"></i>{userData.email}</p>
                        <button className="btn btn-primary btn-edit" id="checkout" onClick={() => setEmailUpdater(true)} style={{ display: emailUpdater ? "none" : "block" }}><i className="fas fa-pen"></i></button>
                        {emailUpdater ? openEmailUpdater() : null}
                    </div>
                </>
            )}
        </>
    )
};

export default EmailUpdater;