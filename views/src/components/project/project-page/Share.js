import React from 'react'
import { FacebookShareButton, LinkedinShareButton, PinterestShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { BsFacebook, BsLink45Deg, BsLinkedin, BsPinterest, BsTwitter } from 'react-icons/bs'
import { IoLogoWhatsapp } from 'react-icons/io5';

const Share = ({ share }) => {
    const url = window.location.href
    const socialsArr = [{
        button: FacebookShareButton,
        name: 'Facebook',
        picto: <BsFacebook />
    }, {
        button: LinkedinShareButton,
        name: 'Linkedin',
        picto: <BsLinkedin />
    }, {
        button: PinterestShareButton,
        name: 'Pinterest',
        picto: <BsPinterest />
    }, {
        button: TwitterShareButton,
        name: 'Twitter',
        picto: <BsTwitter />
    }, {
        button: WhatsappShareButton,
        name: 'Whatsapp',
        picto: <IoLogoWhatsapp />
    }]

    return (
        share &&
        <div className='share_container'>
            <h3>Partager cette page</h3>
            <div className='share_buttons_container'>
                {socialsArr.map((network, key) => {
                    return (
                        <network.button className={network.name.toLowerCase()} resetButtonStyle={false} url={url} media={url} key={key}>
                            {network.picto}
                            <p>{network.name}</p>
                        </network.button>
                    )
                })}
                <button className='copy-link' onClick={() => navigator.clipboard.writeText(url)}><BsLink45Deg />Copier le lien</button>
            </div>
        </div>
    )
}

export default Share