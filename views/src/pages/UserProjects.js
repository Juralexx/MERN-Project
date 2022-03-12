import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import { dateParser } from '../components/Utils';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { UidContext } from '../components/AppContext';
import Loader from '../components/tools/components/Loader';
import LikersModal from '../components/tools/components/LikersModal';
import FollowersModal from '../components/tools/components/FollowersModal';
import FavoriteButton from '../components/tools/components/FavoriteButton';
import { avatar, projectPicture } from '../components/tools/functions/useAvatar';

const UserProjects = () => {
    const { pseudo } = useParams()
    const uid = useContext(UidContext)
    const [isLoading, setLoading] = useState(true)
    const [nbOfRes, setNbOfRes] = useState([])
    const [axiosRes, setAxiosRes] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}api/user/profil/${pseudo}`)
                if (!data) { navigate('/') }

                const checkarray = data.created_projects
                setNbOfRes(checkarray.length)

                if (checkarray.length > 0) {
                    const projects = checkarray.map(async (projectID) => {
                        return await axios
                            .get(`${process.env.REACT_APP_API_URL}api/project/single/${projectID}`)
                            .then((res) => res.data)
                            .catch((e) => console.error(e));
                    })
                    Promise.all(projects).then((res) => {
                        setAxiosRes(res)
                        setLoading(false)
                    });
                }
            } catch (err) {
                console.error(err)
            }
        };
        fetch();
    }, [uid, navigate, pseudo]);

    return (
        <div className="container projects-page">
            <div className="projects-container">
                {isLoading && (<Loader />)}
                {!isLoading && (
                    <div className="container myprojects-container">
                        {(nbOfRes > 0) ? (
                            axiosRes.map((element, key) => {
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

                                return (
                                    <div className="myprojects-card" key={key}>
                                        <div className="left" style={projectPicture(element.picture)}></div>
                                        <div className="right">
                                            <h2><NavLink to={"/project/" + element.titleURL}>{element.title}</NavLink></h2>
                                            <div className="pseudo-container">
                                                <div className="avatar" style={avatar(element.posterAvatar)}></div> <NavLink to={"/" + element.posterPseudo}>{element.posterPseudo}</NavLink>
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div>
                                <p>Cet utilisateur n'a pas encore publié de projet</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserProjects;