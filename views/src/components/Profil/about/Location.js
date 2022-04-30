import React from "react";
import LocationUpdater from "./updaters/LocationUpdater";

const Location = () => {

    return (
        <div className="right">
            <h5>Adresse</h5>
            <LocationUpdater />
        </div>
    )
};

export default Location;