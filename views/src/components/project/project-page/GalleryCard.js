import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Mousewheel } from "swiper";
import "swiper/css/navigation";
import 'swiper/css';
import NoContent from './NoContent';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlinePhotoLibrary } from 'react-icons/md';
import { fullImage } from '../../Utils';

const GalleryCard = ({ project, user }) => {
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

        <div className="content-card gallery_card">
            <div className="card-title">
                <Link to={`/project/${project.URLID}/${project.URL}/gallery`}><h3>Galerie</h3></Link>
                {project.pictures.length > 1 &&
                    <div className="flex">
                        <div className="swiper-button previous mr-1" ref={prevRef}><MdOutlineKeyboardArrowLeft /></div>
                        <div className="swiper-button next" ref={nextRef}><MdOutlineKeyboardArrowRight /></div>
                    </div>
                }
            </div>
            {project.pictures.length > 1 ? (
                <div className="card-body">
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
                                    <div style={fullImage(element)}></div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            ) : (
                <NoContent className="gallery_card" project={project} user={user} icon={<MdOutlinePhotoLibrary />} text="Suivez le projet pour savoir quand des photos seront ajoutées !" />
            )}
        </div>
    )
}

export default GalleryCard