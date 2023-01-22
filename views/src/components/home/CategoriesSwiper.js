import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Mousewheel } from "swiper";
import "swiper/css/navigation";
import 'swiper/css';
import { fullImage } from '../Utils';
import Icon from '../tools/icons/Icon';
import { categories } from '../../api/categories';

const CategoriesSwiper = () => {
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
        <div className="home_small_swiper border-b py-7">
            <h2>Catégories</h2>
            <div className="small_swiper">
                <div className="nav-buttons">
                    <div className="swiper-button previous" ref={prevRef}>
                        <Icon name="ArrowLeft" />
                    </div>
                    <div className="swiper-button next" ref={nextRef}>
                        <Icon name="ArrowRight" />
                    </div>
                </div>
                <Swiper
                    keyboard={{ enabled: true }}
                    mousewheel={true}
                    loop="true"
                    modules={[Navigation, Keyboard, Mousewheel]}
                    onSwiper={setSwiper}
                    navigation={{ prevEl: prevRef?.current, nextEl: nextRef?.current }}
                    slidesPerView="auto"
                    spaceBetween={20}
                    breakpoints={{
                        768: {
                            spaceBetween: 20,
                            slidesPerView: 4,
                        },
                        992: {
                            spaceBetween: 20,
                            slidesPerView: 5,
                        },
                        1200: {
                            spaceBetween: 20,
                            slidesPerView: 6,
                        },
                    }}
                >
                    {categories.map((element, key) => {
                        return (
                            <SwiperSlide key={key} className="small_slide">
                                <div className="small_slide_card" style={fullImage(element.img)}>
                                    <p>{element.name}</p>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    )
}

export default CategoriesSwiper