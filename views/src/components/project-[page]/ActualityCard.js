import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Mousewheel } from "swiper";
import "swiper/css/navigation";
import 'swiper/css';
import { convertDeltaToHTML } from '../tools/editor/functions';
import NoContent from './NoContent';
import Icon from '../tools/icons/Icon';

const ActualityCard = ({ project, user }) => {
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
        <div className="content-card actuality_card">
            <div className="card-title">
                <h3>
                    <Link to={`/project/${project.URLID}/${project.URL}/actuality`}>Actualités</Link>
                </h3>
                {project.actualities.length > 0 &&
                    <div className="flex">
                        <div className="swiper-button previous mr-1" ref={prevRef}>
                            <Icon name="CaretLeft" />
                        </div>
                        <div className="swiper-button next" ref={nextRef}>
                            <Icon name="CaretRight" />
                        </div>
                    </div>
                }
            </div>
            {project.actualities.length > 0 ? (
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
            ) : (
                <NoContent
                    className="actuality_card"
                    project={project}
                    user={user}
                    icon={<Icon name="BookOpen" />}
                    text="Suivez le projet pour savoir quand une nouvelle actualité sera ajoutée !"
                />
            )}
        </div>
    )
}

export default ActualityCard