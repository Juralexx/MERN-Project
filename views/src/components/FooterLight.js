import React from 'react'

const FooterLight = () => {
    return (
        <div id="footer" className='footer-light'>
            <div className="container">
                <div className="flex items-center sm:justify-between flex-col sm:flex-row py-4">
                    <div className="flex lg:items-center lg:flex-row flex-col">
                        <a href="/" className="txt-sec mb-2 lg:mb-0 lg:mr-3">Conditions d'utilisation</a>
                        <a href="/" className="txt-sec mb-2 lg:mb-0 lg:mr-3">Politique de confidentialité</a>
                        <a href="/" className="txt-sec mb-2 lg:mb-0 lg:mr-3">Politique en matière de cookies</a>
                    </div>
                    <div className="flex items-center txt-sec mt-6 sm:mt-0">
                        <div className="w-7 h-7 mr-2">
                            <img src={`${process.env.REACT_APP_API_URL}files/img/logo.png`} alt="" />
                        </div>
                        <div className='brand-name'>Projectit Ltd. © 2022</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterLight