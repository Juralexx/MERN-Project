import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Mousewheel } from "swiper";
import "swiper/css/navigation";
import 'swiper/css';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { coverPicture } from '../../tools/functions/useAvatar';

const GalleryCard = ({ project }) => {
    const [swiper, setSwiper] = useState()
    const prevRef = useRef()
    const nextRef = useRef()

    useEffect(() => {
        if (swiper) {
            swiper.params.navigation.prevEl = prevRef.current
            swiper.params.navigation.nextEl = nextRef.current
            swiper.navigation.init()
            swiper.navigation.update()
        }
    }, [swiper])

    return (

        <div className="project-page-card">
            <div className="card-title">
                <div className="swiper-button previous" ref={prevRef}><MdOutlineKeyboardArrowLeft /></div>
                <Link to={`/project/${project.URLID}/${project.URL}/gallery`}><h3>Galerie</h3></Link>
                <div className="swiper-button next" ref={nextRef}><MdOutlineKeyboardArrowRight /></div>
            </div>
            <div className="card">
                <Swiper
                    slidesPerView={1}
                    keyboard={{ enabled: true }}
                    mousewheel={true}
                    loop="true"
                    onSwiper={setSwiper}
                    modules={[Navigation, Keyboard, Mousewheel]}
                    navigation={{ prevEl: prevRef?.current, nextEl: nextRef?.current }}
                >
                    {project.pictures.map((element, key) => {
                        return (
                            <SwiperSlide key={key} className="gallery-slide">
                                <div style={coverPicture(element)}></div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    )
}

export default GalleryCard