import React, { useState } from 'react'
import Title from './Title'
import Category from './Category'
import Location from './Location'
import End from './End'
import State from './State'
import Work from './Work'
import Content from './Content'
import HeaderNavbar from './HeaderNavbar'

const About = ({ project, user, websocket, isAdmin, isManager }) => {
    const [about, setAbout] = useState(true)
    const [galery, setGalery] = useState(false)
    const [actuality, setActuality] = useState(false)
    const [faq, setFaq] = useState(false)


    return (
        <div className="dashboard-about">
            <HeaderNavbar about={about} setAbout={setAbout} galery={galery} setGalery={setGalery} actuality={actuality} setActuality={setActuality} faq={faq} setFaq={setFaq} />
            {about &&
                <div className="dashboard-about-content">
                    <Title project={project} />
                    <Category project={project} />
                    <Location project={project} />
                    <End project={project} />
                    <State project={project} />
                    <Work project={project} />
                    {/* <Content project={project} /> */}
                </div>
            }

        </div>
    )
}

export default About