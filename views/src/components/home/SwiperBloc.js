import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Mousewheel } from "swiper";
import 'swiper/css';
import "swiper/css/navigation";
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import { NavLink } from 'react-router-dom';
import 'reactjs-popup/dist/index.css'
import { dateParser } from '../Utils';
import FollowButton from '../project/my-projects/FollowButton';
import LikersModal from '../project/my-projects/LikersModal';
import FollowersModal from '../project/my-projects/FollowersModal';
import { Oval } from 'react-loading-icons'
import FavoriteButton from '../project/my-projects/FavoriteButton';

const SwiperBloc = () => {
    const [isLoading, setLoading] = useState(true)
    const [axiosRes, setAxiosRes] = useState([])
    const [sortedTable, setSortedtable] = useState([])

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}api/project/`)
                const projects = data.map(async (project) => {
                    return await axios
                        .get(`${process.env.REACT_APP_API_URL}api/project/single/${project._id}`)
                        .then((res) => res.data)
                        .catch((e) => console.error(e));
                })
                Promise.all(projects).then((res) => {
                    setAxiosRes(res)
                    const sort = axiosRes.sort((a, b) => { return b.likers.length - a.likers.length })
                    setSortedtable(sort)
                    setLoading(false)
                })
            } catch (err) {
                console.error(err)
            }
        };
        fetch();
    }, [isLoading]);

    return (
        <Swiper
            spaceBetween={20}
            slidesPerView={2}
            navigation={true}
            keyboard={{ enabled: true }}
            mousewheel={true}
            modules={[Navigation, Keyboard, Mousewheel]}
            style={{ maxWidth: 1020 }}
        >
            {sortedTable.map((element, key) => {
                var description = element.content[0].ops
                var callback = {}
                var converter = new QuillDeltaToHtmlConverter(description, callback)
                var html = converter.convert(description)
                function getDescription() {
                    if (html.length >= 150) {
                        if (html.substring(149, 150) === " ") {
                            var cleanSpaces = html.replace(html.substring(149, 150), "")
                            html = cleanSpaces.substring(0, 150) + "..."
                        }
                        html = html.substring(0, 150) + "..."
                    }
                    return ({ __html: html })
                }
                const projectPicture = { backgroundImage: "url(" + element.picture + ")", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }
                const avatar = { backgroundImage: "url(" + element.posterAvatar + ")", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }

                return (
                    <SwiperSlide
                        key={key}
                        style={{ width: "50%", display: "flex", justifyContent: "center" }}>

                        {isLoading && (<Oval />)}
                        <div className="myprojects-card" style={{ transform: "scale(0.6)" }}>
                            <div className="left" style={projectPicture}></div>
                            <div className="right">
                                <h2><NavLink to={"/project/" + element.titleURL}>{element.title}</NavLink></h2>
                                <div className="pseudo-container">
                                    <div className="avatar" style={avatar}></div> <NavLink to={"/" + element.posterPseudo}>{element.posterPseudo}</NavLink>
                                </div>

                                <p>{dateParser(element.createdAt)}</p>
                                <p>{element.category}</p>
                                <p>{element.location}</p>
                                <p>{element.numberofcontributors + " personnes recherchées"}</p>

                                <div className="description"><p dangerouslySetInnerHTML={getDescription()}></p></div>

                                <div className="action-container">
                                    <div className="content">
                                        <FavoriteButton project={element} />
                                    </div>
                                    <div className="content">
                                        <LikersModal project={element} />
                                    </div>
                                    <div className="content">
                                        <FollowersModal project={element} />
                                        <FollowButton project={element} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                )
            })
            }
        </Swiper>
    )
}

export default SwiperBloc;