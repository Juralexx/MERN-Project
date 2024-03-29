import React, { useState } from 'react'
import { Button } from '../../tools/global/Button';
import { ClassicInput } from '../../tools/global/Inputs';
import isURL from 'validator/lib/isURL';
import { ErrorCard } from '../../tools/global/ErrorCard';
import { addClass } from '../../Utils';
import Icon from '../../tools/icons/Icon';

const Networks = ({ networks, setDatas, error, setError }) => {
    const [network, setNetwork] = useState("")

    const returnSVG = (network) => {
        if (network === "facebook")
            return <Icon name="Facebook" />
        else if (network === "instagram")
            return <Icon name="Instagram" />
        else if (network === "twitter")
            return <Icon name="Twitter" />
        else if (network === "snapchat")
            return <Icon name="Snapchat" />
        else if (network === "youtube")
            return <Icon name="Youtube" />
        else if (network === "twitch")
            return <Icon name="Twitch" />
        else if (network === "pinterest")
            return <Icon name="Pinterest" />
        else if (network === "linkedin")
            return <Icon name="Linkedin" />
        else
            return <Icon name="Link" />
    }

    const handleNetwork = () => {
        if (isURL(network)) {
            let site = ""
            if (network.includes("facebook"))
                site = "facebook"
            else if (network.includes("instagram"))
                site = "instagram"
            else if (network.includes("twitter"))
                site = "twitter"
            else if (network.includes("snapchat"))
                site = "snapchat"
            else if (network.includes("youtube"))
                site = "youtube"
            else if (network.includes("twitch"))
                site = "twitch"
            else if (network.includes("pinterest"))
                site = "pinterest"
            else if (network.includes("linkedin"))
                site = "linkedin"
            else site = "website"
            setDatas(data => ({ ...data, networks: [...data.networks, { type: site, url: network }] }))
            setNetwork("")
            setError({ element: "", error: "" })
        } else {
            setError({ element: "network", error: "Veuillez saisir une adresse URL valide" })
        }
    }

    const deleteItem = (key) => {
        let arr = [...networks]
        arr.splice(key, 1)
        setDatas(data => ({ ...data, networks: arr }))
    }

    return (
        <div className="row">
            <div className="col-12 col-lg-6">
                <h3>Date de fin prévu <span>- facultatif</span></h3>
                <p>
                    Vous recevrez des conseils quant au moment où les étapes qui durent plusieurs jours doivent être terminées.
                    Cette date reste modifiable jusqu'au moment où vous lancez votre projet (ce qui se fait manuellement).
                </p>
            </div>
            <div className="col-12 col-lg-6">
                <div className="title">Réseaux sociaux</div>
                <div className="flex flex-col sm:flex-row mb-2">
                    <ClassicInput
                        className={`w-full !max-w-full mb-4 ${addClass(error.element === "networks", 'err')}`}
                        inputClassName="w-full"
                        type="text"
                        placeholder="https://"
                        value={network}
                        onChange={e => setNetwork(e.target.value)}
                    />
                    <Button className="sm:!h-[46px] sm:ml-2" onClick={handleNetwork}>Ajouter</Button>
                </div>
                <ErrorCard
                    display={error.element === "networks"}
                    text={error.error}
                    clean={() => setError({ element: "", error: "" })}
                />
                {networks.length > 0 &&
                    networks.map((element, key) => {
                        return (
                            <div className="network" key={key}>
                                <div className="flex items-center w-[80%] relative">
                                    {returnSVG(element.type)}
                                    <a href={element.url} rel="noreferrer" target="_blank" className="ml-4">{element.url}</a>
                                </div>
                                <Icon name="Cross" className='cursor-pointer' onClick={() => deleteItem(key)} />
                            </div>
                        )
                    })
                }
            </div>
        </div>

    )
}

export default Networks