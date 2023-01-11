import React from 'react'
import { FacebookShareButton, LinkedinShareButton, PinterestShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import Icon from '../../tools/icons/Icon';

const Share = ({ share }) => {
    const url = window.location.href
    const socialsArr = [{
        button: FacebookShareButton,
        name: 'Facebook',
        picto: <Icon name="Facebook" />
    }, {
        button: LinkedinShareButton,
        name: 'Linkedin',
        picto: <Icon name="Linkedin" />
    }, {
        button: PinterestShareButton,
        name: 'Pinterest',
        picto: <Icon name="Pinterest" />
    }, {
        button: TwitterShareButton,
        name: 'Twitter',
        picto: <Icon name="Twitter" />
    }, {
        button: WhatsappShareButton,
        name: 'Whatsapp',
        picto: <Icon name="Whatsapp" />
    }]

    return (
        share && (
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
                    <button className='copy-link' onClick={() => navigator.clipboard.writeText(url)}>
                        <Icon name="Link" />Copier le lien
                    </button>
                </div>
            </div>
        )
    )
}

export default Share