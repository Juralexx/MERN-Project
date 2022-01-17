import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";
import { dateParser } from '../components/Utils';

const Project = () => {
    const { titleURL } = useParams();
    const [project, setProject] = useState({});
    const navigate = useNavigate()
  
    useEffect(() => {
      const fetch = async () => {
        try {
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}api/project/${titleURL}`)
          data.titleURL ? setProject(data) : navigate('/')
          
        } catch (err) {
          console.error(err)
        }
      };
      fetch();
    }, [titleURL, navigate]);
  
    return (
      <>
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
      </>
  
    )
}

export default Project;