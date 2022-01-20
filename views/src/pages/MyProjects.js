import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import axios from "axios";
import { dateParser } from '../components/Utils';
import AddBloc from '../components/project/AddBloc';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'

const MyProjects = () => {
  const userData = useSelector((state) => state.userReducer)
  const id = userData._id
  const [nbOfRes, setNbOfRes] = useState([])
  const [axiosRes, setAxiosRes] = useState([])
  // const [description, setDescription] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
        const checkarray = data.createdProjects
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
            console.log(res)
          });
        }
      } catch (err) {
        console.error(err)
      }
    };
    fetch();
  }, [id]);

  return (
    <div className="container projects-page">
      <div className="projects-container">
        <AddBloc />

        <div className="container">
          {(nbOfRes > 0) ? (
            axiosRes.map((element, key) => {
              var description = element.content[0].ops
              var callback = {}
              var deltaOps = description
              var converter = new QuillDeltaToHtmlConverter(deltaOps, callback)
              var html = converter.convert(deltaOps)
              function getDescription() { return ({ __html: html }) }
              return (
                <div key={key}>
                  <h1>ID : {element._id}</h1>
                  <p>Titre : {element.title}</p>
                  <p>Catégorie : {element.category}</p>
                  <p>Posté par : {element.posterPseudo}</p>
                  <p>Date de création : {dateParser(element.createdAt)}</p>
                  <p>Dernière modification : {dateParser(element.updatedAt)}</p>
                  <p>Localisation : {element.location}</p>
                  <p>Date de fin potentielle : {dateParser(element.end)}</p>
                  <p>Nombre de personne : {element.numberofcontributors}</p>
                  <p dangerouslySetInnerHTML={getDescription()}></p>
                </div>
              )
            })
          ) : (
            <div>
              <p>Vous n'avez pas encore ajouté de projet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProjects;