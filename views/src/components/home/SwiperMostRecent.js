import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Mousewheel } from "swiper";
import "swiper/css/navigation";
import 'swiper/css';
import 'reactjs-popup/dist/index.css'
import { avatar, projectPicture } from '../tools/functions/useAvatar';
import { parseDescription } from '../tools/functions/parseDescription';
import { dateParser } from '../Utils';
import LikersModal from '../project/my-projects/LikersModal';
import FollowersModal from '../project/my-projects/FollowersModal';
import FavoriteButton from '../project/my-projects/FavoriteButton';
import { BsFillPersonFill } from 'react-icons/bs'
import { Oval } from 'react-loading-icons'
import { MdZoomOutMap } from 'react-icons/md'
import ProjectModal from './ProjectModal';

const SwiperMostRecent = ({ projects }) => {
    const [isLoading, setLoading] = useState(false)
    const [sortedTable, setSortedtable] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [project, setProject] = useState()

    useEffect(() => {
        const sort = projects.sort((a, b) => { return b.createdAt.localeCompare(a.createdAt) })
        setSortedtable(sort)
        setLoading(false)
    }, [isLoading, projects])

    const getProject = (project) => {
        setProject(project)
        setOpenModal(true)
    }

    return (
        <>
            {openModal && <ProjectModal project={project} open={openModal} setOpen={setOpenModal} />}
            <Swiper
                slidesPerView={3}
                navigation={true}
                keyboard={{ enabled: true }}
                mousewheel={true}
                modules={[Navigation, Keyboard, Mousewheel]}
                style={{ maxWidth: 1120 }}
            >
                {sortedTable.map((element, key) => {
                    return (
                        <SwiperSlide key={key} style={{ width: "33.333%", display: "flex", justifyContent: "center" }}>
                            {isLoading && (<Oval />)}
                            <div className="home-project-card">
                                <div className="left" style={projectPicture('img/paysage.jpg')}>
                                    <MdZoomOutMap className="deploy-project" onClick={() => getProject(element)} />
                                    <FavoriteButton project={element} />
                                </div>
                                <div className="right">
                                    <div className="title">
                                        <h2><NavLink to={"/project/" + element.titleURL}>{element.title}</NavLink></h2>
                                        <p>{element.location + ", " + element.department + " - " + element.category}</p>
                                    </div>
                                    <div className="top">
                                        <div><BsFillPersonFill /><span>{element.numberofcontributors}</span></div>
                                        <div className="completed-status">{element.state}</div>
                                    </div>

                                    <div className="description"><p dangerouslySetInnerHTML={parseDescription(element)}></p></div>
                                    <div className="bottom">
                                        <div className="action-container">
                                            <div className="action">
                                                <LikersModal project={element} />
                                            </div>
                                            <div className="action">
                                                <FollowersModal project={element} />
                                            </div>
                                        </div>
                                        <div className="pseudo-container">
                                            <div className="avatar" style={avatar(element.posterAvatar)}></div>
                                            <div>
                                                <NavLink to={"/" + element.posterPseudo}>{element.posterPseudo}</NavLink>
                                                <p>{dateParser(element.createdAt)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
    )
}

export default SwiperMostRecent;