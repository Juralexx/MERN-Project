// import React, { useEffect, useState } from 'react';
import React from 'react';
import { useSelector } from 'react-redux'
// import axios from "axios";
// import { dateParser } from '../components/Utils';
import AddBloc from '../components/project/AddBloc';
// import { useParams } from 'react-router-dom';

const MyProjects = () => {
  const userData = useSelector((state) => state.userReducer)
  const id = userData._id
  // const [project, setProject] = useState({});
  console.log(id)

  // useEffect(() => {
  //   localStorage.setItem('id', `${id}`)
  //   const fetch = async () => {
  //     try {
  //       const { data } = await axios.get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
  //       if (data.currentProjects !== []) {
  //         const { response } = await axios.get(`${process.env.REACT_APP_API_URL}api/project/`)

  //       }

  //     } catch (err) {
  //       console.error(err)
  //     }
  //   };
  //   fetch();
  // }, []);

  return (
    <div className="container projects-page">
      <div className="projects-container">
        <AddBloc />

        {/* <>
          <div className="container">
            <h1>Titre du projet : {project.title}</h1>
            <p>Catégorie : {project.category}</p>
            <p>Posté par : {project.posterPseudo}</p>
            <p>Date de création : {dateParser(project.createdAt)}</p>
            <p>Dernière modification : {dateParser(project.updatedAt)}</p>
            <p>Localisation : {project.location}</p>
            <p>Date de fin potentielle : {dateParser(project.end)}</p>
            <p>Nombre de personne : {project.numberofcontributors}</p>
            <p>Description : {project.content}</p>
          </div>
        </> */}
      </div>
    </div>
  );
}

export default MyProjects;