import React, { useState } from 'react'
import { addClass, deleteItemFromArray } from '../Utils';
import { returnNetworkSVG } from '../tools/functions/networks'
import { TextButton } from '../tools/global/Button';
import { ClassicInput } from '../tools/global/Inputs';
import Icon from '../tools/icons/Icon';
import isURL from 'validator/lib/isURL';
import { ErrorCard } from '../tools/global/Error';

const Networks = ({ datas, setDatas, error, setError }) => {
    const [network, setNetwork] = useState("")

    const handleNetwork = () => {
        if (isURL(network)) {
            let site = ""
            if (network.includes("facebook")) site = "facebook"
            else if (network.includes("instagram")) site = "instagram"
            else if (network.includes("twitter")) site = "twitter"
            else if (network.includes("snapchat")) site = "snapchat"
            else if (network.includes("youtube")) site = "youtube"
            else if (network.includes("twitch")) site = "twitch"
            else if (network.includes("pinterest")) site = "pinterest"
            else if (network.includes("linkedin")) site = "linkedin"
            else site = "website"
            setDatas(data => ({ ...data, networks: [...datas.networks, { type: site, url: network }] }))
            setNetwork("")
            setError({ element: "", error: "" })
        } else {
            setError({
                element: "networks",
                error: "Veuillez saisir une adresse URL valide"
            })
        }
    }

    return (
        <div className="add-project-card">
            <h2>Réseaux sociaux et site web</h2>
            <div className="row py-4">
                <div className="col-12 col-lg-6 flex flex-col justify-center">
                    <h4>Réseaux sociaux</h4>
                    <p>
                        Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                        Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.
                    </p>
                </div>
                <div className="col-12 col-lg-6 flex flex-col justify-center !mt-4 lg:!mt-0">
                    <div className="flex">
                        <ClassicInput
                            className={`w-full !max-w-full ${addClass(error.element === "networks", 'err')}`}
                            inputClassName="w-full"
                            type="text"
                            placeholder="https://"
                            value={datas.network}
                            onChange={e => setNetwork(e.target.value)}
                        />
                        <TextButton className="!h-[44px] ml-2" onClick={handleNetwork}>
                            Ajouter
                        </TextButton>
                    </div>
                    {error.element === "networks" &&
                        <ErrorCard
                            display={error.element === "networks"}
                            text={error.error}
                            clean={() => setError({ element: "", error: "" })}
                        />
                    }
                </div>
            </div>
            <div className="row py-4">
                <div className="col-12 col-lg-6 flex flex-col justify-center">
                    {datas.networks.length > 0 &&
                        datas.networks.map((element, key) => {
                            return (
                                <div className="network" key={key}>
                                    <div className="flex items-center w-[80%] relative">
                                        {returnNetworkSVG(element.type)}
                                        <a href={element.url} target="_blank" rel="noreferrer" className="ml-4">{element.url}</a>
                                    </div>
                                    <Icon
                                        name="Cross"
                                        className='cursor-pointer'
                                        onClick={() => setDatas(data => ({ ...data, networks: deleteItemFromArray(datas.networks, key) }))}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Networks