import { FaFacebookF, FaInstagram, FaTwitter, FaSnapchatGhost, FaYoutube, FaTwitch, FaPinterest, FaLinkedinIn, FaLink } from 'react-icons/fa'

export const returnNetworkSVG = (network) => {
    if (network === "facebook")
        return <FaFacebookF className="bg-facebook" />
    else if (network === "instagram")
        return <FaInstagram className="bg-instagram" />
    else if (network === "twitter")
        return <FaTwitter className="bg-twitter" />
    else if (network === "snapchat")
        return <FaSnapchatGhost className="bg-snapchat" />
    else if (network === "youtube")
        return <FaYoutube className="bg-youtube" />
    else if (network === "twitch")
        return <FaTwitch className="bg-twitch" />
    else if (network === "pinterest")
        return <FaPinterest className="bg-pinterest" />
    else if (network === "linkedin")
        return <FaLinkedinIn className="bg-linkedin" />
    else return <FaLink className="bg-website" />
}

export const returnNetworkText = (type) => {
    if (type === "facebook")
        return "Suivez-nous sur Facebook"
    else if (type === "instagram")
        return "Suivez-nous sur Instagram"
    else if (type === "twitter")
        return "Suivez-nous sur Twitter"
    else if (type === "snapchat")
        return "Suivez-nous sur Snapchat"
    else if (type === "youtube")
        return "Suivez-nous sur YouTube"
    else if (type === "twitch")
        return "Suivez-nous sur Twitch"
    else if (type === "pinterest")
        return "Suivez-nous sur Pinterest"
    else if (type === "linkedin")
        return "Suivez-nous sur LinkedIn"
    else return "Visitez notre site web"
}

export const replaceHTTP = (str) => {
    if (str.includes('https://')) {
        let string = str.replace('https://', '')
        return string
    } else if (str.includes('http://')) {
        const string = str.replace('http://', '')
        return string
    }
}