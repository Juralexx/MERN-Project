import React, { useEffect, useState } from 'react';
import axios from "axios";
import { dateParser } from '../components/Utils';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import { NavLink } from 'react-router-dom';
import 'reactjs-popup/dist/index.css'
import FollowButton from '../components/project/my-projects/FollowButton';
import Loader from '../components/tools/Loader';
import LikersModal from '../components/project/my-projects/LikersModal';
import FollowersModal from '../components/project/my-projects/FollowersModal';

const MostLiked = () => {
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
                    console.log(sortedTable)
                });
            } catch (err) {
                console.error(err)
            }
        };
        fetch();
    }, [isLoading]);

    return (
        <div className="container projects-page">
            <div className="projects-container">
                <div className="container myprojects-container">
                    {isLoading && (<Loader />)}
                    {!isLoading && (
                        sortedTable.map((element, key) => {
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
                                <div className="myprojects-card" key={key}>
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
                                                <LikersModal project={element} />
                                            </div>
                                            <div className="content">
                                                <FollowersModal project={element} />
                                                <FollowButton project={element} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

export default MostLiked;