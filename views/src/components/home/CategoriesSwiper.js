import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Mousewheel } from "swiper";
import "swiper/css/navigation";
import 'swiper/css';
import { coverPicture } from '../tools/functions/useAvatar';
import { ImArrowLeft2, ImArrowRight2 } from 'react-icons/im';

const CategoriesSwiper = () => {
    const [swiper, setSwiper] = useState()
    const prevRef = useRef()
    const nextRef = useRef()

    const categories = [
        { name: "Art", url: `${process.env.REACT_APP_API_URL}files/categories/art.jpg` },
        { name: "Artisanat", url: `${process.env.REACT_APP_API_URL}files/categories/artisanat.jpg` },
        { name: "Cuisine", url: `${process.env.REACT_APP_API_URL}files/categories/cuisine.jpg` },
        { name: "Bien-être", url: `${process.env.REACT_APP_API_URL}files/categories/bien-etre.jpg` },
        { name: "Edition", url: `${process.env.REACT_APP_API_URL}files/categories/edition-et-journal.jpg` },
        { name: "Education", url: `${process.env.REACT_APP_API_URL}files/categories/education.jpg` },
        { name: "Film et vidéo", url: `${process.env.REACT_APP_API_URL}files/categories/film-et-video.jpg` },
        { name: "Jeux", url: `${process.env.REACT_APP_API_URL}files/categories/jeux.jpg` },
        { name: "Mode et design", url: `${process.env.REACT_APP_API_URL}files/categories/mode-et-design.jpg` },
        { name: "Musique", url: `${process.env.REACT_APP_API_URL}files/categories/musique.jpg` },
        { name: "Spectacle", url: `${process.env.REACT_APP_API_URL}files/categories/spectacle.jpg` },
        { name: "Patrimoine", url: `${process.env.REACT_APP_API_URL}files/categories/patrimoine.jpg` },
        { name: "Sport", url: `${process.env.REACT_APP_API_URL}files/categories/sport.jpg` },
        { name: "Technologie", url: `${process.env.REACT_APP_API_URL}files/categories/technologie.jpg` }
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
        <div className="home-category">
            <h2>Les catégories les plus populaires</h2>
            <div className="category-swiper">
                <div className="nav-buttons">
                    <div className="swiper-button previous" ref={prevRef}><ImArrowLeft2 /></div>
                    <div className="swiper-button next" ref={nextRef}><ImArrowRight2 /></div>
                </div>
                <Swiper
                    slidesPerView={6}
                    keyboard={{ enabled: true }}
                    mousewheel={true}
                    loop="true"
                    modules={[Navigation, Keyboard, Mousewheel]}
                    onSwiper={setSwiper}
                    navigation={{ prevEl: prevRef?.current, nextEl: nextRef?.current }}
                    spaceBetween={20}
                >
                    {categories.map((element, key) => {
                        return (
                            <SwiperSlide key={key} className="category-slide">
                                <div className="category-card" style={coverPicture(element.url)}>
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