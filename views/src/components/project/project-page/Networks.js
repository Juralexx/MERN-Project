import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaSnapchatGhost, FaYoutube, FaTwitch, FaPinterest, FaLinkedinIn, FaLink } from 'react-icons/fa'

const Networks = ({ project }) => {

    const returnSVG = (network) => {
        if (network === "facebook") return <FaFacebookF className="facebook" />
        else if (network === "instagram") return <FaInstagram className="instagram" />
        else if (network === "twitter") return <FaTwitter className="twitter" />
        else if (network === "snapchat") return <FaSnapchatGhost className="snapchat" />
        else if (network === "youtube") return <FaYoutube className="youtube" />
        else if (network === "twitch") return <FaTwitch className="twitch" />
        else if (network === "pinterest") return <FaPinterest className="pinterest" />
        else if (network === "linkedin") return <FaLinkedinIn className="linkedin" />
        else return <FaLink className="website" />
    }

    const returnText = (type) => {
        if (type === "facebook") return "Suivez-nous sur Facebook"
        else if (type === "instagram") return "Suivez-nous sur Instagram"
        else if (type === "twitter") return "Suivez-nous sur Twitter"
        else if (type === "snapchat") return "Suivez-nous sur Snapchat"
        else if (type === "youtube") return "Suivez-nous sur YouTube"
        else if (type === "twitch") return "Suivez-nous sur Twitch"
        else if (type === "pinterest") return "Suivez-nous sur Pinterest"
        else if (type === "linkedin") return "Suivez-nous sur LinkedIn"
        else return "Visitez notre site web"
    }

    return (
        <div className="networks-card">
            <h2>Suivez-nous sur nos réseaux !</h2>
            <div className="networks-card-body">
                {project.networks.map((element, key) => {
                    return (
                        <div className="networks-card-item" key={key}>
                            {returnSVG(element.type)}
                            <a href={element.url} target="_blank">{returnText(element.type)}</a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Networks