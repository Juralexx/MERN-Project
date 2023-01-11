import Icon from '../icons/Icon'

export const returnNetworkSVG = (network) => {
    if (network === "facebook")
        return <Icon name="Facebook" className="bg-facebook" />
    else if (network === "instagram")
        return <Icon name="Instagram" className="bg-instagram" />
    else if (network === "twitter")
        return <Icon name="Twitter" className="bg-twitter" />
    else if (network === "snapchat")
        return <Icon name="Snapchat" className="bg-snapchat" />
    else if (network === "youtube")
        return <Icon name="Youtube" className="bg-youtube" />
    else if (network === "twitch")
        return <Icon name="Twitch" className="bg-twitch" />
    else if (network === "pinterest")
        return <Icon name="PinterestCircle" className="bg-pinterest" />
    else if (network === "linkedin")
        return <Icon name="Linkedin" className="bg-linkedin" />
    else return <Icon name="Link" className="bg-website" />
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