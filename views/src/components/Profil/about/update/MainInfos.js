import React from "react";
import WorkUpdater from "./updaters/WorkUpdater";
import NameUpdater from "./updaters/NameUpdater";
import LastnameUpdater from "./updaters/LastnameUpdater";
import GenderUpdater from "./updaters/GenderUpdater";

const MainInfos = () => {

    return (
        <div className="right">
            <h5>Informations générales</h5>
            <NameUpdater />
            <LastnameUpdater />
            <WorkUpdater />
            <GenderUpdater />
        </div>
    )
};

export default MainInfos;