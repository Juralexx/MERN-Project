import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";
import { dateParser } from '../components/Utils';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'

const Project = () => {
  const { titleURL } = useParams();
  const [project, setProject] = useState([]);
  const [description, setDescription] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}api/project/${titleURL}`)
        if (data.titleURL) {
          setProject(data)
          setDescription(data.content[0].ops)
        } else { navigate('/') }

      } catch (err) {
        console.error(err)
      }
    };
    fetch();
  }, [titleURL, navigate]);

  var callback = {}
  var deltaOps = description
  var converter = new QuillDeltaToHtmlConverter(deltaOps, callback)
  var html = converter.convert(deltaOps)

  function getDescription() { return ({ __html: html }) }

  return (
    <div className="container">
      <h1>Titre du projet : {project.title}</h1>
      <p>Catégorie : {project.category}</p>
      <p>Posté par : {project.posterPseudo}</p>
      <p>Date de création : {dateParser(project.createdAt)}</p>
      <p>Dernière modification : {dateParser(project.updatedAt)}</p>
      <p>Localisation : {project.location}</p>
      <p>Date de fin potentielle : {dateParser(project.end)}</p>
      <p>Nombre de personne : {project.numberofcontributors}</p>
      <p dangerouslySetInnerHTML={getDescription()}></p>
    </div>
  )
}

export default Project;