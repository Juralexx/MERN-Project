import React from "react";
import WorkUpdater from "../updaters/WorkUpdater";
import NameUpdater from "../updaters/NameUpdater";
import Pseudo from "../updaters/Pseudo";
import LastnameUpdater from "../updaters/LastnameUpdater";

const MainInfos = () => {

    return (
        <div className="right">
            <h5>Informations générales</h5>
            <Pseudo />
            <NameUpdater />
            <LastnameUpdater />
            <WorkUpdater />
        </div>
    )
};

export default MainInfos;