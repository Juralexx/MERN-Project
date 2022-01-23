import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import { dateParser } from '../components/Utils';
import AddBloc from '../components/project/AddBloc';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import { NavLink } from 'react-router-dom';
import { UidContext } from '../components/AppContext';
import 'reactjs-popup/dist/index.css'
import { IoIosHeart } from "react-icons/io"
import Loader from '../components/tools/Loader';

const MyProjects = () => {
  const uid = useContext(UidContext)
  const [isLoading, setLoading] = useState(true)
  const [nbOfRes, setNbOfRes] = useState([])
  const [axiosRes, setAxiosRes] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
        const checkarray = data.createdProjects
        setNbOfRes(checkarray.length)

        if(checkarray.length === 0) { setLoading(false) }

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
  }, [uid]);

  return (
    <div className="container projects-page">
      <div className="projects-container">
        <AddBloc />

        {isLoading && (<Loader />)}
        {!isLoading && (
          <div className="container myprojects-container">
            {(nbOfRes > 0) ? (
              axiosRes.map((element, key) => {
                var description = element.content[0].ops
                var callback = {}
                var deltaOps = description
                var converter = new QuillDeltaToHtmlConverter(deltaOps, callback)
                var html = converter.convert(deltaOps)
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
                const avatar = {  backgroundImage: "url(" + element.posterAvatar + ")", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }
                const projectPicture = { backgroundImage: "url(" + element.picture + ")", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }
                
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
                        <div className="top">
                          <p><IoIosHeart /> {element.likers.length}</p>
                          <p>Suivi par {element.followers.length} personnes</p>
                        </div>
                      </div>

                    </div>
                  </div>
                )
              })
            ) : (
              <div>
                <p>Vous n'avez pas encore ajouté de projet</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProjects;