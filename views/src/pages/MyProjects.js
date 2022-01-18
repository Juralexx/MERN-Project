import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import axios from "axios";
import { dateParser } from '../components/Utils';
import AddBloc from '../components/project/AddBloc';

const MyProjects = () => {
  const userData = useSelector((state) => state.userReducer)
  const id = userData._id
  const [nbOfRes, setNbOfRes] = useState([])
  const [resBody, setResBody] = useState([])
  const [axiosRes, setAxiosRes] = useState([])
  localStorage.setItem('id', `${id}`)

  document.getElementsByClassName('titleproject').innerHTML = ""

  useEffect(() => {
    const userId = localStorage.getItem('id', `${id}`)
    const fetch = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
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
            res.map((project) => {
              setResBody(project)
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

        <div className="container">
          {(nbOfRes > 0) ? (
            axiosRes.map((element, key) => {
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
                  <p>Description : {element.content}</p>
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