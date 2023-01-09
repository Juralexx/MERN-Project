import React, { useState } from 'react'
import { Button } from '../../../tools/global/Button';
import { ClassicInput } from '../../../tools/global/Inputs';
import isURL from 'validator/lib/isURL';
import { ErrorCard } from '../../../tools/global/Error';
import { IoClose } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTwitter, FaSnapchatGhost, FaYoutube, FaTwitch, FaPinterest, FaLinkedinIn, FaLink } from 'react-icons/fa'

const Networks = ({ networks, setNetworks, error, setError }) => {
    const [network, setNetwork] = useState("")
    const checkErr = (name) => { if (error.element === name) return "err" }

    const returnSVG = (network) => {
        if (network === "facebook") return <FaFacebookF />
        else if (network === "instagram") return <FaInstagram />
        else if (network === "twitter") return <FaTwitter />
        else if (network === "snapchat") return <FaSnapchatGhost />
        else if (network === "youtube") return <FaYoutube />
        else if (network === "twitch") return <FaTwitch />
        else if (network === "pinterest") return <FaPinterest />
        else if (network === "linkedin") return <FaLinkedinIn />
        else return <FaLink />
    }

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
            setNetworks([...networks, { type: site, url: network }])
            setNetwork("")
            setError({ element: "", error: "" })
        } else {
            setError({ element: "network", error: "Veuillez saisir une adresse URL valide" })
        }
    }

    const deleteItem = (key) => {
        let arr = [...networks]
        arr.splice(key, 1)
        setNetworks(arr)
    }

    return (
        <div className="row">
            <div className="col-12 col-md-6">
                <p className="title">Réseaux sociaux</p>
                <div className="flex">
                    <ClassicInput
                        className={`w-full !max-w-full mb-4 ${checkErr("networks")}`}
                        inputClassName="w-full"
                        type="text"
                        placeholder="https://"
                        value={network}
                        onChange={e => setNetwork(e.target.value)}
                    />
                    <Button className="!h-[46px] ml-2" onClick={handleNetwork}>Ajouter</Button>
                </div>
                {error.element === "networks" &&
                    <ErrorCard
                        display={error.element === "networks"}
                        text={error.error}
                        clean={() => setError({ element: "", error: "" })}
                    />
                }
                {networks.length > 0 &&
                    networks.map((element, key) => {
                        return (
                            <div className="network" key={key}>
                                <div className="flex items-center w-[80%] relative">
                                    {returnSVG(element.type)}
                                    <a href={element.url} rel="noreferrer" target="_blank" className="ml-4">{element.url}</a>
                                </div>
                                <IoClose className='cursor-pointer' onClick={() => deleteItem(key)} />
                            </div>
                        )
                    })
                }
            </div>
            <div className="col-12 col-md-6">
                <h3>Date de fin prévu (facultatif)</h3>
                <p>Vous recevrez des conseils quant au moment où les étapes qui durent plusieurs jours doivent être terminées.
                    Cette date reste modifiable jusqu'au moment où vous lancez votre projet (ce qui se fait manuellement).</p>
            </div>
        </div>

    )
}

export default Networks