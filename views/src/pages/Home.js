import React from 'react';
import Header from '../components/home/Header';
import SwiperBloc from '../components/home/SwiperBloc';
import LeftNav from '../components/LeftNav'
import Map from '../components/tools/map/Map';

const Home = () => {
  return (
    <>
      <Header />
      <LeftNav />
      <SwiperBloc />
      <Map />
    </>
  );
}

export default Home;