import React from "react";
import { useSelector } from "react-redux";
import { dateParser } from "../../Utils";

const Intro = () => {
    const userData = useSelector((state) => state.userReducer)

    return (
        <div className="profil-card">
            <h5>Introduction</h5>
            <p><i className="fas fa-envelope-open-text"></i> {userData.email}</p>
            {userData.location === '' || userData.location === null || userData.location === undefined ? (
                <p style={{ display: 'none' }}></p>
            ) : (
                <p className="location-field"><i className="fas fa-home"></i> {userData.location}</p>
            )}
            {userData.name === '' || userData.name === null || userData.name === undefined ||
                userData.lastname === '' || userData.lastname === null || userData.lastname === undefined ? (
                <p style={{ display: 'none' }}></p>
            ) : (
                <p className="name-field"><i className="fas fa-user-circle"></i> {userData.name} {userData.lastname}</p>
            )}
            {userData.work === '' || userData.work === null || userData.work === undefined ? (
                <p style={{ display: 'none' }}></p>
            ) : (
                <p className="work-field"><i className="fas fa-user-md"></i> {userData.work}</p>
            )}
            {userData.phone === '' || userData.phone === null || userData.phone === undefined ? (
                <p style={{ display: 'none' }}></p>
            ) : (
                <p className="phone-field"><i className="fas fa-mobile-alt"></i> {userData.phone}</p>
            )}
            <p><i className="fas fa-sign-in-alt"></i> {dateParser(userData.createdAt)}</p>
        </div>
    )
}

export default Intro