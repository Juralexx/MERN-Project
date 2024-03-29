import Icon from '../icons/Icon'

/**
 * Return SVG network
 * @param {*} network Network name
 */

export const returnNetworkSVG = (network) => {
    switch (network) {
        case "facebook":
            return <Icon name="Facebook" className="color-facebook" />
        case "instagram":
            return <Icon name="Instagram" className="color-instagram" />
        case "twitter":
            return <Icon name="Twitter" className="color-twitter" />
        case "snapchat":
            return <Icon name="Snapchat" className="color-snapchat" />
        case "youtube":
            return <Icon name="Youtube" className="color-youtube" />
        case "twitch":
            return <Icon name="Twitch" className="color-twitch" />
        case "pinterest":
            return <Icon name="PinterestCircle" className="color-pinterest" />
        case "linkedin":
            return <Icon name="Linkedin" className="color-linkedin" />
        default:
            return <Icon name="Link" className="color-website" />
    }
}

/**
 * Return Network text
 * @param {*} network Network name
 */

export const returnNetworkText = (network) => {
    switch (network) {
        case "facebook":
            return "Suivez-nous sur Facebook"
        case "instagram":
            return "Suivez-nous sur Instagram"
        case "twitter":
            return "Suivez-nous sur Twitter"
        case "snapchat":
            return "Suivez-nous sur Snapchat"
        case "youtube":
            return "Suivez-nous sur YouTube"
        case "twitch":
            return "Suivez-nous sur Twitch"
        case "pinterest":
            return "Suivez-nous sur Pinterest"
        case "linkedin":
            return "Suivez-nous sur LinkedIn"
        default:
            return "Visitez notre site web"
    }
}

/**
 * Remove 'https://' and 'http://' from URL
 * @param {*} url Selected URL
 */

export const replaceHTTP = (url) => {
    if (url.includes('https://')) {
        let string = url.replace('https://', '')
        return string
    } else if (url.includes('http://')) {
        const string = url.replace('http://', '')
        return string
    }
}