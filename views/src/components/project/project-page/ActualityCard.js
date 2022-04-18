import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Mousewheel } from "swiper";
import "swiper/css/navigation";
import 'swiper/css';
import { convertDeltaToHTML } from '../../tools/functions/function';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

const ActualityCard = ({ project }) => {
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
                <Link to={`/project/${project.URLID}/${project.URL}/actuality`}><h3>Actualités</h3></Link>
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
                    {project.actualities.map((element, key) => {
                        return (
                            <SwiperSlide key={key} className="actuality-slide">
                                <h4>{element.title}</h4>
                                <div dangerouslySetInnerHTML={convertDeltaToHTML(element.description)}></div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    )
}

export default ActualityCard