import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Mousewheel } from "swiper";
import "swiper/css/navigation";
import 'swiper/css';
import ProjectModal from './ProjectModal';
import ProfilCard from '../tools/components/ProfilCard';
import LikersModal from '../tools/components/LikersModal';
import FollowersModal from '../tools/components/FollowersModal';
import FavoriteButton from '../tools/components/FavoriteButton';
import FollowersButton from '../tools/components/FollowersButton';
import LikersButton from '../tools/components/LikersButton';
import { projectPicture } from '../tools/functions/useAvatar';
import { parseDescriptionToInnerHTML } from '../tools/functions/parseDescription';
import { dateParser } from '../Utils';
import { stateToBackground, stateToString } from './functions';
import { ImArrowLeft2, ImArrowRight2 } from 'react-icons/im'
import { MdZoomOutMap } from 'react-icons/md'
import { BsFillPeopleFill } from 'react-icons/bs'
import { SmallAvatar } from '../tools/components/Avatars';

const ProjectsSwiper = ({ projects, isLoading, websocket, user }) => {
    const [swiper, setSwiper] = React.useState();
    const [openProfilCard, setOpenProfilCard] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [openFollowersModal, setOpenFollowersModal] = useState(false)
    const [openLikersModal, setOpenLikersModal] = useState(false)
    const [isUser, setUser] = useState()
    const [project, setProject] = useState()
    const prevRef = useRef()
    const nextRef = useRef()

    const getUser = (userId) => { setUser(userId); setOpenProfilCard(true) }
    const getProject = (project) => { setProject(project); setOpenModal(true) }

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
            <div className="swiper-button previous" ref={prevRef}><ImArrowLeft2 /></div>
            <Swiper
                slidesPerView="auto"
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
                                <div className="swiper-card">
                                    <div className="swiper-img" style={projectPicture('img/paysage-2.jpg')}></div>
                                    <MdZoomOutMap className="zoom-it" onClick={() => getProject(element)} />
                                    <FavoriteButton project={element} />
                                    <div className="swiper-card-body">
                                        <div className="title"><h3>{element.title}</h3><span>{element.location + ", " + element.department + " - " + element.category}</span></div>
                                        <div className="swiper-card-head">
                                            <div className="contributors"><BsFillPeopleFill /><p>{element.numberofcontributors}</p></div>
                                            <div className={`state ${stateToBackground(element)}`}>{stateToString(element.state)}</div>
                                        </div>
                                        <div className="description">{element.description}</div>

                                        <div className="swiper-card-footer">
                                            <div className="footer-left">
                                                <LikersButton project={element} onClick={() => { setProject(element); setOpenLikersModal(true) }} />
                                                <FollowersButton project={element} onClick={() => { setProject(element); setOpenFollowersModal(true) }} />
                                            </div>
                                            <div className="footer-right">
                                                <div className="footer-avatar">
                                                    <SmallAvatar pic={element.posterAvatar} />
                                                </div>
                                                <div className="footer-name">
                                                    <p className="name" onClick={() => getUser(element.posterId)}>{element.posterPseudo}</p>
                                                    <p className="date">{dateParser(element.createdAt)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                ) : (
                    [...Array(15)].map((element, key) => {
                        return (
                            <SwiperSlide key={key} className="swiper-slide">
                                <div className="swiper-card">
                                    <div className="swiper-img animate-pulse bg-slate-600"></div>
                                    <MdZoomOutMap className="zoom-it" />
                                    <div className="swiper-card-body">
                                        <p className="animate-pulse bg-slate-600 h-4 w-full pb-2 mb-2 rounded-full"></p>
                                        <p className="animate-pulse bg-slate-600 h-4 w-full pb-2 mb-2 rounded-full"></p>
                                        <div className="flex justify-between items-center py-2">
                                            <div className="flex items-center">
                                                <BsFillPeopleFill />
                                                <div className="animate-pulse bg-slate-600 h-5 w-7 ml-[8px] rounded-full"></div>
                                            </div>
                                            <div className="animate-pulse bg-slate-600 rounded-full w-[130px] h-5"></div>
                                        </div>
                                        <div className="animate-pulse bg-slate-600 h-[90px] w-full rounded-xl pb-2"></div>

                                        <div className="grid grid-cols-2 mt-3">
                                            <div className="flex flex-col">
                                                <div className="animate-pulse bg-slate-600 h-5 w-[110px] rounded-full"></div>
                                                <div className="animate-pulse bg-slate-600 h-5 mt-2 w-[110px] rounded-full"></div>
                                            </div>
                                            <div className="grid grid-cols-2 justify-end">
                                                <div className="animate-pulse bg-slate-600 w-8 h-8 rounded-full ml-auto mr-2"></div>
                                                <div className="w-full">
                                                    <div className="animate-pulse bg-slate-600 w-full h-5 rounded-full"></div>
                                                    <div className="animate-pulse bg-slate-600 w-full h-5 rounded-full mt-2"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                )}
            </Swiper>
            <div className="swiper-button next" ref={nextRef}><ImArrowRight2 /></div>

            {openModal && <ProjectModal project={project} open={openModal} setOpen={setOpenModal} />}
            {openProfilCard && <ProfilCard isUser={isUser} open={openProfilCard} setOpen={setOpenProfilCard} />}
            {openFollowersModal && <FollowersModal project={project} open={openFollowersModal} setOpen={setOpenFollowersModal} websocket={websocket} user={user} />}
            {openLikersModal && <LikersModal project={project} open={openLikersModal} setOpen={setOpenLikersModal} websocket={websocket} user={user} />}
        </>
    )
}

export default ProjectsSwiper;