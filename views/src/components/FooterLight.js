import React from 'react'

const FooterLight = () => {
    return (
        <div id="footer">
            <div className="box">
                <div className="footer-bottom">
                    <div className="footer-bottom-left">
                        <a href="/">Conditions d'utilisation</a>
                        <a href="/">Politique de confidentialité</a>
                        <a href="/">Politique en matière de cookies</a>
                    </div>
                    <div className="footer-bottom-right">
                        <div className="footer-logo">
                            <img src={`${process.env.REACT_APP_API_URL}files/img/logo.png`} alt="" />
                        </div>
                        <div>Redux Ltd. © 2022</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterLight