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

  const [sortedTable, setSortedTable] = useState([])
  const [sortedValue, setSortedValue] = useState("Trier")
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
        const checkarray = data.created_projects
        setNbOfRes(checkarray.length)

        if (checkarray.length === 0) { setLoading(false) }

        if (checkarray.length > 0) {
          const projects = checkarray.map(async (projectID) => {
            return await axios
              .get(`${process.env.REACT_APP_API_URL}api/project/single/${projectID}`)
              .then((res) => res.data)
              .catch((e) => console.error(e));
          })
          Promise.all(projects).then((res) => {
            setAxiosRes(res)
            setSortedTable(res)
            setLoading(false)
          });
        }
      } catch (err) {
        console.error(err)
      }
    };
    fetch();
  }, [uid]);

  function sortByLikes() {
    const sort = axiosRes.sort((a, b) => { return b.likers.length - a.likers.length })
    setSortedTable(sort)
    setSortedValue("Trier par nombre de likes")
    setDisplay(false)
  }
  function sortByFollows() {
    const sort = axiosRes.sort((a, b) => { return b.followers.length - a.followers.length })
    setSortedTable(sort)
    setSortedValue("Trier par nombre de follows")
    setDisplay(false)
  }
  function sortByDate() {
    const sort = axiosRes.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) })
    setSortedTable(sort)
    setSortedValue("Trier par date")
    setDisplay(false)
  }
  function sortedByStateUnderPreparation() {
    const array = axiosRes.filter((element) => { return element.state === "En préparation" })
    setSortedTable(array)
    setSortedValue("Project en préparation")
    setDisplay(false)
  }
  function sortedByStateInPorgress() {
    const array = axiosRes.filter((element) => { return element.state === "En cours" })
    setSortedTable(array)
    setSortedValue("Project en cours")
    setDisplay(false)
  }
  function sortedByStateCompleted() {
    const array = axiosRes.filter((element) => { return element.state === "Terminé" })
    setSortedTable(array)
    setSortedValue("Project terminé")
    setDisplay(false)
  }

  return (
    <div className="container projects-page">
      <div className="projects-container">
        <AddBloc />
        <button onClick={() => setDisplay(!display)}>{sortedValue}</button>
        {display && (
          <div className="category-selection">
            <option onClick={() => sortByLikes()}>Trier par nombre de likes</option>
            <option onClick={() => sortByFollows()}>Trier par nombre de follows</option>
            <option onClick={() => sortByDate()}>Trier par date</option>
            <option onClick={() => sortedByStateUnderPreparation()}>Project en préparation</option>
            <option onClick={() => sortedByStateInPorgress()}>Project en cours</option>
            <option onClick={() => sortedByStateCompleted()}>Project terminé</option>
          </div>
        )}

        {isLoading && (<Loader />)}
        {!isLoading && (
          <div className="container myprojects-container">
            {(nbOfRes > 0) ? (
              sortedTable.map((element, key) => {
                var callback = {}
                var deltaOps = element.content[0].ops
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
                const avatar = { backgroundImage: "url(" + element.posterAvatar + ")", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }
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