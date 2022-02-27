import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import { dateParser } from '../components/Utils';
import AddBloc from '../components/project/AddBloc';
import { NavLink } from 'react-router-dom';
import { UidContext, UserContext } from '../components/AppContext';
import 'reactjs-popup/dist/index.css'
import { IoIosHeart } from "react-icons/io"
import Loader from '../components/tools/Loader';
import { avatar, projectPicture } from '../components/tools/functions/useAvatar';
import { parseDescription } from '../components/tools/functions/parseDescription';
import SortComponent from '../components/project/my-projects/SortComponent';

const MyProjects = () => {
  const uid = useContext(UidContext)
  const user = useContext(UserContext)
  const [isLoading, setLoading] = useState(true)
  const [nbOfRes, setNbOfRes] = useState([])
  const [axiosRes, setAxiosRes] = useState([])
  const [sortedTable, setSortedTable] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setNbOfRes(user.created_projects.length)
      if (user.created_projects.length === 0) { setLoading(false) }
      if (user.created_projects.length > 0) {
        const projects = user.created_projects.map(async (projectID) => {
          return await axios
            .get(`${process.env.REACT_APP_API_URL}api/project/single/${projectID}`)
            .then((res) => res.data)
        })
        Promise.all(projects).then((res) => {
          setAxiosRes(res)
          setSortedTable(res)
          setLoading(false)
        })
      }
    }
    fetchData()
  }, [uid, user])

  return (
    <div className="container projects-page">
      <div className="projects-container">
        <AddBloc />
        <SortComponent table={axiosRes} setSortedTable={setSortedTable} />

        {isLoading && (<Loader />)}
        {!isLoading && (
          <div className="container myprojects-container">
            {(nbOfRes > 0) ? (
              sortedTable.map((element, key) => {
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

                      <div className="description"><p dangerouslySetInnerHTML={parseDescription(element)}></p></div>

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