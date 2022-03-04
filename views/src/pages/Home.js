import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/home/Header';
import { Container, Divider, Typography } from '@mui/material';
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
                        setProjectsByDate(res.data.sort((a, b) =>  Date.parse(a.createdAt) > Date.parse(b.createdAt) ? -1 : 1 ))
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
            <Container maxWidth="false" sx={{ maxWidth: "1366px" }}>
                <Divider textAlign="left" sx={{ margin: "20px 0" }}>
                    <Typography variant="h5" component="p">Les plus récent</Typography>
                </Divider>
                <ProjectsSwiper projects={projectsByDate} isLoading={isLoading} />
                <Divider textAlign="left" sx={{ margin: "20px 0" }}>
                    <Typography variant="h5" component="p">Tous les projets</Typography>
                </Divider>
                <ProjectsSwiper projects={projects} isLoading={isLoading} />
                <Divider textAlign="left" sx={{ margin: "20px 0" }}>
                    <Typography variant="h5" component="p">Les plus aimés</Typography>
                </Divider>
                <ProjectsSwiper projects={projectsByLikes} isLoading={isLoading} />
                <Divider textAlign="left" sx={{ margin: "20px 0" }}>
                    <Typography variant="h5" component="p">Les plus suivis</Typography>
                </Divider>
                <ProjectsSwiper projects={projectsByFollows} isLoading={isLoading} />
            </Container>
        </>
    );
}

export default Home;