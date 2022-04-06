import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/home/Header';
import ProjectsSwiper from '../components/home/ProjectsSwiper';

const Home = ({ websocket, user }) => {
    const [projects, setProjects] = useState([])
    const [projectsByDate, setProjectsByDate] = useState([])
    const [projectsByLikes, setProjectsByLikes] = useState([])
    const [projectsByFollows, setProjectsByFollows] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            try {
                await axios.get(`${process.env.REACT_APP_API_URL}api/project/`)
                    .then(res => {
                        setProjects(res.data.sort(() => Math.random() - 0.5))
                        setProjectsByDate(res.data.sort((a, b) => Date.parse(a.createdAt) > Date.parse(b.createdAt) ? -1 : 1))
                        setProjectsByLikes(res.data.sort((a, b) => { return parseInt(a.likers.length) > parseInt(b.likers.length) ? -1 : 1 }))
                        setProjectsByFollows(res.data.sort((a, b) => { return parseInt(a.followers.length) > parseInt(b.followers.length) ? -1 : 1 }))
                        setLoading(false)
                    })
            } catch (err) { console.error(err) }
        }
        fetch()
    }, [projects.length])

    return (
        <>
            <Header />
            <div className="home-body">
                <div className="home-container">
                    <div className="swiper-container">
                        <h2>Les plus récent</h2>
                        <div className="swiper-inner">
                            <ProjectsSwiper projects={projectsByDate} isLoading={isLoading} websocket={websocket} user={user} />
                        </div>
                    </div>
                    <div className="swiper-container">
                        <h2>Tous les projets</h2>
                        <div className="swiper-inner">
                            <ProjectsSwiper projects={projects} isLoading={isLoading} websocket={websocket} user={user} />
                        </div>
                    </div>
                    <div className="swiper-container">
                        <h2>Les plus aimés</h2>
                        <div className="swiper-inner">
                            <ProjectsSwiper projects={projectsByLikes} isLoading={isLoading} websocket={websocket} user={user} />
                        </div>
                    </div>
                    <div className="swiper-container">
                        <h2>Les plus suivis</h2>
                        <div className="swiper-inner">
                            <ProjectsSwiper projects={projectsByFollows} isLoading={isLoading} websocket={websocket} user={user} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;