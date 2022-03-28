import React from 'react'

const HeaderNavbar = ({ about, setAbout, galery, setGalery, actuality, setActuality, faq, setFaq}) => {
    const addActive = (state, classe) => { if (state) { return classe } else { return "" } }
    const move = (firstState, secondState, thirdState, fourthState) => {
        firstState(true)
        secondState(false)
        thirdState(false)
        fourthState(false)
    }

    return (
        <div className="projects-about-navbar">
            <div className="projects-about-navbar-content">
                <div className={`projects-about-navbar-item ${addActive(about, "active")}`} onClick={() => move(setAbout, setGalery, setActuality, setFaq)}>À propos</div>
                <div className={`projects-about-navbar-item ${addActive(galery, "active")}`} onClick={() => move(setGalery, setAbout, setActuality, setFaq)}>Galerie</div>
                <div className={`projects-about-navbar-item ${addActive(actuality, "active")}`} onClick={() => move(setActuality, setGalery, setAbout, setFaq)}>Actualités</div>
                <div className={`projects-about-navbar-item ${addActive(faq, "active")}`} onClick={() => move(setFaq, setGalery, setActuality, setAbout)}>FAQ</div>
            </div>
        </div>
    )
}

export default HeaderNavbar