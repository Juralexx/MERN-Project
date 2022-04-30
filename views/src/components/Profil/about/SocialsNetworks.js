import React from "react";
import WebsiteUpdater from "./updaters/WebsiteUpdater";
import FacebookUpdater from "./updaters/FacebookUpdater";
import InstagramUpdater from "./updaters/InstagramUpdater";
import TwitterUpdater from "./updaters/TwitterUpdater";
import YoutubeUpdater from "./updaters/YoutubeUpdater";
import LinkedInUpdater from "./updaters/LinkedInUpdater";

const SocialsNetworks = () => {

    return (
        <div className="right">
            <h5>Site web</h5>
            <WebsiteUpdater />
            <h5>Réseaux sociaux</h5>
            <FacebookUpdater />
            <InstagramUpdater />
            <TwitterUpdater />
            <YoutubeUpdater />
            <LinkedInUpdater />
        </div>
    )
};

export default SocialsNetworks;