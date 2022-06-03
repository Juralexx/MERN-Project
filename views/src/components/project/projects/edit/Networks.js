import React, { useState } from 'react'
import { Button } from '../../../tools/global/Button';
import { ClassicInput } from '../../../tools/global/Inputs';
import isURL from 'validator/lib/isURL';
import { ErrorCard } from '../../../tools/global/Error';
import { IoClose } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTwitter, FaSnapchatGhost, FaYoutube, FaTwitch, FaPinterest, FaLinkedinIn, FaLink } from 'react-icons/fa'

const Networks = ({ networks, setNetworks, isErr, setErr, error, setError }) => {
    const [network, setNetwork] = useState("")
    const checkErr = (name) => { if (isErr === name) return "err" }

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
            setErr('')
        } else {
            setErr("networks")
            setError("Veuillez saisir une adresse URL valide")
        }
    }

    const deleteItem = (key) => {
        let arr = [...networks]
        arr.splice(key, 1)
        setNetworks(arr)
    }

    return (
        <div className="content-form">
            <p className="title">Réseaux sociaux</p>
            <div className="flex">
                <ClassicInput className={`w-full !max-w-full mb-4 ${checkErr("networks")}`} inputClassName="w-full" type="text" placeholder="https://" value={network} onChange={e => setNetwork(e.target.value)} />
                <Button className="!h-[46px] ml-2" text="Ajouter" onClick={handleNetwork} />
            </div>
            {isErr === "networks" && <ErrorCard display={isErr === "networks"} text={error} clean={() => setErr("")} />}
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
    )
}

export default Networks