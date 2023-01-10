import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Mousewheel } from "swiper";
import "swiper/css/navigation";
import 'swiper/css';
import { coverPicture } from '../tools/hooks/useAvatar';
import { ImArrowLeft2, ImArrowRight2 } from 'react-icons/im';

const TagsSwiper = () => {
    const [swiper, setSwiper] = useState()
    const prevRef = useRef()
    const nextRef = useRef()

    const tags = [
        {
            name: "Art",
            url: `${process.env.REACT_APP_API_URL}files/tags/art.jpg`
        },
        {
            name: "Artisanat",
            url: `${process.env.REACT_APP_API_URL}files/tags/artisanat.jpg`
        },
        {
            name: "Cuisine",
            url: `${process.env.REACT_APP_API_URL}files/tags/cuisine.jpg`
        },
        {
            name: "Bien-être",
            url: `${process.env.REACT_APP_API_URL}files/tags/bien-etre.jpg`
        },
        {
            name: "Edition",
            url: `${process.env.REACT_APP_API_URL}files/tags/edition-et-journal.jpg`
        },
        {
            name: "Education",
            url: `${process.env.REACT_APP_API_URL}files/tags/education.jpg`
        },
        {
            name: "Film et vidéo",
            url: `${process.env.REACT_APP_API_URL}files/tags/film-et-video.jpg`
        },
        {
            name: "Jeux",
            url: `${process.env.REACT_APP_API_URL}files/tags/jeux.jpg`
        },
        {
            name: "Mode et design",
            url: `${process.env.REACT_APP_API_URL}files/tags/mode-et-design.jpg`
        },
        {
            name: "Musique",
            url: `${process.env.REACT_APP_API_URL}files/tags/musique.jpg`
        },
        {
            name: "Spectacle",
            url: `${process.env.REACT_APP_API_URL}files/tags/spectacle.jpg`
        },
        {
            name: "Patrimoine",
            url: `${process.env.REACT_APP_API_URL}files/tags/patrimoine.jpg`
        },
        {
            name: "Sport",
            url: `${process.env.REACT_APP_API_URL}files/tags/sport.jpg`
        },
        {
            name: "Technologie",
            url: `${process.env.REACT_APP_API_URL}files/tags/technologie.jpg`
        }
    ]

    useEffect(() => {
        if (swiper) {
            swiper.params.navigation.prevEl = prevRef.current
            swiper.params.navigation.nextEl = nextRef.current
            swiper.navigation.init()
            swiper.navigation.update()
        }
    }, [swiper])

    return (
        <div className="home_small_swiper !pb-[80px]">
            <h2>Les tags les plus populaires</h2>
            <div className="small_swiper">
                <div className="nav-buttons">
                    <div className="swiper-button previous" ref={prevRef}>
                        <ImArrowLeft2 />
                    </div>
                    <div className="swiper-button next" ref={nextRef}>
                        <ImArrowRight2 />
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
                    {tags.map((element, key) => {
                        return (
                            <SwiperSlide key={key} className="small_slide">
                                <div className="small_slide_card" style={coverPicture(element.url)}>
                                    <p>#{element.name}</p>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>

            <div className="tiny_swiper">
                <Swiper
                    keyboard={{ enabled: true }}
                    mousewheel={true}
                    loop="true"
                    modules={[Navigation, Keyboard, Mousewheel]}
                    onSwiper={setSwiper}
                    slidesPerView="auto"
                    spaceBetween={20}
                >
                    {tags.slice(6, 12).map((element, key) => {
                        return (
                            <SwiperSlide key={key} className="tiny_slide">
                                <div className="tiny_card" key={key}>
                                    <div className="tiny_card-img" style={coverPicture(element.url)}></div>
                                    <div className="tiny_card-text">#{element.name}</div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    )
}

export default TagsSwiper