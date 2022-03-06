import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/home/Header';
import ProjectsSwiper from '../components/home/ProjectsSwiper';

const Home = () => {
    const [projects, setProjects] = useState([])
    const [projectsByDate, setProjectsByDate] = useState([])
    const [projectsByLikes, setProjectsByLikes] = useState([])
    const [projectsByFollows, setProjectsByFollows] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            try {
                await axios.get(`${process.env.REACT_APP_API_URL}api/project/`)
                    .then((res) => {
                        setProjects(res.data.sort(() => Math.random() - 0.5))
                        setProjectsByDate(res.data.sort((a, b) => Date.parse(a.createdAt) > Date.parse(b.createdAt) ? -1 : 1))
                        setProjectsByLikes(res.data.sort((a, b) => { return parseInt(a.likers.length) > parseInt(b.likers.length) ? -1 : 1 }))
                        setProjectsByFollows(res.data.sort((a, b) => { return parseInt(a.followers.length) > parseInt(b.followers.length) ? -1 : 1 }))
                        setLoading(false)
                    })
            } catch (err) { console.error(err) }
        }
        fetch()
    }, [projects.length, isLoading])

    return (
        <>
            <Header />
            <div className="w-full bg-white dark:bg-gradient-to-r from-background_primary to-background_primary_light">
                <div className="container mx-auto">
                    <p className="text-3xl py-6 text-center text-gray-500 dark:text-slate-300">Les plus récent</p>
                    <ProjectsSwiper projects={projectsByDate} isLoading={isLoading} />

                    <p className="text-3xl py-6 mt-10 text-center text-gray-500 dark:text-slate-300">Tous les projets</p>
                    <ProjectsSwiper projects={projects} isLoading={isLoading} />

                    <p className="text-3xl py-6 mt-10 text-center text-gray-500 dark:text-slate-300">Les plus aimés</p>
                    <ProjectsSwiper projects={projectsByLikes} isLoading={isLoading} />

                    <p className="text-3xl py-6 mt-10 text-center text-gray-500 dark:text-slate-300">Les plus suivis</p>
                    <ProjectsSwiper projects={projectsByFollows} isLoading={isLoading} />
                </div>
            </div>
        </>
    );
}

export default Home;