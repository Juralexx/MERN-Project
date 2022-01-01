import React from "react";
import PhoneUpdater from "../updaters/PhoneUpdater";
import EmailUpdater from "../updaters/EmailUpdater";

const ContactInfos = () => {

    return (
        <div className="right">
            <h5>Coordonnées</h5>
            <PhoneUpdater />
            <EmailUpdater />
        </div>
    )
};

export default ContactInfos;