import React from "react";
import { useSelector } from "react-redux";
import { dateParser } from "../Utils";
import ProfilHeader from "./ProfilHeader";
import BioUpdater from "./updaters/BioUpdater";

const Profil = () => {
    const userData = useSelector((state) => state.userReducer)

    return (
        <div className="container">
            <div className="profil-container">
                <ProfilHeader />

                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profil-card">
                                <h5>Introduction</h5>
                                <p><i className="fas fa-envelope-open-text"></i> {userData.email}</p>
                                <p><i className="fas fa-home"></i> New York</p>
                                {userData.name === '' ||  userData.lastname === '' ? (<p style={{ display: 'none' }}></p>) : (<p className="name-field"><i className="fas fa-user-circle"></i> {userData.name} {userData.lastname}</p>)}
                                {userData.work === '' ? (<p style={{ display: 'none' }}></p>) : (<p className="work-field"><i className="fas fa-user-md"></i> {userData.work}</p>)}
                                {userData.phone === '' ? (<p style={{ display: 'none' }}></p>) : (<p className="phone-field"><i className="fas fa-mobile-alt"></i> {userData.phone}</p>)}
                                <p><i className="fas fa-sign-in-alt"></i> {dateParser(userData.createdAt)}</p>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <BioUpdater />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profil