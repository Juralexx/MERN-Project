import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/home/Header';
import SwiperAllProjects from '../components/home/SwiperAllProjects';
import SwiperMostFollowed from '../components/home/SwiperMostFollowed';
import SwiperMostLiked from '../components/home/SwiperMostLiked';
import SwiperMostRecent from '../components/home/SwiperMostRecent';
import LeftNav from '../components/LeftNav'
import Map from '../components/tools/map/Map';

const Home = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}api/project/`)
        const allProjects = data.map(async (project) => {
          return await axios
            .get(`${process.env.REACT_APP_API_URL}api/project/single/${project._id}`)
            .then((res) => res.data)
            .catch((e) => console.error(e));
        })
        Promise.all(allProjects).then((res) => {
          setProjects(res)
        })
      } catch (err) {
        console.error(err)
      }
    };
    fetch();
  }, []);

  return (
    <>
      <Header />
      <LeftNav />
      <div className="home-swipers">
        <h2 className="swiper-title">Les plus récents</h2>
        <SwiperMostRecent projects={projects} />
        <h2 className="swiper-title">Tout les projets</h2>
        <SwiperAllProjects projects={projects} />
        <h2 className="swiper-title">Les plus aimés</h2>
        <SwiperMostLiked projects={projects} />
        <h2 className="swiper-title">Les plus suivis</h2>
        <SwiperMostFollowed projects={projects} />
      </div>
      <Map />
    </>
  );
}

export default Home;