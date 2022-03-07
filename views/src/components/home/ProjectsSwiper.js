import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Mousewheel } from "swiper";
import "swiper/css/navigation";
import 'swiper/css';
import 'reactjs-popup/dist/index.css'
import ProjectModal from './ProjectModal';
import ProfilCard from '../tools/components/ProfilCard';
import { avatar, projectPicture } from '../tools/functions/useAvatar';
import { parseDescriptionToInnerHTML } from '../tools/functions/parseDescription';
import { dateParser } from '../Utils';
import { getState } from './functions';
import LikersModal from '../tools/components/LikersModal';
import FollowersModal from '../tools/components/FollowersModal';
import FavoriteButton from '../tools/components/FavoriteButton';
import { MdZoomOutMap } from 'react-icons/md'
import { BsFillPeopleFill } from 'react-icons/bs'
import FollowersButton from '../tools/components/FollowersButton';
import LikersButton from '../tools/components/LikersButton';

const ProjectsSwiper = ({ projects, isLoading }) => {
    const [openProfilCard, setOpenProfilCard] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [openFollowersModal, setOpenFollowersModal] = useState(false)
    const [openLikersModal, setOpenLikersModal] = useState(false)
    const [user, setUser] = useState()
    const [project, setProject] = useState()

    const getUser = (userId) => { setUser(userId); setOpenProfilCard(true) }
    const getProject = (project) => { setProject(project); setOpenModal(true) }

    return (
        <>
            {openModal && <ProjectModal project={project} open={openModal} setOpen={setOpenModal} />}
            {openProfilCard && <ProfilCard isUser={user} open={openProfilCard} setOpen={setOpenProfilCard} />}
            {openFollowersModal && <FollowersModal project={project} open={openFollowersModal} setOpen={setOpenFollowersModal} />}
            {openLikersModal && <LikersModal project={project} open={openLikersModal} setOpen={setOpenLikersModal} />}
            <Swiper
                slidesPerView="auto"
                navigation={true}
                keyboard={{ enabled: true }}
                mousewheel={true}
                modules={[Navigation, Keyboard, Mousewheel]}
                className="pb-8 pl-5"
            >
                {!isLoading ? (
                    projects.map((element, key) => {
                        return (
                            <SwiperSlide key={key} className="!w-auto mx-2 min-h-[426px] flex justify-center">
                                <div className="w-[365px] text-gray-500 dark:text-slate-300 cursor-pointer bg-white dark:bg-background_primary rounded-xl shadow-custom dark:shadow-lg">
                                    <div className="h-[160px] w-full rounded-t-xl" style={projectPicture('img/paysage-2.jpg')}></div>
                                    <MdZoomOutMap className="absolute top-2 right-4 w-[24px] h-[24px]" onClick={() => getProject(element)} />
                                    <FavoriteButton project={element} />
                                    <div className="py-3 px-4">
                                        <h3 className="flex flex-col pb-2 border-b border-gray-300/25 dark:border-slate-300/25">
                                            {element.title}
                                            <span className="text-slate-500 text-xs">
                                                {element.location + ", " + element.department + " - " + element.category}
                                            </span>
                                        </h3>
                                        <div className="flex justify-between items-center py-2">
                                            <div className="flex items-center">
                                                <BsFillPeopleFill />
                                                <p className="ml-[6px]">{element.numberofcontributors}</p>
                                            </div>
                                            <div className={`${getState(element)} px-3 py-[2px] rounded-full text-[14px]`}>{element.state}</div>
                                        </div>
                                        <div dangerouslySetInnerHTML={parseDescriptionToInnerHTML(element)} className="text-justify pb-2"></div>

                                        <div className="grid grid-cols-5">
                                            <div className="col-span-3 flex flex-col">
                                                <LikersButton project={element} onClick={() => { setProject(element); setOpenLikersModal(true) }} />
                                                <FollowersButton project={element} onClick={() => { setProject(element); setOpenFollowersModal(true) }} />
                                            </div>
                                            <div className="grid col-span-2 grid-cols-3 pt-2 justify-start">
                                                <div className="col-span-1 flex justify-center">
                                                    <div className="w-8 h-8 rounded-full" style={avatar(element.posterAvatar)}></div>
                                                </div>
                                                <div className="col-span-2 w-full mr-auto">
                                                    <p className="font-semibold" onClick={() => getUser(element.posterId)}>{element.posterPseudo}</p>
                                                    <p className="text-slate-500 text-xs">{dateParser(element.createdAt)}</p>
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
                            <SwiperSlide key={key} className="!w-[382px] min-h-[426px] flex justify-center">
                                <div className="w-[365px] text-slate-300 cursor-pointer bg-white dark:bg-background_primary rounded-xl shadow-xl">
                                    <div className="animate-pulse bg-slate-600 dark:bg-slate-700 h-[160px] w-full rounded-t-xl"></div>
                                    <MdZoomOutMap className="absolute top-2 right-4 w-[24px] h-[24px]" />
                                    <div className="py-3 px-4">
                                        <h3 className="animate-pulse bg-slate-600 dark:bg-slate-700 h-4 w-full pb-2 mb-2 rounded-full"></h3>
                                        <h3 className="animate-pulse bg-slate-600 dark:bg-slate-700 h-4 w-full pb-2 mb-2 rounded-full"></h3>
                                        <div className="flex justify-between items-center py-2">
                                            <div className="flex items-center">
                                                <BsFillPeopleFill />
                                                <div className="animate-pulse bg-slate-600 dark:bg-slate-700 h-5 w-7 ml-[8px] rounded-full"></div>
                                            </div>
                                            <div className="animate-pulse bg-slate-600 dark:bg-slate-700 px-3 py-[2px] rounded-full w-[130px] h-5"></div>
                                        </div>
                                        <div className="animate-pulse bg-slate-600 dark:bg-slate-700 h-[90px] w-full rounded-xl pb-2"></div>

                                        <div className="grid grid-cols-2 mt-3">
                                            <div className="flex flex-col">
                                                <div className="animate-pulse bg-slate-600 dark:bg-slate-700 h-5 w-[110px] rounded-full"></div>
                                                <div className="animate-pulse bg-slate-600 dark:bg-slate-700 h-5 mt-2 w-[110px] rounded-full"></div>
                                            </div>
                                            <div className="grid grid-cols-2 justify-end">
                                                <div className="animate-pulse bg-slate-600 dark:bg-slate-700 w-8 h-8 rounded-full ml-auto mr-2"></div>
                                                <div className="w-full">
                                                    <div className="animate-pulse bg-slate-600 dark:bg-slate-700 w-full h-5 rounded-full"></div>
                                                    <div className="animate-pulse bg-slate-600 dark:bg-slate-700 w-full h-5 rounded-full mt-2"></div>
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
        </>
    )
}

export default ProjectsSwiper;