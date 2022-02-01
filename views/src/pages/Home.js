import React from 'react';
import SwiperBloc from '../components/home/SwiperBloc';
import LeftNav from '../components/LeftNav'
import Map from '../components/tools/map/Map';

const Home = () => {
  return (
    <>
      <LeftNav />
      <SwiperBloc/>
      <Map />
    </>
  );
}

export default Home;