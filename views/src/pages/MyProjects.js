import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import axios from "axios";
import { dateParser } from '../components/Utils';
import AddBloc from '../components/project/AddBloc';

const MyProjects = () => {
  const userData = useSelector((state) => state.userReducer)
  const id = userData._id
  const [project, setProject] = useState({});
  localStorage.setItem('id', `${id}`)

  document.getElementsByClassName('titleproject').innerHTML = ""

  useEffect(() => {
    const userId = localStorage.getItem('id', `${id}`)
    console.log("USER ID : " + userId)
    const fetch = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
        const checkarray = data.createdProjects

        if (checkarray.length > 0) {
          const projects = checkarray.map(async (projectID) => {
            return await axios
              .get(`${process.env.REACT_APP_API_URL}api/project/single/${projectID}`)
              .then((res) => res.data)
              .catch((e) => console.error(e));
          })
          Promise.all(projects).then((res) => {
            res.map((project) => {
              document.querySelector('.titleproject').innerHTML = project.title
            })
          });
        }
      } catch (err) {
        console.error(err)
      }
    };
    fetch();
  }, []);

  return (
    <div className="container projects-page">
      <div className="projects-container">
        <AddBloc />

        <>
          <div className="container">
            <h1 className="titleproject"></h1>
            {/* <p>Catégorie : {project.category}</p>
            <p>Posté par : {project.posterPseudo}</p>
            <p>Date de création : {dateParser(project.createdAt)}</p>
            <p>Dernière modification : {dateParser(project.updatedAt)}</p>
            <p>Localisation : {project.location}</p>
            <p>Date de fin potentielle : {dateParser(project.end)}</p>
            <p>Nombre de personne : {project.numberofcontributors}</p>
            <p>Description : {project.content}</p> */}
          </div>
        </>
      </div>
    </div>
  );
}

export default MyProjects;