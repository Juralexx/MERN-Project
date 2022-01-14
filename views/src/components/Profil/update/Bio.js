import React from "react";
import BioUpdater from "./updaters/BioUpdater";

const Bio = () => {

    return (
        <div className="right">
            <h5>Description</h5>
            <BioUpdater />
        </div>
    )
};

export default Bio;