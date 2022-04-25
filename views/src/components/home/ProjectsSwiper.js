import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Mousewheel } from "swiper";
import "swiper/css/navigation";
import 'swiper/css';
import Card from '../tools/components/Card';
import CardLoading from '../tools/components/CardLoading';
import LikersModal from '../tools/components/LikersModal';
import FollowersModal from '../tools/components/FollowersModal';
import { ImArrowLeft2, ImArrowRight2 } from 'react-icons/im'

const ProjectsSwiper = ({ projects, isLoading, websocket, user }) => {
    const [swiper, setSwiper] = useState()
    const [openFollowersModal, setOpenFollowersModal] = useState(false)
    const [openLikersModal, setOpenLikersModal] = useState(false)
    const [project, setProject] = useState()
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
        <>
            <div className="nav-buttons">
                <div className="swiper-button previous" ref={prevRef}><ImArrowLeft2 /></div>
                <div className="swiper-button next" ref={nextRef}><ImArrowRight2 /></div>
            </div>
            <Swiper
                slidesPerView={3}
                spaceBetween={20}
                keyboard={{ enabled: true }}
                mousewheel={true}
                modules={[Navigation, Keyboard, Mousewheel]}
                onSwiper={setSwiper}
                navigation={{ prevEl: prevRef?.current, nextEl: nextRef?.current }}
            >
                {!isLoading ? (
                    projects.map((element, key) => {
                        return (
                            <SwiperSlide key={key} className="swiper-slide">
                                <Card
                                    element={element}
                                    setProject={setProject}
                                    setOpenLikersModal={setOpenLikersModal}
                                    setOpenFollowersModal={setOpenFollowersModal}
                                />
                            </SwiperSlide>
                        )
                    })
                ) : (
                    [...Array(15)].map((_, key) => {
                        return (
                            <SwiperSlide key={key} className="swiper-slide">
                                <CardLoading />
                            </SwiperSlide>
                        )
                    })
                )}
            </Swiper>

            {openFollowersModal && <FollowersModal project={project} open={openFollowersModal} setOpen={setOpenFollowersModal} websocket={websocket} user={user} />}
            {openLikersModal && <LikersModal project={project} open={openLikersModal} setOpen={setOpenLikersModal} websocket={websocket} user={user} />}
        </>
    )
}

export default ProjectsSwiper;